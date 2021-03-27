import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getGameList, deleteGame} from "../../actions/GameActions";
import Loading from "../Loading";
import { 
    Table, TableBody, TableCell, TableRow, TableHead, 
 } from "@material-ui/core";
 import IconButton from '@material-ui/core/IconButton';
 import { Visibility, Add, Create, Delete} from '@material-ui/icons';
 import AddGame from "./AddGame";

const GameList = () => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const gameList = useSelector(state => state.GameList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getGameList());
        };
        fetchData();
    }, [dispatch]);

    const changeValueOpen = (value) => {
        setOpen(value)
    }
    const removeGame = (id) => {
        dispatch(deleteGame(id));
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
                            <TableCell>{row.gameName}</TableCell>
                            <TableCell>{row.gameMinimumAge}</TableCell>
                            <TableCell>{row.gameDuration}</TableCell>
                            <TableCell>{row.gameMinimumPlayers}</TableCell>
                            <TableCell>{row.gameMaximumPlayers}</TableCell>
                            <TableCell>{row.gameType.gameTypeName}</TableCell>
                            <TableCell>{row.gameNotice}</TableCell>
                            <TableCell>{row.isPrototype ? 'Oui' : 'Non'}</TableCell>
                            <TableCell>
                                <IconButton variant="outlined" color="primary" href={`/game/${row._id}`}><Visibility /></IconButton>
                                <IconButton variant="outlined" color="primary" ><Create /></IconButton>
                                <IconButton variant="outlined" color="primary" onClick={() => removeGame(row._id)}><Delete /></IconButton>
                            </TableCell>
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

        return <p>unable to get data</p>;
    };

    return(
        <div>
            <h1>Liste des Jeux</h1>
            <IconButton variant="outlined" color="primary" onClick={() => changeValueOpen(true)}><Add /></IconButton>
            {showData()}
            <AddGame open={open} handleClose={() => changeValueOpen(false)}/>
        </div>
    )
}

export default GameList;