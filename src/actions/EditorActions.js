import axios from "axios";
import servURL from "../servUrl";

export const getEditorList = () => async dispatch => {
    try {

        dispatch({
            type: "EDITOR_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/editor/list`);

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
};

export const getEditorListByFestivalID = (id) => async dispatch => {
    try {

        dispatch({
            type: "EDITOR_LIST_EDITOR_LOADING",
        });

        const res = await axios.get(`${servURL}/editor/list/festival/${id}`);

        dispatch({
            type: "EDITOR_LIST_EDITOR_SUCCESS",
            payload: res.data,
        });

    } catch (err) {
        dispatch({
            type: "EDITOR_LIST_EDITOR_FAIL",
            err: err
        });
    }
};

export const getEditorByID = (id) => async dispatch => {
    try {

        dispatch({
            type: "EDITOR_LOADING",
        });

        const res = await axios.get(`${servURL}/editor/${id}`);

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
};

export const postEditor = (editor) => async dispatch => {
    try {

        const res = await axios.post(`${servURL}/editor`, editor);

        dispatch({
            type: "EDITOR_ADD_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        // dispatch({
        //     type: "EDITOR_POST_FAIL",
        //     err: err,
        // });
    }
};

export const deleteEditor = (id) => async dispatch => {
    try {

        const res = await axios.delete(`${servURL}/editor/${id}`);

        dispatch({
            type: "EDITOR_DELETE_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "EDITOR_DELETE_FAIL",
        //     err: err,
        // });
    }
};

export const patchEditor = (editor) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/editor/${editor._id}`, editor);

        dispatch({
            type: "EDITOR_UPDATED_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "EDITOR_UPDATED_FAIL",
        //     err: err,
        // });
    }
};