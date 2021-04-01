import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {
    Table, TableBody, TableCell, TableRow, TableHead, TextField, TableContainer, Paper
} from "@material-ui/core";
import Loading from "../Loading";
import IconButton from "@material-ui/core/IconButton";
import {Add, Create, Delete, Save} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import {deleteReservedSpace, getReservedSpaceListByReservation, patchReservedSpace} from "../../actions/ReservedSpaceActions";
import AddReservedSpace from "./AddReservedSpace";

const ReservedSpaceList = ({reservationId}) => {

    const [open, setOpen] = useState(false);
    const [selectedReservedSpace, setReservedSpace] = useState(false);
    const dispatch = useDispatch();
    const reservation = useSelector(state => state.Reservation);
    const reservedSpaceList = useSelector(state => state.ReservedSpaceList);
    const user = useSelector(state => state.User);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getReservedSpaceListByReservation(reservation.data));
        };
        fetchData();
    }, [dispatch, reservation.data, reservationId]);

    const removeReservedSpace = (id) => {
        dispatch(deleteReservedSpace(id, reservation));
    };

    const saveReservedSpace = (selectedReservedSpace) => {
        dispatch(patchReservedSpace(selectedReservedSpace, reservation))
        setReservedSpace(false)
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
                <TableContainer component={Paper}>
                    <Table stickyHeader size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{'font-weight':'bold'}}>Espace</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Nombre de table</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Surface (m²)</TableCell>
                                <TableCell style={{'font-weight':'bold'}}>Reduction</TableCell>
                                <TableCell style={{'font-weight':'bold'}}> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservedSpaceList.data.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell>{reservation.data.reservationFestival.festivalSpace.map(s => {
                                        if (s._id === row.reservedSpace) return s.spaceName
                                        else return ""
                                    })}</TableCell>
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
                                        { selectedReservedSpace._id === row._id
                                            ? <IconButton variant="outlined" onClick={() => saveReservedSpace(selectedReservedSpace)}><Save /></IconButton>
                                            : <IconButton variant="outlined" style={{ color: green[500] }} onClick={() => setReservedSpace(row)}><Create /></IconButton>
                                        }
                                        <IconButton variant="outlined" color="secondary" onClick={() => removeReservedSpace(row._id)}><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
                    <AddReservedSpace open={open} handleClose={() => changeValueOpen(false)}/>
                </div>
                :<p>Vous n'avez pas la permission requise!</p>
            }
        </div>
    )
}

export default ReservedSpaceList;