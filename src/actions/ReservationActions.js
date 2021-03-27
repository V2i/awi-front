import axios from "axios";
import servURL from "../servUrl";

export const getReservationList = () => async dispatch => {
    try {

        dispatch({
            type: "RESERVATION_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/reservation/list`);

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

        const res = await axios.get(`${servURL}/reservation/${id}`);

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