import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const getZoneList = () => async dispatch => {
    try {

        dispatch({
            type: "ZONE_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/zone/list`, {headers: authHeader()});

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