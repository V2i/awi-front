import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getReservationList, deleteReservedSpace} from "../../actions/ReservedSpaceActions";
import {
    Table, TableBody, TableCell, TableRow, TableHead, TextField,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import Loading from "../Loading";
import IconButton from "@material-ui/core/IconButton";
import {Add, Create, Delete, Visibility} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import {getReservedSpaceList} from "../../actions/ReservedSpaceActions";

const ReservedSpaceList = () => {

    const [open, setOpen] = useState(false);
    const [selectedReservedSpace, setReservedSpace] = useState(false);
    const dispatch = useDispatch();
    const reservation = useSelector(state => state.Reservation);
    const reservedSpaceList = useSelector(state => state.ReservedSpaceList);
    const user = useSelector(state => state.User);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getReservedSpaceList());
        };
        fetchData();
    }, [dispatch]);

    const removeReservedSpace = (id) => {
        dispatch(deleteReservedSpace(id));
    };

    const changeValueOpen = (value) => {
        setOpen(value)
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setReservedSpace({...selectedReservedSpace, [name] : value });
    };

    const showData = () => {
        if(!_.isEmpty(reservation.data)) {
            return (
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Espace</TableCell>
                            <TableCell>Nombre de table</TableCell>
                            <TableCell>Surface (m²)</TableCell>
                            <TableCell>Reduction</TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservedSpaceList.data.map(row => (
                            <TableRow key={row._id}>
                                <TableCell>{row.reservedSpace.spaceName}</TableCell>
                                <TableCell>
                                    { selectedReservedSpace._id === row._id
                                        ? <TextField name="reservedSpaceNbTable" label="Nombre de table" value={selectedReservedSpace.reservedSpaceNbTable} onChange={handleChange}/>
                                        : row.reservedSpaceNbTable
                                    }
                                </TableCell>
                                <TableCell>
                                    { selectedReservedSpace._id === row._id
                                        ? <TextField name="reservedSpaceSurface" label="Surface" value={selectedReservedSpace.reservedSpaceSurface} onChange={handleChange}/>
                                        : row.reservedSpaceSurface
                                    }
                                </TableCell>
                                <TableCell>
                                    { selectedReservedSpace._id === row._id
                                        ? <TextField name="reservedSpaceDiscount" label="Nom" value={selectedReservedSpace.reservedSpaceDiscount} onChange={handleChange}/>
                                        : row.reservedSpaceDiscount
                                    }
                                </TableCell>
                                <TableCell>
                                    <IconButton variant="outlined" color="primary" component={Link} to={`/reservation/${row._id}`}><Visibility /></IconButton>
                                    <IconButton variant="outlined" style={{ color: green[500] }} ><Create /></IconButton>
                                    <IconButton variant="outlined" color="secondary" onClick={() => removeReservedSpace(row._id)}><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
                    <h1>Liste des Espaces Réservés</h1>
                    <IconButton variant="outlined" color="primary" onClick={() => changeValueOpen(true)}><Add /></IconButton>
                    {showData()}
                    {/*<AddReservation open={open} handleClose={() => changeValueOpen(false)}/>*/}
                </div>
                :<p>Vous n'avez pas la permission requise!</p>
            }
        </div>
    )
}

export default ReservedSpaceList;