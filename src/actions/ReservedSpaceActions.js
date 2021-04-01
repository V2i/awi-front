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

export const getReservedSpaceListByReservation = (reservation) => async dispatch => {
    try {

        dispatch({
            type: "RESERVED_SPACE_LIST_LOADING",
        });

        dispatch({
            type: "RESERVED_SPACE_LIST_SUCCESS",
            payload: reservation.reservationReservedSpace
            ,
        });
    } catch (err) {
        dispatch({
            type: "RESERVED_SPACE_LIST_FAIL",
            err: err
        });
    }
};

export const postReservedSpace = (reservedSpace, reservation) => async dispatch => {
    try {

        const newReservedSpace = await axios.post(`${servURL}/reservedspace`, reservedSpace,{headers: authHeader()});

        dispatch({
            type: "RESERVED_SPACE_ADD_SUCCESS",
            payload: newReservedSpace.data
        });

        reservation.reservationReservedSpace.push(newReservedSpace.data)

        const res = await axios.patch(`${servURL}/reservation/${reservation._id}`, {
            reservationReservedSpace: reservation.reservationReservedSpace.map(s => s._id)
        },{headers: authHeader()});

        dispatch({
            type: "RESERVATION_UPDATED_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const deleteReservedSpace = (id, reservation) => async dispatch => {
    try {

        const res = await axios.delete(`${servURL}/reservedSpace/${id}`,{headers: authHeader()});

        dispatch({
            type: "RESERVED_SPACE_DELETE_SUCCESS",
            payload: res.data
        });

        const resUpdated = await axios.patch(`${servURL}/reservation/${reservation._id}`, {
            reservationReservedSpace: reservation.reservationReservedSpace.filter(s => s._id !== res.data._id).map(s => s._id)
        }, {headers: authHeader()});

        dispatch({
            type: "RESERVATION_UPDATED_SUCCESS",
            payload: resUpdated.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const patchReservedSpace = (space, reservation) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/reservedSpace/${space._id}`, space,{headers: authHeader()});

        console.log(res.data)

        dispatch({
            type: "RESERVED_SPACE_UPDATED_SUCCESS",
            payload: res.data
        });

        dispatch({
            type: "RESERVATION_UPDATED_SUCCESS",
            payload: reservation.reservationReservedSpace.map(r => {
                if (r._id === res.data._id){
                    r = res.data
                }
                return r})
        });

    } catch (err) {
        console.log(err);
    }
};