import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import Loading from "../Loading";
import {getBillingById, patchBilling} from "../../actions/BillingActions";
import { Paper, Grid, TextField, Typography, FormControl, Select, MenuItem
 } from "@material-ui/core";
 import IconButton from '@material-ui/core/IconButton';
 import { Create, Save } from '@material-ui/icons';
import moment from 'moment';
import {KeyboardDatePicker} from "@material-ui/pickers";

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
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Typography> Statut : </Typography>
                { billingChanged 
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
                : <Typography>{ billing.billingStatus }</Typography>
                }
            </Grid>
            <Grid item xs={6}>
                <Typography> Montant : </Typography>
                { billingChanged 
                ? 
                    <TextField
                        name="billingAmount"
                        value={billingUpdated.billingAmount || billing.billingAmount}
                        onChange={handleChange}
                    />
                : <Typography>{ billing.billingAmount } €</Typography>
                }
            </Grid>
            <Grid item xs={5}>
                <Typography> Envoyée le : </Typography>
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
                : <Typography>{ billing.billingSendDate ? moment(billing.billingSendDate).format("DD/MM/YYYY") : ""}</Typography>
                }
            </Grid>
            <Grid item xs={5}>
                <Typography> Payée le : </Typography>
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
                : <Typography>{ billing.billingPaidDate ?  moment(billing.billingPaidDate).format("DD/MM/YYYY") : ""}</Typography>
                }
            </Grid>
            
            <Grid item xs={2}>
                
                { billingChanged
                    ? <IconButton variant="outlined" onClick={saveBilling}><Save /></IconButton>
                    : <IconButton variant="outlined" onClick={() => setUpdate(true)}><Create /></IconButton>
                }
            </Grid>
                        
        </Grid>
    )
           
     
}

export default Billing;