import axios from "axios";
import servURL from "../servUrl";

export const getGameList = () => async dispatch => {
    try {

        dispatch({
            type: "GAME_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/game/list`);

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

        const res = await axios.get(`${servURL}/game/${id}`);

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

        const res = await axios.get(`${servURL}/game/list/editor/${id}`);

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

