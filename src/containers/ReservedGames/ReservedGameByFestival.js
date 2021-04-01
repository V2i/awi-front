import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import { patchReservedGame, deleteReservedGame, getReservedGameListByFestival } from "../../actions/ReservedGameActions";
import {getReservationByID} from "../../actions/ReservationActions";

import { Visibility } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { 
    Table, TableBody, TableCell, TableRow, TableHead,  Card, Paper, TableContainer, Typography
 } from "@material-ui/core";
 import {Link} from 'react-router-dom';


const ReservedGameByFestival = ({festivalId}) => {
    console.log(festivalId)
    const dispatch = useDispatch();
    const user = useSelector(state => state.User);
    const reservedGameList = useSelector(state => state.ReservedGameList);
    
    React.useEffect(() => {
        dispatch(getReservedGameListByFestival(festivalId));
    }, [dispatch, festivalId]);
    


    return (
        <Card>
            <Typography variant="h5"><b>Jeux réservés</b></Typography>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell>Editeur</TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {reservedGameList.data.map(reserv => 
                        reserv.reservationReservedGame.map(row => 
                        <TableRow key={row._id}>
                            <TableCell>
                                { row.reservedGame.gameName }
                            </TableCell>
                            <TableCell>
                                { row.reservedGame.gameEditor &&row.reservedGame.gameEditor.editorName }
                            </TableCell>
                            
                            

                            {user.isLoggedIn
                                ?
                                    <TableCell>
                                        <IconButton variant="outlined" color="secondary" component={Link} to={`/reservation/${reserv._id}`}><Visibility /></IconButton>
                                    </TableCell>
                                :
                                    <></>
                            }
                        </TableRow>
                        )
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
        
    )
            
}

export default ReservedGameByFestival;