import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getReservationList} from "../../actions/ReservationActions";
import {Link} from "react-router-dom";
import Loading from "../Loading";

const ReservationList = () => {

    const dispatch = useDispatch();
    const reservationList = useSelector(state => state.ReservationList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getReservationList());
        };
        fetchData();
    }, [dispatch]);

    const showData = () => {
        if(!_.isEmpty(reservationList.data)) {
            return reservationList.data.map(f => {
                    return (<li key={f._id}>
                        <Link to={`/reservation/${f._id}`}>{f.reservationExhibitor.exhibitorName}</Link>
                    </li>)
                }
            )
        }
        if(reservationList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(reservationList.errorMsg !== "") {
            return <p>{reservationList.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            <h1>Liste des Reservations</h1>
            {showData()}
        </div>
    )
}

export default ReservationList;