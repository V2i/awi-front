import axios from "axios";

export const getFestivalList = () => async dispatch => {
    try {

        dispatch({
            type: "FESTIVAL_LIST_LOADING",
        });

        const res = await axios.get("https://awi-api.herokuapp.com/festival/list");

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
}

export const getFestivalByID = (id) => async dispatch => {
    try {

        dispatch({
            type: "FESTIVAL_LOADING",
        });

        console.log(id);
        const res = await axios.get(`https://awi-api.herokuapp.com/festival/${id}`);

        dispatch({
            type: "FESTIVAL_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "FESTIVAL_FAIL",
            //err: err,
        });
    }
}