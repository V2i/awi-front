import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import { patchReservedGame, deleteReservedGame } from "../../actions/ReservedGameActions";
import {getReservationByID} from "../../actions/ReservationActions";
import Loading from "../Loading";
import AddReservedGame from "./AddReservedGame";
import { Add, Create, Delete, Save } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { TextField, FormControlLabel, Checkbox,
    Table, TableBody, TableCell, TableRow, TableHead, Paper, TableContainer,TablePagination
 } from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';


const ReservedGameList = ({reservationId}) => {
    const namesCheckBox = ["reservedGameAP", "isPlaced", "isReceived", "hasAnimator"];
    const [open, setOpen] = React.useState(false);
    const [selectedGame, setGame] = React.useState({});
    const dispatch = useDispatch();
    const user = useSelector(state => state.User);
    const reservation = useSelector(state => state.Reservation);
    const reservedGameList = reservation.data.reservationReservedGame;

    React.useEffect(() => {
        dispatch(getReservationByID(reservationId));
    }, [dispatch, reservationId]);


    const changeValueOpen = (value) => {
        setOpen(value)
    }
    const removeGame = (id) => {
        dispatch(deleteReservedGame(id, reservation));
    }

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        if (namesCheckBox.includes(name)){
            setGame({...selectedGame, [name] : checked})
        }
        else{
            setGame({...selectedGame, [name] : value})
        }
        
    }

    const saveGame = (gameSelected) => {
        dispatch(patchReservedGame(gameSelected, reservation.data))
        setGame(false)
    }

    const useStyles = makeStyles({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 500,
        },
      });

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    

    const showData = () => {
        if(!_.isEmpty(reservation.data)) {
            return (
                <>
                <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                       
                                <TableCell style={{'font-weight':'bold'}}>Nom</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Editeur</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Exposant</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Joueurs</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Durée (en min)</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Type</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Zone</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Quantité</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Avant 1ère</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Placé?</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Reçu?</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>A animer?</TableCell>
                                <TableCell> </TableCell>
                            
                        
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {reservedGameList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => 
                            <TableRow key={row._id}>
                                <TableCell>
                                    { row.reservedGame.gameName }
                                </TableCell>
                                <TableCell>
                                    { row.reservedGame.gameEditor &&row.reservedGame.gameEditor.editorName }
                                </TableCell>
                                <TableCell>
                                    { reservation.data.reservationExhibitor && reservation.data.reservationExhibitor.exhibitorName }
                                </TableCell>
                                <TableCell>
                                    { row.reservedGame.gameMinimumPlayers } - { row.reservedGame.gameMaximumPlayers }
                                </TableCell>
                                <TableCell>
                                    { row.reservedGame.gameDuration } 
                                </TableCell>
                                <TableCell>
                                    { row.reservedGame.gameType && row.reservedGame.gameType.gameTypeName } 
                                </TableCell>
                                <TableCell>
                                    { row.reservedGameZone.zoneName } 
                                </TableCell>
                                <TableCell>
                                    {selectedGame._id === row._id ? <TextField name="reservedGameQuantity" value={selectedGame.reservedGameQuantity} onChange={handleChange}/> : row.reservedGameQuantity }
                                </TableCell>
                                {
                                    namesCheckBox.map((name, index) => 
                                        <TableCell key={index}>
                                            {
                                                selectedGame._id === row._id 
                                                ? <FormControlLabel
                                                    control={
                                                    <Checkbox
                                                        checked={selectedGame[name]}
                                                        onChange={handleChange}
                                                        name={name}
                                                        color="primary"
                                                    />
                                                    }
                                                 label=""/>
                                                : <Checkbox
                                                        checked={row[name]}
                                                        disabled
                                                        name={name}
                                                        color="primary"
                                                    />
                                            }
                                            </TableCell>

                                    )
                                }

                                {user.isLoggedIn
                                    ?
                                        <TableCell>
                                            
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
                        )}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={reservedGameList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                </Paper>
            </>

                
                // <TableContainer component={Paper}>
                //     <Table aria-label="simple table">
                //         <TableHead>
                //             <TableRow>
                                // <TableCell>Nom</TableCell>
                                // <TableCell>Editeur</TableCell>
                                // <TableCell>Exposant</TableCell>
                                // <TableCell>Joueurs</TableCell>
                                // <TableCell>Durée (en min)</TableCell>
                                // <TableCell>Type</TableCell>
                                // <TableCell>Zone</TableCell>
                                // <TableCell>Quantité</TableCell>
                                // <TableCell>Avant 1ère</TableCell>
                                // <TableCell>Placé?</TableCell>
                                // <TableCell>Reçu?</TableCell>
                                // <TableCell>A animer?</TableCell>
                                // <TableCell> </TableCell>
                //             </TableRow>
                //         </TableHead>
                //         <TableBody>
                        // {reservedGameList.map(row => 
                        //     <TableRow key={row._id}>
                        //         <TableCell>
                        //             { row.reservedGame.gameName }
                        //         </TableCell>
                        //         <TableCell>
                        //             { row.reservedGame.gameEditor &&row.reservedGame.gameEditor.editorName }
                        //         </TableCell>
                        //         <TableCell>
                        //             { reservation.data.reservationExhibitor && reservation.data.reservationExhibitor.exhibitorName }
                        //         </TableCell>
                        //         <TableCell>
                        //             { row.reservedGame.gameMinimumPlayers } - { row.reservedGame.gameMaximumPlayers }
                        //         </TableCell>
                        //         <TableCell>
                        //             { row.reservedGame.gameDuration } 
                        //         </TableCell>
                        //         <TableCell>
                        //             { row.reservedGame.gameType && row.reservedGame.gameType.gameTypeName } 
                        //         </TableCell>
                        //         <TableCell>
                        //             { row.reservedGameZone.zoneName } 
                        //         </TableCell>
                        //         <TableCell>
                        //             {selectedGame._id === row._id ? <TextField name="reservedGameQuantity" value={selectedGame.reservedGameQuantity} onChange={handleChange}/> : row.reservedGameQuantity }
                        //         </TableCell>
                        //         {
                        //             namesCheckBox.map((name, index) => 
                        //                 <TableCell key={index}>
                        //                     {
                        //                         selectedGame._id === row._id 
                        //                         ? <FormControlLabel
                        //                             control={
                        //                             <Checkbox
                        //                                 checked={selectedGame[name]}
                        //                                 onChange={handleChange}
                        //                                 name={name}
                        //                                 color="primary"
                        //                             />
                        //                             }
                        //                          label=""/>
                        //                         : <Checkbox
                        //                                 checked={row[name]}
                        //                                 disabled
                        //                                 name={name}
                        //                                 color="primary"
                        //                             />
                        //                     }
                        //                     </TableCell>

                        //             )
                        //         }

                        //         {user.isLoggedIn
                        //             ?
                        //                 <TableCell>
                                            
                        //                     { selectedGame._id === row._id
                        //                         ? <IconButton variant="outlined" onClick={() => saveGame(selectedGame)}><Save /></IconButton>
                        //                         : <IconButton variant="outlined" style={{ color: green[500] }} onClick={() => setGame(row)}><Create /></IconButton>
                        //                     }
                        //                     <IconButton variant="outlined" color="secondary" onClick={() => removeGame(row._id)}><Delete /></IconButton>
                        //                 </TableCell>
                        //             :
                        //                 <></>
                        //         }
                        //     </TableRow>
                        // )}
                //         </TableBody>
                //     </Table>
                // </TableContainer>
                
            )
            
        }
        
        if(reservation.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(reservation.errorMsg !== "") {
            return <p>{reservation.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
        
    };

    return(
        <div>
            {user.isLoggedIn
                ? <div>
                    <h1>Liste des Jeux Réservés</h1>
                    <IconButton variant="outlined" color="primary" onClick={() => changeValueOpen(true)}><Add /></IconButton>
                    {showData()}
                    <AddReservedGame open={open} handleClose={() => changeValueOpen(false)} />
                </div>
                : <p>Vous n'avez pas la permission requise!</p>
            }
        </div>
    )
}

export default ReservedGameList;