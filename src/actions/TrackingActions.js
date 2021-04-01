import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const getTrackingListByFestival = (id) => async dispatch => {
    try {

        dispatch({
            type: "TRACKING_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/reservation/list/festival/${id}`,{headers: authHeader()});

        dispatch({
            type: "TRACKING_LIST_SUCCESS",
            payload: res.data.map(r => {
                return r.reservationTracking;
            }),
        });
    } catch (err) {
        dispatch({
            type: "TRACKING_LIST_FAIL",
            err: err
        });
    }
};

export const getTrackingByID = (id) => async dispatch => {
    try {

        dispatch({
            type: "TRACKING_LOADING",
        });

        const res = await axios.get(`${servURL}/tracking/${id}`,{headers: authHeader()});

        dispatch({
            type: "TRACKING_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: "TRACKING_FAIL",
            err: err,
        });
    }
};

export const patchTracking = (tracking, reservation) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/tracking/${tracking._id}`, tracking,{headers: authHeader()});

        dispatch({
            type: "TRACKING_UPDATED_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err)
    }
};