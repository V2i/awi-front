import axios from "axios";

export const getGameList = () => async dispatch => {
    try {

        dispatch({
            type: "GAME_LIST_LOADING",
        });

        const res = await axios.get("https://awi-api.herokuapp.com/game/list");

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

        const res = await axios.get(`https://awi-api.herokuapp.com/game/${id}`);

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
