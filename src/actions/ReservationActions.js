import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const getReservationList = () => async dispatch => {
    try {

        dispatch({
            type: "RESERVATION_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/reservation/list`,{headers: authHeader()});

        dispatch({
            type: "RESERVATION_LIST_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "RESERVATION_LIST_FAIL",
            err: err
        });
    }
};

export const getReservationByID = (id) => async dispatch => {
    try {

        dispatch({
            type: "RESERVATION_LOADING",
        });

        const res = await axios.get(`${servURL}/reservation/${id}`,{headers: authHeader()});

        dispatch({
            type: "RESERVATION_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "RESERVATION_FAIL",
            err: err,
        });
    }
};

export const deleteReservation = (id) => async dispatch => {
    try {

        dispatch({
            type: "RESERVATION_LOADING",
        });

        const res = await axios.delete(`${servURL}/reservation/${id}`,{headers: authHeader()});

        dispatch({
            type: "RESERVATION_DELETE_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "RESERVATION_FAIL",
        //     err: err,
        // });
        console.log(err)
    }
};

export const postReservation = (reservation) => async dispatch => {

    try {

        dispatch({
            type: "RESERVATION_LOADING",
        });

        const initialTracking = {
            trackingWorkflow: "Pas encore contacté",
            trackingCR: false
        };

        const initialBilling = {
            billingStatus: "Pas faite",
            billingAmount: 0
        };

        const tracking = await axios.post(`${servURL}/tracking`, initialTracking,{headers: authHeader()})

        const billing = await axios.post(`${servURL}/billing`, initialBilling,{headers: authHeader()})

        reservation.reservationTracking = tracking.data._id;
        reservation.reservationBilling = billing.data._id;

        const res = await axios.post(`${servURL}/reservation`, reservation,{headers: authHeader()});

        dispatch({
            type: "RESERVATION_ADD_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err)
    }
};