import axios from "axios";

export const getFestivalList = (page) => async dispatch => {
    try {

        dispatch({
            type: "FESTIVAL_LIST_LOADING",
        });

        const res = await axios.get("https://awi-api.herokuapp.com/game/list/festival");

        dispatch({
            type: "FESTIVAL_LIST_SUCCESS",
            payload: res,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: "FESTIVAL_LIST_FAIL",
        });
    }
}