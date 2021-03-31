import React,{useState} from 'react';
import {useDispatch, useSelector,} from "react-redux";
import _ from 'lodash';
import { getGameList, deleteGame, patchGame } from "../../actions/GameActions";
import { getGameTypeList } from "../../actions/GameTypeActions";
import Loading from "../Loading";
import AddGame from "./AddGame";
import { Add, Visibility, Create, Delete, Save } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { TextField, FormControl, FormControlLabel, Checkbox, InputLabel, Select, MenuItem,
    Table, TableBody, TableCell, TableRow, TableHead,  Grid, Typography, Paper, TableContainer,InputBase 
 } from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {Link} from 'react-router-dom';
import GameTypeList from "../GameTypes/GameTypeList"

const GameList = () => {

    const [open, setOpen] = React.useState(false);
    const [selectedGame, setGame] = React.useState(false);
    const dispatch = useDispatch();
    const gameList = useSelector(state => state.GameList);
    const user = useSelector(state => state.User);
    const gameTypeList = useSelector(state => state.GameTypeList);

    const searchInitialState ={
        search: "",
    }

    const [searchState, setState] = useState(searchInitialState);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getGameList());
            dispatch(getGameTypeList());
        };
        fetchData();
    }, [dispatch]);

    const changeValueOpen = (value) => {
        setOpen(value)
    }
    const removeGame = (id) => {
        dispatch(deleteGame(id));
    }

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setGame({...selectedGame, [name] : (name == "isPrototype" ? checked : value)})
    }

    const saveGame = (gameSelected) => {
        dispatch(patchGame(gameSelected))
        setGame({})
    }

    const searchSpace = (event)=>{
        let keyword = event.target.value;
        setState({search:keyword})
      }

    const showData = () => {
        if(!_.isEmpty(gameList.data)) {
            return (
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom</TableCell>
                                <TableCell>Age Min</TableCell>
                                <TableCell>Durée (en min)</TableCell>
                                <TableCell>Min Joueurs</TableCell>
                                <TableCell>Max Joueurs</TableCell>
                                <TableCell>Catégorie</TableCell>
                                <TableCell>Notice</TableCell>
                                <TableCell>Prototype ?</TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {gameList.data.filter((data) => {
                        if(searchState.search == null)
                            return data
                        else if(data.gameName.toLowerCase().includes(searchState.search.toLowerCase())){
                            return data
                        }
                        })
                        .map((row) => (
                            <TableRow key={row._id}>
                                <TableCell>
                                    {selectedGame._id === row._id ? <TextField name="gameName" label="Nom" value={selectedGame.gameName} onChange={handleChange}/> : row.gameName }
                                </TableCell>
                                <TableCell>
                                    {selectedGame._id === row._id ? <TextField name="gameMinimumAge" label="Age Min" value={selectedGame.gameMinimumAge} onChange={handleChange}/> : row.gameMinimumAge }
                                </TableCell>
                                <TableCell>
                                    {selectedGame._id === row._id ? <TextField name="gameDuration" label="Durée" value={selectedGame.gameDuration} onChange={handleChange}/> : row.gameDuration }
                                </TableCell>
                                <TableCell>
                                    {selectedGame._id === row._id ? <TextField name="gameMinimumPlayers" label="Nb Min Joueurs" value={selectedGame.gameMinimumPlayers} onChange={handleChange}/> : row.gameMinimumPlayers }
                                </TableCell>
                                <TableCell>
                                    {selectedGame._id === row._id ? <TextField name="gameMaximumPlayers" label="Nb Max Joueurs" value={selectedGame.gameMaximumPlayers} onChange={handleChange}/> : row.gameMaximumPlayers }
                                </TableCell>
                                
                                <TableCell>
                                { selectedGame._id === row._id 
                                ? gameTypeList.data && 
                                    
                                    <FormControl>
                                        <InputLabel id="gameType">Catégorie</InputLabel>
                                        <Select
                                        labelId="gameType"
                                        id="gameTypeSelect"
                                        name="gameType"
                                        value={gameTypeList.data.find(t => t._id === selectedGame.gameType._id)}
                                        onChange={handleChange}
                                        >
                                        {gameTypeList.data.map(t => <MenuItem value={t._id} key={t._id}>{t.gameTypeName}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                        
                                : row.gameType.gameTypeName
                                }
                                </TableCell>
                                <TableCell>
                                    {
                                    selectedGame._id === row._id 
                                    ? <TextField name="gameNotice" label="Notice" value={selectedGame.gameNotice} onChange={handleChange}/> 
                                    : ( row.gameNotice.length > 0
                                        ? <a href={row.gameNotice}>Notice</a>
                                        : "")
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                    selectedGame._id === row._id 
                                    ? <FormControlLabel
                                        control={
                                        <Checkbox
                                            checked={selectedGame.isPrototype}
                                            onChange={handleChange}
                                            name="isPrototype"
                                            color="primary"
                                        />
                                        }
                                    />
                                    : <Checkbox
                                            checked={row.isPrototype}
                                            disabled
                                            name="isPrototype"
                                            color="primary"
                                        />
                                    }
                                
                                </TableCell>
                                {user.isLoggedIn
                                    ?
                                        <TableCell>
                                            <IconButton variant="outlined" color="primary" component={Link} to={`/game/${row._id}`}><Visibility /></IconButton>
                                            { selectedGame._id === row._id
                                                ? <IconButton variant="outlined" onClick={() => saveGame(selectedGame)}><Save /></IconButton>
                                                : <IconButton variant="outlined" style={{ color: green[500] }} onClick={() => setGame(row)}><Create /></IconButton>
                                            }
                                            <IconButton variant="outlined" color="secondary" onClick={() => removeGame(row._id)}><Delete /></IconButton>
                                        </TableCell>
                                    :
                                        <></>
                                }
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
            )
            
        }
        if(gameList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(gameList.errorMsg !== "") {
            return <p>{gameList.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <Grid container spacing={3}>
            <Grid item xs={9}>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <Typography variant="h4"><b>Liste des Jeux</b></Typography>
                    </Grid>
                    <Grid item xs={3}>
                        {user.isLoggedIn
                            ? <IconButton variant="outlined" color="primary" onClick={() => changeValueOpen(true)}><Add /></IconButton>
                            : <></>
                        }
                        <AddGame open={open} handleClose={() => changeValueOpen(false)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <InputBase  type="text" placeholder="Recherche..." onChange={(e)=>searchSpace(e)} />
                    </Grid>
                    <Grid item xs={12}>
                        {showData()}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={3}>
                <GameTypeList />
            </Grid>
            
        </Grid>
    )
}

export default GameList;