import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getReservationList, deleteReservation, getReservationByFestivalID} from "../../actions/ReservationActions";
import {
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer, Paper, Grid, InputBase
} from "@material-ui/core";
import {Link} from "react-router-dom";
import Loading from "../Loading";
import IconButton from "@material-ui/core/IconButton";
import {Add, Create, Delete, Visibility} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import AddReservation from "./AddReservation";

const ReservationList = ({festivalID = false}) => {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const reservationList = useSelector(state => state.ReservationList);
    const user = useSelector(state => state.User);

    const searchInitialState ={
        search: "",
    }

    const [searchState, setState] = useState(searchInitialState);

    React.useEffect(() => {
        const fetchData = () => {
            if (!festivalID){
                dispatch(getReservationList());
            }
            else{
                dispatch(getReservationByFestivalID(festivalID));
            }
            
        };
        fetchData();
    }, [dispatch]);

    const removeReservation = (id) => {
        dispatch(deleteReservation(id));
    };

    const changeValueOpen = (value) => {
        setOpen(value)
    };

    const searchSpace = (event)=>{
        let keyword = event.target.value;
        setState({search:keyword})
      }

    const showData = () => {
        if(!_.isEmpty(reservationList.data)) {
            return (
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Exposant</TableCell>
                            <TableCell>Se Deplace?</TableCell>
                            <TableCell>Besoin de Volontaire?</TableCell>
                            <TableCell>Montant €</TableCell>
                            <TableCell>Facturation</TableCell>
                            <TableCell>Suivi</TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservationList.data.filter((data) => {
                        if(searchState.search == null)
                            return data
                        else if(data.reservationExhibitor.exhibitorName.toLowerCase().includes(searchState.search.toLowerCase())){
                            return data
                        }
                        })
                        
                        .map(row => (
                            <TableRow key={row._id}>
                                <TableCell>{row.reservationExhibitor && row.reservationExhibitor.exhibitorName}</TableCell>
                                <TableCell>{row.exhibitorIsMoving}</TableCell>
                                <TableCell>{row.exhibitorVolunteerNeeded}</TableCell>
                                <TableCell>{row.reservationBilling && row.reservationBilling.billingAmount}</TableCell>
                                <TableCell>{row.reservationBilling && row.reservationBilling.billingStatus}</TableCell>
                                <TableCell>{row.reservationBilling && row.reservationTracking.trackingWorkflow}</TableCell>
                                <TableCell>
                                    <IconButton variant="outlined" color="primary" component={Link} to={`/reservation/${row._id}`}><Visibility /></IconButton>
                                    <IconButton variant="outlined" style={{ color: green[500] }} ><Create /></IconButton>
                                    <IconButton variant="outlined" color="secondary" onClick={() => removeReservation(row._id)}><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
            )
        }
        if(reservationList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(reservationList.errorMsg !== "") {
            return <p>{reservationList.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            {user.isLoggedIn
                ? <div>
                    <h1>Liste des Reservations</h1>
                    <Grid item xs={6}>
                        <InputBase  type="text" placeholder="Recherche..." onChange={(e)=>searchSpace(e)} />
                    </Grid>
                    <IconButton variant="outlined" color="primary" onClick={() => changeValueOpen(true)}><Add /></IconButton>
                    {showData()}
                    <AddReservation open={open} handleClose={() => changeValueOpen(false)}/>
                </div>
                :<p>Vous n'avez pas la permission requise!</p>
            }
        </div>
    )
}

export default ReservationList;