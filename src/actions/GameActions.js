import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const getGameList = () => async dispatch => {
    try {

        dispatch({
            type: "GAME_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/game/list`,{headers: authHeader()});

        dispatch({
            type: "GAME_LIST_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "GAME_LIST_FAIL",
            err: err
        });
    }
}

export const getGameByID = (id) => async dispatch => {
    try {

        dispatch({
            type: "GAME_LOADING",
        });

        const res = await axios.get(`${servURL}/game/${id}`,{headers: authHeader()});

        dispatch({
            type: "GAME_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "GAME_FAIL",
            err: err,
        });
    }
}

export const getGameListByEditorID = (id) => async dispatch => {
    try {

        dispatch({
            type: "GAME_LIST_EDITOR_LOADING",
        });

        const res = await axios.get(`${servURL}/game/list/editor/${id}`,{headers: authHeader()});

        dispatch({
            type: "GAME_LIST_EDITOR_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "GAME_LIST_EDITOR_FAIL",
            err: err,
        });
    }
}

export const getGameListByZoneID = (id) => async dispatch => {
    try {

        dispatch({
            type: "GAME_LIST_ZONE_LOADING",
        });

        const res = await axios.get(`${servURL}/game/list/zone/${id}`,{headers: authHeader()});

        dispatch({
            type: "GAME_LIST_ZONE_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "GAME_LIST_ZONE_FAIL",
            err: err,
        });
    }
}

export const postGame = (game) => async dispatch => {
    try {

        const res = await axios.post(`${servURL}/game`, game,{headers: authHeader()});

        dispatch({
            type: "GAME_ADD_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        // dispatch({
        //     type: "GAME_POST_FAIL",
        //     err: err,
        // });
    }
};

export const deleteGame = (id) => async dispatch => {
    try {

        const res = await axios.delete(`${servURL}/game/${id}`,{headers: authHeader()});

        dispatch({
            type: "GAME_DELETE_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "GAME_DELETE_FAIL",
        //     err: err,
        // });
    }
};

export const patchGame = (game) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/game/${game._id}`, game,{headers: authHeader()});

        dispatch({
            type: "GAME_UPDATED_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "GAME_UPDATED_FAIL",
        //     err: err,
        // });
    }
};
