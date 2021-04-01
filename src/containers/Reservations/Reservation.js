import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getReservationByID} from "../../actions/ReservationActions";
import _ from "lodash";
import Loading from "../Loading";

const Reservation = (props) => {

    const reservationId = props.match.params.id;
    const dispatch = useDispatch();
    const reservation = useSelector(state => state.Reservation);

    React.useEffect(() => {
        dispatch(getReservationByID(reservationId));
    }, [dispatch, reservationId]);

    const showData = () => {
        if(!_.isEmpty(reservation.data)) {
            return <h1>{reservation.data.reservationExhibitor.exhibitorName}</h1>
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