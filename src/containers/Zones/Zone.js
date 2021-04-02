import React, {useEffect} from 'react';
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
import {getZoneList} from "../../actions/ZoneActions";

const Zone = (props) => {

    const zoneId = props.match.params.id;
    const festivalId = props.match.params.festivalId;
    const dispatch = useDispatch();
    const zoneList = useSelector(state => state.ZoneList.data.filter(z => z.zone._id === zoneId));
    console.log(zoneList)
     const zone = zoneList[0].zone;
     const gameList = zoneList[0].gameList
    const user = useSelector(state => state.User);


    useEffect(() => {
        const fetchData = () => {
            dispatch(getZoneList(festivalId));
        };
        fetchData();
    }, [dispatch]);

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
        if(!_.isEmpty(gameList)) {
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
                                    {gameList.map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{row.reservedGame.gameName}</TableCell>
                                            <TableCell>{row.reservedGame.gameMinimumAge}</TableCell>
                                            <TableCell>{row.reservedGame.gameDuration}</TableCell>
                                            <TableCell>{row.reservedGame.gameMinimumPlayers}</TableCell>
                                            <TableCell>{row.reservedGame.gameMaximumPlayers}</TableCell>
                                            <TableCell>{row.reservedGame.gameType.gameTypeName}</TableCell>
                                            <TableCell>
                                                {row.reservedGame.gameNotice.length > 0
                                                ? <a href={row.gameNotice}>Notice</a>
                                                : ""}
                                            </TableCell>
                                            <TableCell>{row.reservedGame.isPrototype ? 'Oui' : 'Non'}</TableCell>
                                            <TableCell>
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
                                            <TableCell>{row.reservedGame.gameName}</TableCell>
                                            <TableCell>{row.reservedGame.gameMinimumAge}</TableCell>
                                            <TableCell>{row.reservedGame.gameDuration}</TableCell>
                                            <TableCell>{row.reservedGame.gameMinimumPlayers}</TableCell>
                                            <TableCell>{row.reservedGame.gameMaximumPlayers}</TableCell>
                                            <TableCell>{row.reservedGame.gameType.gameTypeName}</TableCell>
                                            <TableCell>{row.reservedGame.gameNotice}</TableCell>
                                            <TableCell>{row.reservedGame.isPrototype ? 'Oui' : 'Non'}</TableCell>
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