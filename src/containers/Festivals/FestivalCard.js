import React, {useState} from 'react';
import {
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer,
    Checkbox,
    Typography,
    Paper,
    Card,
    FormControlLabel,
    Button, IconButton,
} from "@material-ui/core";
import moment from 'moment';
import {patchFestival, deleteFestival} from "../../actions/FestivalActions";
import {useDispatch} from "react-redux";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import {postSpace} from "../../actions/SpaceActions";
import FestivalSpace from "./FestivalSpace";

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

    const handleChange = (event) => {
        if(event.target) {
            const { name, value } = event.target;
            setFestival({ ...newFestival, [name]: value });
        } else {
            setFestival({...newFestival, festivalDate: event});
        }
    };

    const removeFestival = (id) => {
        dispatch(deleteFestival(id));
    }

    const updateFestival = (festival) => {
        dispatch(patchFestival(festival));
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
                <TextField name="festivalName" label="Nom" value={newFestival.festivalName} onChange={handleChange}/>
                <Typography>{moment(festival.festivalDate).format('DD/MM/YYYY')}</Typography>

                <FormControlLabel
                    control={<Checkbox value={newFestival.isCurrent} checked={newFestival.isCurrent} onChange={handleChange} name="isCurrent" />}
                    label="Courant ?"
                />

                <Button variant="contained" color="primary" href={`${festival._id}`}>
                    Voir
                </Button>
                <Button variant="contained" color="default" onClick={() => updateFestival(newFestival)}>
                    Sauvegarder
                </Button>
                <Button variant="contained" color="secondary" onClick={() => removeFestival(festival._id)}>
                    Supprimer
                </Button>

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
                                <TableCell align="center">
                                    <IconButton aria-label="add" color="primary" onClick={() => addSpace()}>
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </Card>
    )
}

export default FestivalCard;