import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const getReservedSpaceList = () => async dispatch => {
    try {

        dispatch({
            type: "RESERVED_SPACE_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/exhibitor/list`,{headers: authHeader()});

        dispatch({
            type: "RESERVED_SPACE_LIST_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "RESERVED_SPACE_LIST_FAIL",
            err: err
        });
    }
};

export const postReservedSpace = (reservedSpace) => async dispatch => {
    try {

        const newReservedSpace = await axios.post(`${servURL}/reservedspace`, reservedSpace,{headers: authHeader()});

        dispatch({
            type: "RESERVED_SPACE_ADD_SUCCESS",
            payload: newReservedSpace.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const deleteReservedSpace = (id, festival) => async dispatch => {
    try {

        const res = await axios.delete(`${servURL}/space/${id}`,{headers: authHeader()});

        dispatch({
            type: "RESERVED_SPACE_DELETE_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};

export const patchReservedSpace = (space) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/space/${space._id}`, space,{headers: authHeader()});

        dispatch({
            type: "RESERVED_SPACE_UPDATED_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};