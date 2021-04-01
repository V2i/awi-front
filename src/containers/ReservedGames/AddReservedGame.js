import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { postReservedGame } from "../../actions/ReservedGameActions";
import { getGameList } from "../../actions/GameActions";
import { getZoneList } from "../../actions/ZoneActions";
import { Button, TextField, Grid, FormControl, Select, InputLabel, MenuItem, IconButton,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
 } from "@material-ui/core";
 import { Add} from '@material-ui/icons';
 import AddGame from "../Games/AddGame";
import { getReservationByID } from '../../actions/ReservationActions';

 
const AddReservedGame = ({open = false, handleClose, reservationId}) => {
    
    const dispatch = useDispatch();
    const [game, setGame] = useState({});
    const [addGame, setAddGame] = useState(false);
    
    const gameList = useSelector(state => state.GameList);
    const zoneList = useSelector(state => state.ZoneList);
    const reservation = useSelector(state => state.Reservation);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getGameList());
            dispatch(getZoneList());
            dispatch(getReservationByID(reservationId));
        };
        fetchData();
    }, [dispatch]);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setGame({ ...game, [name]: value });
        } 
    };

    const saveGame = () => {
        console.log(game)
        handleClose()
        dispatch(postReservedGame(game, reservation.data));
        setGame({});
    };

    console.log(gameList)
    console.log(zoneList)

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Ajouter un nouveau jeu à la réservation</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                
                    <Grid container spacing={3}>

                    { gameList.data && 
                        <Grid item xs={6}>
                            <FormControl>
                                <InputLabel id="reservedGame">Jeu</InputLabel>
                                <Select
                                labelId="reservedGame"
                                id="reservedGameSelect"
                                name="reservedGame"
                                value={gameList.data.find(e => e._id === game.reservedGame)}
                                onChange={handleInputChange}
                                displayEmpty
                                >
                                {gameList.data.map(e => <MenuItem value={e._id} key={e._id}>{e.gameName}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <IconButton onClick={() => setAddGame(true)}>
                                <Add/>
                            </IconButton>
                            {
                                addGame && <AddGame open={addGame} handleClose={() => setAddGame(false)}/>
                            }
                        </Grid>
                    }

                        <Grid item xs={4}>
                            <TextField name="reservedGameQuantity" label="Quantité" value={game.reservedGameQuantity} onChange={handleInputChange}/>
                        </Grid>
                        
                        <Grid item xs={4}>
                            <FormControl>
                                <InputLabel id="AP">Avant Première ?</InputLabel>
                                <Select
                                labelId="AP"
                                id="APSelect"
                                name="reservedGameAP"
                                value={game.reservedGameAP}
                                onChange={handleInputChange}
                                >
                                    <MenuItem value={true}>Oui</MenuItem>
                                    <MenuItem value={false}>Non</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl>
                                <InputLabel id="hasAnimator">Besoin animateur ?</InputLabel>
                                <Select
                                labelId="hasAnimator"
                                id="hasAnimatorSelect"
                                name="hasAnimator"
                                value={game.hasAnimator}
                                onChange={handleInputChange}
                                >
                                    <MenuItem value={true}>Oui</MenuItem>
                                    <MenuItem value={false}>Non</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        { zoneList.data && 
                        <Grid item xs={6}>
                            <FormControl>
                                <InputLabel id="reservedGameZone">Zone</InputLabel>
                                <Select
                                labelId="reservedGameZone"
                                id="reservedGameZoneSelect"
                                name="reservedGameZone"
                                value={zoneList.data.find(e => e._id === game.reservedGameZone)}
                                onChange={handleInputChange}
                                displayEmpty
                                >
                                {zoneList.data.map(e => <MenuItem value={e._id} key={e._id}>{e.zoneName}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <IconButton onClick={() => setAddGame(true)}>
                                <Add/>
                            </IconButton>
                            {
                               /* addGame && <AddReservedGame open={addGame} handleClose={() => setAddGame(false)}/> */
                            }
                        </Grid>
                        }
                        
                        
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" color="primary" onClick={saveGame}>Ajouter</Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Annuler
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddReservedGame;