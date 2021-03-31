import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {getGameTypeList, patchGameType, deleteGameType} from "../../actions/GameTypeActions";
import Loading from "../Loading";
import AddGameType from "./AddGameType";
import AddIcon from '@material-ui/icons/Add';
import { IconButton, TextField, Paper, TableContainer,
    Table, TableBody, TableCell, TableRow, Grid, Typography, 
} from "@material-ui/core";
import { Visibility, Save, Create, Delete} from '@material-ui/icons';
import {green} from "@material-ui/core/colors";

const GameTypeList = () => {

    const initialType = { gameTypeName : ""}
    const [open, setOpen] = React.useState(false);
    const [selectedType, setType] = React.useState(initialType);
    const dispatch = useDispatch();
    const gameTypeList = useSelector(state => state.GameTypeList);
    const user = useSelector(state => state.User);


    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getGameTypeList());
        };
        fetchData();
    }, [dispatch]);

    const changeValueOpen = (value) => {
        setOpen(value)
    }
    const removeGameType = (id) => {
        dispatch(deleteGameType(id));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setType({...selectedType, [name] : value })
    }

    const saveGameType = (gameTypeSelected) => {
        dispatch(patchGameType(gameTypeSelected))
        setType(initialType)
    }

    const showData = () => {
        if(!_.isEmpty(gameTypeList.data)) {
            return (
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        
                        <TableBody>
                        {gameTypeList.data.map((row) => (
                            <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                { selectedType._id === row._id
                                ? <TextField name="gameTypeName" label="Nom" value={selectedType.gameTypeName} onChange={handleChange}/>
                                : row.gameTypeName
                                }
                            </TableCell>
                            <TableCell>
                                <IconButton variant="outlined" color="primary" component={Link} to={`/game/${row._id}`}><Visibility /></IconButton>
                                { selectedType._id === row._id
                                    ? <IconButton variant="outlined" onClick={() => saveGameType(selectedType)}><Save /></IconButton>
                                    : <IconButton variant="outlined" style={{ color: green[500] }} onClick={() => setType(row)}><Create /></IconButton>
                                }
                                <IconButton variant="outlined" color="secondary" onClick={() => removeGameType(row._id)}><Delete /></IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
            
        }
        if(gameTypeList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(gameTypeList.errorMsg !== "") {
            return <p>{gameTypeList.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <Grid container spacing={3}>
            <Grid item xs={9}>
                <Typography variant="h4"><b>Catégories</b></Typography>
            </Grid>
            <Grid item xs={3}>
            {user.isLoggedIn
                ?
                    <IconButton aria-label="add" color="primary" onClick={() => changeValueOpen(true)} size="medium">
                        <AddIcon />
                    </IconButton>
                :
                    <></>
            }</Grid>
            <Grid item xs={12}>
            {showData()}
            { open && <AddGameType open={open} handleClose={() => changeValueOpen(false)}/>}
            </Grid>
        </Grid>
    )
}

export default GameTypeList;