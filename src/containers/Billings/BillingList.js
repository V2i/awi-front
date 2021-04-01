import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {getBillingListByFestival, patchBilling} from "../../actions/BillingActions";

import Loading from "../Loading";
import AddIcon from '@material-ui/icons/Add';
import { IconButton, Paper, TextField, FormControl, Select, MenuItem,
    Table, TableBody, TableCell, TableRow, TableHead, Grid, TableContainer
} from "@material-ui/core";
import { Create, Save, Visibility } from '@material-ui/icons';
import moment from 'moment';
import {KeyboardDatePicker} from "@material-ui/pickers";

const BillingList = ({festivalId}) => {
    
    const [open, setOpen] = React.useState(false);
    const [selectedBilling, setBilling] = React.useState(false);
    const dispatch = useDispatch();
    const billingList = useSelector(state => state.BillingList);
    const user = useSelector(state => state.User);
    const billingStatus = ['Faite', 'Pas faite', 'Réglée'];

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getBillingListByFestival(festivalId));
        };
        fetchData();
    }, [dispatch]);

    const changeValueOpen = (value) => {
        setOpen(value)
    }

    const handleChange = (event) => {
        if (event.target){
            const { name, value } = event.target;
            setBilling({...selectedBilling, [name] : value})
        }
    }

    const changeDate = (evt) => {
        const { name, value } = evt;
        setBilling({...selectedBilling, [name] : value})
    }

    const saveBilling = (billingSelected) => {
        dispatch(patchBilling(billingSelected))
        setBilling({})
    }

    const showData = () => {
        if(!_.isEmpty(billingList.data)) {
            return (
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Statut</TableCell>
                                <TableCell>Montant</TableCell>
                                <TableCell>Envoyée le</TableCell>
                                <TableCell>Payée le</TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {billingList.data.filter(d => d.reservationBilling && d.reservationBilling._id).map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {selectedBilling._id === row.reservationBilling._id 
                                    ? <FormControl>
                                        <Select
                                        labelId="prototype"
                                        id="billingStatus"
                                        name="billingStatus"
                                        value={selectedBilling.billingStatus || row.reservationBilling.billingStatus}
                                        onChange={handleChange}
                                        >
                                            {billingStatus.map((s, index)=> <MenuItem key={index} value={s}>{s}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    : row.reservationBilling.billingStatus }
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {selectedBilling._id === row.reservationBilling._id ? <TextField name="billingAmount" value={selectedBilling.billingAmount} onChange={handleChange}/> : row.reservationBilling.billingAmount }
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {selectedBilling._id === row.reservationBilling._id 
                                    ? <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="DD/MM/YYYY"
                                        margin="normal"
                                        id="date-picker-send"
                                        name="billingSendDate"
                                        value={selectedBilling.billingSendDate}
                                        onChange={(evt) => changeDate({name: "billingSendDate", value: evt})}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    : (!row.reservationBilling.billingSendDate ? "" : moment(row.reservationBilling.billingSendDate).format("DD/MM/YYYY")) }
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {selectedBilling._id === row.reservationBilling._id 
                                    ? <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="DD/MM/YYYY"
                                        margin="normal"
                                        id="date-picker-paid"
                                        name="billingPaidDate"
                                        value={selectedBilling.billingPaidDate}
                                        onChange={(evt) => changeDate({name: "billingPaidDate", value: evt})}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    : (!row.reservationBilling.billingPaidDate ? "" : moment(row.reservationBilling.billingPaidDate).format("DD/MM/YYYY")) }
                                </TableCell>
                                
                                {user.isLoggedIn
                                    ?
                                        <TableCell>
                                            <IconButton variant="outlined" color="primary" component={Link} to={`/reservation/${row._id}`}><Visibility /></IconButton>
                                            { selectedBilling._id === row.reservationBilling._id
                                                ? <IconButton variant="outlined" onClick={() => saveBilling(selectedBilling)}><Save /></IconButton>
                                                : <IconButton variant="outlined" onClick={() => setBilling(row.reservationBilling)}><Create /></IconButton>
                                            }
                                        </TableCell>
                                    :
                                        <></>
                                }
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
            </TableContainer>
            )
            
        }
        if(billingList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(billingList.errorMsg !== "") {
            return <p>{billingList.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <Paper>
            <h3>Factures</h3>
            
            {showData()}
        </Paper>
    )
}

export default BillingList;