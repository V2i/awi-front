import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const getReservedGameList = () => async dispatch => {
    try {

        dispatch({
            type: "RESERVED_GAME_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/reservedGame/list`,{headers: authHeader()});

        dispatch({
            type: "RESERVED_GAME_LIST_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "RESERVED_GAME_LIST_FAIL",
            err: err
        });
    }
}

export const getReservedGameListByFestival = (id) => async dispatch => {
    try {

        dispatch({
            type: "RESERVED_GAME_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/game/list/festival/${id}`,{headers: authHeader()});
        
        dispatch({
            type: "RESERVED_GAME_LIST_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "RESERVED_GAME_LIST_FAIL",
            err: err
        });
    }
}

export const getReservedGameByID = (id) => async dispatch => {
    try {

        dispatch({
            type: "RESERVED_GAME_LOADING",
        });

        const res = await axios.get(`${servURL}/reservedGame/${id}`,{headers: authHeader()});

        dispatch({
            type: "RESERVED_GAME_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "RESERVED_GAME_FAIL",
            err: err,
        });
    }
}

export const postReservedGame = (game, reservation) => async dispatch => {
    try {

        const res = await axios.post(`${servURL}/reservedGame`, game,{headers: authHeader()});
        
        dispatch({
            type: "RESERVED_GAME_ADD_SUCCESS",
            payload: res.data
        });

        reservation.reservationReservedGame.push(res.data)

        const resUpdated = await axios.patch(`${servURL}/reservation/${reservation._id}`, {reservationReservedGame: reservation.reservationReservedGame.map(g => g._id)},{headers: authHeader()});
        
        dispatch({
            type: "RESERVATION_UPDATED_SUCCESS",
            payload: resUpdated.data
        });

    } catch (err) {
        // dispatch({
        //     type: "GAME_POST_FAIL",
        //     err: err,
        // });
    }
};

export const deleteReservedGame = (id, reservation) => async dispatch => {
    try {

        const res = await axios.delete(`${servURL}/reservedGame/${id}`,{headers: authHeader()});

        dispatch({
            type: "RESERVED_GAME_DELETE_SUCCESS",
            payload: res.data
        });

        const resUpdated = await axios.patch(`${servURL}/reservation/${reservation._id}`, {reservationReservedGame: reservation.reservationReservedGame.filter(g => g._id !== res.data._id).map(g => g._id)},{headers: authHeader()});

        dispatch({
            type: "RESERVATION_UPDATED_SUCCESS",
            payload: resUpdated.data
        });
    } catch (err) {
        // dispatch({
        //     type: "GAME_DELETE_FAIL",
        //     err: err,
        // });
    }
};

export const patchReservedGame = (game, reservation) => async dispatch => {
    try {
        const res = await axios.patch(`${servURL}/reservedGame/${game._id}`, game,{headers: authHeader()});

        dispatch({
            type: "RESERVED_GAME_UPDATED_SUCCESS",
            payload: res.data
        });
        
        dispatch({
            type: "RESERVATION_UPDATED_SUCCESS",
            payload: reservation.reservationReservedGame.map(r => {
                if (r._id === res.data._id){
                    r = res.data
                }
                return r})
                
        });

    } catch (err) {
        // dispatch({
        //     type: "GAME_UPDATED_FAIL",
        //     err: err,
        // });
    }
};
