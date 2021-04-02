import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import Loading from "../Loading";
import {getBillingById, patchBilling} from "../../actions/BillingActions";
import { Paper, Grid, TextField, Typography, FormControl, Select, MenuItem, TableContainer,
    Table, TableBody, TableCell, TableRow, TableHead, 
 } from "@material-ui/core";
 import IconButton from '@material-ui/core/IconButton';
 import { Create, Save } from '@material-ui/icons';
import moment from 'moment';
import {KeyboardDatePicker} from "@material-ui/pickers";
import {green} from "@material-ui/core/colors";

const Billing = ({billing}) => {

    const billingStatusList = ['Faite', 'Pas faite', 'Réglée'];
    const dispatch = useDispatch();
    const [ billingChanged, setUpdate ] = useState(false);
    const [ billingUpdated, setBilling ] = useState(billing);
    
    const user = useSelector(state => state.User);

    const handleChange = (event) => {
        if(event.target) {
            const { name, value } = event.target;
            setBilling({...billingUpdated, [name]: value})
        } 
    };


    const saveBilling = () => {
        console.log(billingUpdated)
        dispatch(patchBilling(billingUpdated))
        setBilling({})
        setUpdate(false)
    }

    
    return(
        <Paper>
            <h4>Facture</h4>
        <TableContainer component={Paper}>
            <Table stickyHeader size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{'font-weight':'bold'}}>Statut</TableCell>
                        <TableCell style={{'font-weight':'bold'}}>Montant (en €)</TableCell>
                        <TableCell style={{'font-weight':'bold'}}>Envoyée le</TableCell>
                        <TableCell style={{'font-weight':'bold'}}>Payée le</TableCell>
                        <TableCell style={{'font-weight':'bold'}}> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                    <TableCell>
                        {billingChanged 
                            ? <FormControl>
                                <Select
                                labelId="prototype"
                                id="billingStatus"
                                name="billingStatus"
                                value={billingUpdated.billingStatus || billing.billingStatus}
                                onChange={handleChange}
                                >
                                    {billingStatusList.map((s, index)=> <MenuItem key={index} value={s}>{s}</MenuItem>)}
                                </Select>
                            </FormControl>
                            : billing.billingStatus 
                        }
                    </TableCell>
                    <TableCell>
                        { billingChanged 
                        ? 
                            <TextField
                                name="billingAmount"
                                value={billingUpdated.billingAmount || billing.billingAmount}
                                onChange={handleChange}
                            />
                        : billing.billingAmount
                        }
                    </TableCell>
                    <TableCell component="th" scope="row">
                            { billingChanged 
                            ? <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="DD/MM/YYYY"
                                margin="normal"
                                id="date-picker-send"
                                name="billingSendDate"
                                value={billingUpdated.billingSendDate}
                                onChange={(evt) => handleChange({target : {name: "billingSendDate", value: evt}})}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            : billing.billingSendDate ? moment(billing.billingSendDate).format("DD/MM/YYYY") : ""
                            }
                        
                    </TableCell>
                    <TableCell>
                    { billingChanged 
                    ? <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="DD/MM/YYYY"
                        margin="normal"
                        id="date-picker-paid"
                        name="billingPaidDate"
                        value={billingUpdated.billingPaidDate}
                        onChange={(evt) => handleChange({target : {name: "billingPaidDate", value: evt}})}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    : billing.billingPaidDate ?  moment(billing.billingPaidDate).format("DD/MM/YYYY") : ""
                    }
                    </TableCell>
                    
                    { billingChanged
                    ? <IconButton variant="outlined" onClick={saveBilling}><Save /></IconButton>
                    : <IconButton variant="outlined" style={{ color: green[500] }} onClick={() => setUpdate(true)}><Create /></IconButton>
                    }
                    
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    )
           
     
}

export default Billing;