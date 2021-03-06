import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const getContactList = () => async dispatch => {
    try {

        dispatch({
            type: "CONTACT_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/contact/list`,{headers: authHeader()});

        dispatch({
            type: "CONTACT_LIST_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "CONTACT_LIST_FAIL",
            err: err
        });
    }
};

export const postContact = (contact, exhibitor) => async dispatch => {
    try {

        const newContact = await axios.post(`${servURL}/contact`, contact,{headers: authHeader()});

        dispatch({
            type: "CONTACT_ADD_SUCCESS",
            payload: newContact.data
        });

        console.log(exhibitor)

        exhibitor.exhibitorContact.push(newContact.data);

        const res = await axios.patch(`${servURL}/exhibitor/${exhibitor._id}`, {
            exhibitorContact: exhibitor.exhibitorContact.map(c => c._id)
        },{headers: authHeader()});

        console.log(res.data)

        dispatch({
            type: "EXHIBITOR_UPDATED_SUCCESS",
            payload: res.data
        })

    } catch (err) {
        console.log(err)
    }
};

export const deleteContact = (id) => async dispatch => {
    try {

        const res = await axios.delete(`${servURL}/contact/${id}`,{headers: authHeader()});

        dispatch({
            type: "CONTACT_DELETE_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        console.log(err)
    }
};

export const patchContact = (contact) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/contact/${contact._id}`, contact,{headers: authHeader()});

        dispatch({
            type: "CONTACT_UPDATED_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err)
    }
};