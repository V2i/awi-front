import axios from "axios";
import servURL from "../servUrl";

export const getFestivalList = () => async dispatch => {
    try {

        dispatch({
            type: "FESTIVAL_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/festival/list`);

        dispatch({
            type: "FESTIVAL_LIST_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "FESTIVAL_LIST_FAIL",
            err: err
        });
    }
};

export const getFestivalByID = (id) => async dispatch => {
    try {

        dispatch({
            type: "FESTIVAL_LOADING",
        });

        const res = await axios.get(`${servURL}/festival/${id}`);

        dispatch({
            type: "FESTIVAL_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "FESTIVAL_FAIL",
            err: err,
        });
    }
};

export const postFestival = (festival) => async dispatch => {
    try {

        const res = await axios.post(`${servURL}/festival`, festival);

        dispatch({
            type: "FESTIVAL_ADD_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        // dispatch({
        //     type: "FESTIVAL_POST_FAIL",
        //     err: err,
        // });
    }
};

export const deleteFestival = (id) => async dispatch => {
    try {

        const res = await axios.delete(`${servURL}/festival/${id}`);

        dispatch({
            type: "FESTIVAL_DELETE_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "FESTIVAL_FAIL",
        //     err: err,
        // });
    }
};

export const patchFestival = (festival) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/festival/${festival._id}`, festival);

        dispatch({
            type: "FESTIVAL_UPDATED_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "FESTIVAL_FAIL",
        //     err: err,
        // });
    }
};