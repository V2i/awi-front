import axios from "axios";

export const getExhibitorList = () => async dispatch => {
    try {

        dispatch({
            type: "EXHIBITOR_LIST_LOADING",
        });

        const res = await axios.get("https://awi-api.herokuapp.com/exhibitor/list");

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

        const res = await axios.get(`https://awi-api.herokuapp.com/exhibitor/${id}`);

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