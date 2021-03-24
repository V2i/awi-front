import axios from "axios";

export const getEditorList = () => async dispatch => {
    try {

        dispatch({
            type: "EDITOR_LIST_LOADING",
        });

        const res = await axios.get("https://awi-api.herokuapp.com/editor/list");

        dispatch({
            type: "EDITOR_LIST_SUCCESS",
            payload: res.data,
        });

    } catch (err) {
        dispatch({
            type: "EDITOR_LIST_FAIL",
            err: err
        });
    }
}

export const getEditorByID = (id) => async dispatch => {
    try {

        dispatch({
            type: "EDITOR_LOADING",
        });

        const res = await axios.get(`https://awi-api.herokuapp.com/editor/${id}`);

        dispatch({
            type: "EDITOR_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: "EDITOR_FAIL",
            err: err
        });
    }
}