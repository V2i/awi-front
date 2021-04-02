import React, {useState} from 'react';
import {
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer,
    Checkbox,
    Paper,
    Card,
    FormControlLabel,
    IconButton,
    Grid,
} from "@material-ui/core";
import {patchFestival, deleteFestival, getFestivalByID, changeFestival} from "../../actions/FestivalActions";
import {useDispatch} from "react-redux";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import {postSpace} from "../../actions/SpaceActions";
import FestivalSpace from "./FestivalSpace";
import { Visibility, Save, Delete} from '@material-ui/icons';
import {KeyboardDatePicker} from "@material-ui/pickers";
import {Link} from 'react-router-dom';
import {getReservationByFestivalID} from "../../actions/ReservationActions";

const FestivalCard = ({festival}) => {

    const initialFestival = {
        _id: festival._id,
        festivalName: festival.festivalName,
        festivalDate: festival.festivalDate,
        festivalSpace: festival.festivalSpace,
        isCurrent: festival.isCurrent
    }
    const [newFestival, setFestival] = useState(initialFestival);

    const dispatch = useDispatch();
    
    React.useEffect(() => {
        dispatch(getReservationByFestivalID(festival._id));
        dispatch(getFestivalByID(festival._id));
    }, [dispatch, festival._id]);

    


    const handleChange = (event) => {
        if(event.target) {
            const { name, value, checked } = event.target;
            if(name === "isCurrent") {
                setFestival({ ...newFestival, [name]: checked });
            } else {
                setFestival({ ...newFestival, [name]: value });
            }
        } else {
            setFestival({...newFestival, festivalDate: event});
        }
    };

    const removeFestival = (id) => {
        dispatch(deleteFestival(id));
    };

    const updateFestival = (festival) => {
        dispatch(patchFestival(festival));
    };

    const selectFestival = () => {
        dispatch(changeFestival(festival));
    }

    const addSpace = () => {
        const space = {
            spaceName: "Nouveau",
            spacePriceTable: 0,
            spacePriceSurface: 0,
            spaceNbTable: 0,
            spaceSurface: 0
        };
        dispatch(postSpace(space, newFestival));
    }


    return(
        <Card>
            <form>
            <Grid container direction="row" justify="space-around" alignItems="flex-start" style={{ padding: 10 }}>
                <Grid container item xs={3}>
                <TextField name="festivalName" label="Nom" value={newFestival.festivalName} onChange={handleChange}/>
                </Grid> 
                <Grid container item xs={3}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="DD MM YYYY"
                    margin="normal"
                    id="date-picker"
                    label="Date"
                    value={newFestival.festivalDate}
                    onChange={handleChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                </Grid>
                
                <Grid container item xs={3}>
                <FormControlLabel
                    control={
                    <Checkbox
                    checked={newFestival.isCurrent}
                        onChange={handleChange}
                        name="isCurrent"
                        color="primary"
                    />
                    }
                    label="Courant ?"
                />
                </Grid>
                
                <Grid container item xs={3}>  
                    <IconButton variant="contained" color="primary" component={Link} to={`/festival/${festival._id}`} onClick={selectFestival}>
                        <Visibility />
                    </IconButton>
                    <IconButton variant="contained" color="default" onClick={() => updateFestival(newFestival)}>
                        <Save />
                    </IconButton>
                    <IconButton variant="contained" color="secondary" onClick={() => removeFestival(festival._id)}>
                        <Delete />
                    </IconButton>
                </Grid>

                <Grid container item xs={12}>  
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Espace</TableCell>
                                <TableCell align="right">Nb Tables</TableCell>
                                <TableCell align="right">Prix Table (en €)</TableCell>
                                <TableCell align="right">Prix m2 (en €)</TableCell>
                                <TableCell align="right">Tables réservés</TableCell>
                                <TableCell align="right">m2 réservés</TableCell>
                                <TableCell align="right">Restants</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {newFestival.festivalSpace.map(space => (
                                <FestivalSpace space={space} festival={newFestival} key={space._id}/>
                            ))}
                            <TableRow>
                                <TableCell align="center" colSpan={9}>
                                    <IconButton aria-label="add" color="primary" onClick={() => addSpace()}>
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
                </Grid>
            </form>
        </Card>
    )
}

export default FestivalCard;