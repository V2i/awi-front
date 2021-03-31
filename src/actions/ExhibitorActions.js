import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const getExhibitorList = () => async dispatch => {
    try {

        dispatch({
            type: "EXHIBITOR_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/exhibitor/list`,{headers: authHeader()});

        dispatch({
            type: "EXHIBITOR_LIST_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "EXHIBITOR_LIST_FAIL",
            err: err
        });
    }
}

export const getExhibitorByID = (id) => async dispatch => {
    try {

        dispatch({
            type: "EXHIBITOR_LOADING",
        });

        const res = await axios.get(`${servURL}/exhibitor/${id}`,{headers: authHeader()});

        dispatch({
            type: "EXHIBITOR_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "EXHIBITOR_FAIL",
            err: err,
        });
    }
}

export const postExhibitor = (exhibitor) => async dispatch => {
    try {

        const res = await axios.post(`${servURL}/exhibitor`, exhibitor, {headers: authHeader()});

        dispatch({
            type: "EXHIBITOR_ADD_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        // dispatch({
        //     type: "EXHIBITOR_POST_FAIL",
        //     err: err,
        // });
    }
};

export const deleteExhibitor = (id) => async dispatch => {
    try {

        const res = await axios.delete(`${servURL}/exhibitor/${id}`, {headers: authHeader()});

        dispatch({
            type: "EXHIBITOR_DELETE_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "EXHIBITOR_DELETE_FAIL",
        //     err: err,
        // });
    }
};

export const patchExhibitor = (exhibitor) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/exhibitor/${exhibitor._id}`, exhibitor, {headers: authHeader()});

        dispatch({
            type: "EXHIBITOR_UPDATED_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "EXHIBITOR_UPDATED_FAIL",
        //     err: err,
        // });
    }
};