import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const getFestivalList = () => async dispatch => {
    try {

        dispatch({
            type: "FESTIVAL_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/festival/list`,{headers: authHeader()});

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

        const res = await axios.get(`${servURL}/festival/${id}`,{headers: authHeader()});

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

        const res = await axios.post(`${servURL}/festival`, festival,{headers: authHeader()});

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

        const res = await axios.delete(`${servURL}/festival/${id}`,{headers: authHeader()});

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

        if(festival.isCurrent === true) {
            const festivalCurrent = await axios.get(`${servURL}/festival/current`,{headers: authHeader()});
            if(festivalCurrent.data._id !== festival._id) {
                const festivalUpdated = await axios.patch(`${servURL}/festival/${festivalCurrent.data._id}`, {
                    isCurrent: false,
                },{headers: authHeader()});

                dispatch({
                    type: "FESTIVAL_UPDATED_SUCCESS",
                    payload: festivalUpdated.data
                });
            }
        }

        const res = await axios.patch(`${servURL}/festival/${festival._id}`, festival,{headers: authHeader()});

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

export const changeFestival = (festival) => async dispatch => {

    dispatch({
        type: "FESTIVAL_SUCCESS",
        payload: festival
    });

};