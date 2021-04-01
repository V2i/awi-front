import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getGameListByZoneID } from "../../actions/GameActions";
import _ from "lodash";
import Loading from "../Loading";
import {getZoneByID, patchZone, deleteZone} from "../../actions/ZoneActions";
import { Grid, Button, TextField, Typography,
    Table, TableBody, TableCell, TableRow, TableHead, 
 } from "@material-ui/core";
 import IconButton from '@material-ui/core/IconButton';
 import { Visibility, Add, Create, Delete} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import AddGame from "../Games/AddGame";
import {green} from "@material-ui/core/colors";

const Zone = (props) => {

    const zoneId = props.match.params.id;
    const stateIndex = props.match.params.index;
    const dispatch = useDispatch();
    const zoneList = useSelector(state => state.ZoneList);
    const zone = zoneList.data[stateIndex].zone;
    const gameList = zoneList.data[stateIndex].gameList
    const user = useSelector(state => state.User);




    const initialZoneState = {
        _id: zoneId,
        zoneName: zone.zoneName,
    }

    const [zoneSelected, setZone] = React.useState(initialZoneState);
    const [toUpdate, setUpdate] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const changeValueOpen = (value) => {
        setOpen(value)
    };

    const handleChange = (event) => {
        if(event.target) {
            const { name, value } = event.target;
            setZone({ ...zoneSelected, [name]: value });
        } 
    };

    const removeZone = (id) => {
        dispatch(deleteZone(id));
    };

    const updateZone = (zone) => {
        setUpdate(false);
        dispatch(patchZone(zone));
        setZone(initialZoneState);
    }

    const showData = () => {
        if(!_.isEmpty(zone.data)) {
            if(user.isLoggedIn) {
                return(
                    <Grid container spacing={3}>

                        {toUpdate &&
                        <Grid item xs={4}>
                            <TextField name="zoneName" label="Nom" value={zoneSelected.zoneName}
                                       onChange={handleChange}/>
                            <Button onClick={() => updateZone(zoneSelected)}>Modifier</Button>
                        </Grid>
                        }
                        {!toUpdate &&
                        <Grid item xs={4}>
                            <Button onClick={() => setUpdate(true)}>Modifier</Button>
                        </Grid>}

                        <Grid item xs={4}>
                            <Button onClick={() => removeZone(zoneId)}>Supprimer</Button>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography><h3>Liste des jeux</h3></Typography>
                            <IconButton variant="outlined" color="primary" onClick={() => changeValueOpen(true)}><Add /></IconButton>
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
                                                <IconButton variant="outlined" color="primary" component={Link} to={`/game/${row._id}`}><Visibility /></IconButton>
                                                <IconButton variant="outlined" style={{ color: green[500] }} ><Create /></IconButton>
                                                <IconButton variant="outlined" color="secondary" ><Delete /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                )
            } else {
                return (
                    <Grid container spacing={3}>

                        <Grid item xs={9}>
                            <Typography><h3>Liste des jeux</h3></Typography>
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
                                    {zone.gameList.data.map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{row.gameName}</TableCell>
                                            <TableCell>{row.gameMinimumAge}</TableCell>
                                            <TableCell>{row.gameDuration}</TableCell>
                                            <TableCell>{row.gameMinimumPlayers}</TableCell>
                                            <TableCell>{row.gameMaximumPlayers}</TableCell>
                                            <TableCell>{row.gameType.gameTypeName}</TableCell>
                                            <TableCell>{row.gameNotice}</TableCell>
                                            <TableCell>{row.isPrototype ? 'Oui' : 'Non'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                )
            }
        }
        if(zone.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />
        }
        if(zone.errorMsg !== "") {
            return <p>{zone.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            <h1>{zone.zoneName}</h1>
            {showData()}
            <AddGame open={open} handleClose={() => changeValueOpen(false)}/>
        </div>
    )
}

export default Zone;