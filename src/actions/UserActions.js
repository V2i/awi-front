import axios from "axios";
import servURL from "../servUrl";

export const getUserList = () => async dispatch => {
    try {

        dispatch({
            type: "USER_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/user/list`);

        dispatch({
            type: "USER_LIST_SUCCESS",
            payload: res.data,
        });

    } catch (err) {
        dispatch({
            type: "USER_LIST_FAIL",
            err: err
        });
    }
};

export const postUser = (user) => async dispatch => {
    try {

        dispatch({
            type: "USER_LIST_LOADING",
        });

        const res = await axios.post(`${servURL}/user`, user);

        dispatch({
            type: "USER_ADD_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const deleteUser = (id) => async dispatch => {
    try {

        dispatch({
            type: "USER_LIST_LOADING",
        });

        const res = await axios.delete(`${servURL}/user/${id}`);

        dispatch({
            type: "USER_DELETE_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};

export const patchUser = (user) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/user/${user._id}`, user);

        dispatch({
            type: "USER_UPDATED_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};

export const login = (user) => async dispatch => {
    try {

        const res = await axios.post(`${servURL}/login`, user);

        if(res.data.authToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const logout = () => async dispatch => {

    try{
        localStorage.removeItem("user");

        dispatch({
            type: "LOGOUT_SUCCESS",
        });

    } catch (e) {
        console.log(e);
    }
};