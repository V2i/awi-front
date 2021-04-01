import React, {useState} from 'react';
import {
    TableCell, TableRow, IconButton,
} from "@material-ui/core";
import {patchSpace, deleteSpace} from "../../actions/SpaceActions";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import {Delete, Save} from "@material-ui/icons";
import {getReservationByFestivalID} from "../../actions/ReservationActions";

const FestivalSpace = ({space, festival}) => {
    const reservations = useSelector(state => state.ReservationList);

    const dispatch = useDispatch();
    
    React.useEffect(() => {
        dispatch(getReservationByFestivalID(festival._id));
    }, [dispatch, festival._id]);

    const initialSpace = {
        _id: space._id,
        spaceName: space.spaceName,
        spacePriceTable: space.spacePriceTable,
        spacePriceSurface: space.spacePriceSurface,
        spaceNbTable: space.spaceNbTable,
        spaceSurface: space.spaceSurface
    }

    const [newSpace, setSpace] = useState(initialSpace);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setSpace({ ...newSpace, [name]: value });
    };

    const removeSpace = (id) => {
        dispatch(deleteSpace(id, festival));
    };

    const updateSpace = (space) => {
        dispatch(patchSpace(space));
    };

    const getData = () => {
        var nbTables = 0;
        var nbSurface = 0;
        var restant = 0;

        reservations.data.forEach(r => {
            r.reservationReservedSpace.forEach(s => {
                if (s.reservedSpace._id === space._id){
                    nbTables += s.reservedSpaceNbTable
                    nbSurface += s.reservedSpaceSurface
                }
            })
        })

        const rest = festival.festivalSpace.find(s => s._id === space._id)
        restant = Math.round((rest.spaceNbTable - nbTables) - nbSurface/6)
        return { nbTables, nbSurface, restant }
    }

    const restants = getData();

    return(
        <TableRow key={newSpace._id}>
            <TableCell component="th" scope="row">
                <TextField value={newSpace.spaceName} onChange={handleChange} name="spaceName"/>
            </TableCell>
            <TableCell align="right">
                <TextField value={newSpace.spaceNbTable} onChange={handleChange} name="spaceNbTable"/>
            </TableCell>
            <TableCell align="right">
                <TextField value={newSpace.spacePriceTable} onChange={handleChange} name="spacePriceTable"/>
            </TableCell>
            <TableCell align="right">
                <TextField value={newSpace.spacePriceSurface} onChange={handleChange} name="spacePriceSurface"/>
            </TableCell>
            <TableCell align="right">{restants.nbTables}</TableCell>
            <TableCell align="right">{restants.nbSurface}</TableCell>
            <TableCell align="right">{restants.restant}</TableCell>
            <TableCell align="right">
                <IconButton aria-label="delete" color="default" onClick={() => updateSpace(newSpace)}>
                    <Save />
                </IconButton>
            </TableCell>
            <TableCell align="right">
                <IconButton aria-label="delete" color="secondary" onClick={() => removeSpace(newSpace._id)}>
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default FestivalSpace;