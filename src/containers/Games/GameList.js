import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import { getGameList, deleteGame, patchGame } from "../../actions/GameActions";
import { getGameTypeList } from "../../actions/GameTypeActions";
import Loading from "../Loading";
import { TextField, FormControl, InputLabel, Select, MenuItem,
    Table, TableBody, TableCell, TableRow, TableHead, 
 } from "@material-ui/core";
 import IconButton from '@material-ui/core/IconButton';
 import { Visibility, Add, Create, Delete, Save } from '@material-ui/icons';
 import AddGame from "./AddGame";
import {green} from "@material-ui/core/colors";
import {Link} from 'react-router-dom';

const GameList = () => {

    const [open, setOpen] = React.useState(false);
    const [selectedGame, setGame] = React.useState(false);
    const dispatch = useDispatch();
    const gameList = useSelector(state => state.GameList);
    const user = useSelector(state => state.User);
    const gameTypeList = useSelector(state => state.GameTypeList);

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
        const { name, value } = event.target;
        setGame({...selectedGame, [name] : value})
        console.log(selectedGame)
    }

    const saveGame = (selectedGame) => {
        dispatch(patchGame(selectedGame))
        setGame({})
    }

    const showData = () => {
        if(!_.isEmpty(gameList.data)) {
            return (
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
                    {gameList.data.map((row) => (
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
                                {selectedGame._id === row._id ? <TextField name="gameNotice" label="Notice" value={selectedGame.gameNotice} onChange={handleChange}/> : row.gameNotice }
                            </TableCell>
                            
                            <TableCell>{row.isPrototype ? 'Oui' : 'Non'}</TableCell>
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
        <div>
            <h1>Liste des Jeux</h1>
            {user.isLoggedIn
                ? <IconButton variant="outlined" color="primary" onClick={() => changeValueOpen(true)}><Add /></IconButton>
                : <></>
            }
            {showData()}
            <AddGame open={open} handleClose={() => changeValueOpen(false)}/>
        </div>
    )
}

export default GameList;