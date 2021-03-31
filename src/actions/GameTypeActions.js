import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const getGameTypeList = () => async dispatch => {
    try {

        dispatch({
            type: "GAME_TYPE_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/gameType/list`,{headers: authHeader()});

        dispatch({
            type: "GAME_TYPE_LIST_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "GAME_TYPE_LIST_FAIL",
            err: err
        });
    }
}

export const getGameTypeByID = (id) => async dispatch => {
    try {

        dispatch({
            type: "GAME_TYPE_LOADING",
        });

        const res = await axios.get(`${servURL}/gameType/${id}`,{headers: authHeader()});

        dispatch({
            type: "GAME_STYPE_UCCESS",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "GAME_TYPE_FAIL",
            err: err,
        });
    }
}

export const postGameType = (type) => async dispatch => {
    try {

        const res = await axios.post(`${servURL}/gameType`, type,{headers: authHeader()});

        dispatch({
            type: "GAME_TYPE_ADD_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        // dispatch({
        //     type: "GAME_TYPE_POST_FAIL",
        //     err: err,
        // });
    }
};

export const deleteGameType = (id) => async dispatch => {
    try {

        const res = await axios.delete(`${servURL}/gameType/${id}`,{headers: authHeader()});

        dispatch({
            type: "GAME_TYPE_DELETE_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "GAME_DELETE_FAIL",
        //     err: err,
        // });
    }
};

export const patchGameType = (type) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/gameType/${type._id}`, type,{headers: authHeader()});

        dispatch({
            type: "GAME_TYPE_UPDATED_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "GAME_TYPE_UPDATED_FAIL",
        //     err: err,
        // });
    }
};