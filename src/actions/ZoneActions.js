import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const getZoneByID = (id) => async dispatch => {
    try {

        dispatch({
            type: "ZONE_LOADING",
        });

        const res = await axios.get(`${servURL}/zone/${id}`,{headers: authHeader()});

        dispatch({
            type: "ZONE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: "ZONE_FAIL",
            err: err
        });
    }
};

export const getZoneList = (festivalId) => async dispatch => {
    try {

        dispatch({
            type: "ZONE_LIST_LOADING",
        });
        console.log(festivalId)
        const res = await axios.get(`${servURL}/zone/list/festival/${festivalId}`, {headers: authHeader()});
        console.log(res)

        dispatch({
            type: "ZONE_LIST_SUCCESS",
            payload: res.data,
        });

    } catch (err) {
        dispatch({
            type: "ZONE_LIST_FAIL",
            err: err
        });
    }
};

export const postZone = (zone) => async dispatch => {
    try {

        const res = await axios.post(`${servURL}/zone`, zone,{headers: authHeader()});

        dispatch({
            type: "ZONE_ADD_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        // dispatch({
        //     type: "ZONE_POST_FAIL",
        //     err: err,
        // });
    }
}

export const deleteZone = (id) => async dispatch => {
    try {

        const res = await axios.delete(`${servURL}/zone/${id}`,{headers: authHeader()});

        dispatch({
            type: "ZONE_DELETE_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "ZONE_DELETE_FAIL",
        //     err: err,
        // });
    }
};

export const patchZone = (zone) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/zone/${zone._id}`, zone,{headers: authHeader()});

        dispatch({
            type: "ZONE_UPDATED_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "ZONE_UPDATED_FAIL",
        //     err: err,
        // });
    }
};