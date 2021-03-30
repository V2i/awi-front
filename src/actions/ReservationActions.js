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
}

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
}