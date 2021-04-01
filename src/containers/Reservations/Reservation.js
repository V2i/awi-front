import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getReservationByID} from "../../actions/ReservationActions";
import _ from "lodash";
import Loading from "../Loading";
import ReservedGameList from "../ReservedGames/ReservedGameList";
import ReservedSpaceList from "../ReservedSpaces/ReservedSpaceList";
import BillingCard from "../Billings/BillingCard";

import {Grid} from '@material-ui/core';

const Reservation = (props) => {

    const reservationId = props.match.params.id;
    const dispatch = useDispatch();
    const reservation = useSelector(state => state.Reservation);

    React.useEffect(() => {
        dispatch(getReservationByID(reservationId));
    }, [dispatch, reservationId]);

    const showData = () => {
        if(!_.isEmpty(reservation.data)) {
            return (
                <div>
                    <h1>Réservation du festival : {reservation.data.reservationFestival.festivalName}</h1>
                    <h3>Par : {reservation.data.reservationExhibitor.exhibitorName}</h3>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <ReservedGameList reservationId={reservationId} />
                    </Grid>
                    <Grid item xs={6}>
                        <ReservedSpaceList reservationId={reservationId} />
                    </Grid>
                    <Grid item xs={6}>
                        <BillingCard billing={reservation.data.reservationBilling} />
                    </Grid>
                </Grid>
                </div>
            )
        }
        if(reservation.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />
        }
        if(reservation.errorMsg !== "") {
            return <p>{reservation.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            {showData()}
        </div>
    )
}

export default Reservation;