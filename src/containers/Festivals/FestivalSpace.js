import React, {useState} from 'react';
import {
    TableCell, TableRow, IconButton,
} from "@material-ui/core";
import {patchSpace, deleteSpace} from "../../actions/SpaceActions";
import {useDispatch} from "react-redux";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";

const FestivalSpace = ({space, festival}) => {

    const initialSpace = {
        _id: space._id,
        spaceName: space.spaceName,
        spacePriceTable: space.spacePriceTable,
        spacePriceSurface: space.spacePriceSurface,
        spaceNbTable: space.spaceNbTable,
        spaceSurface: space.spaceSurface
    }

    const [newSpace, setSpace] = useState(initialSpace);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSpace({ ...newSpace, [name]: value });
    };

    const removeSpace = (id) => {
        dispatch(deleteSpace(id, festival));
    };

    const updateFestival = (space) => {
        dispatch(patchSpace(space));
    };

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
            <TableCell align="right">Res</TableCell>
            <TableCell align="right">Res</TableCell>
            <TableCell align="right">Res</TableCell>
            <TableCell align="right">
                <IconButton aria-label="delete" color="secondary" onClick={() => removeSpace(newSpace._id)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default FestivalSpace;