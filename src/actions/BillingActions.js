import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const getBillingList = () => async dispatch => {
    try {

        dispatch({
            type: "BILLING_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/billing/list`,{headers: authHeader()});

        dispatch({
            type: "BILLING_LIST_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "BILLING_LIST_FAIL",
            err: err
        });
    }
};

export const getBillingById = (id) => async dispatch => {
    try {

        dispatch({
            type: "BILLING_LOADING",
        });

        const res = await axios.get(`${servURL}/billing/${id}`,{headers: authHeader()});

        dispatch({
            type: "BILLING_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "BILLING_FAIL",
            err: err
        });
    }
};
export const getBillingListByFestival = (idFestival) => async dispatch => {
    try {

        dispatch({
            type: "BILLING_LIST_LOADING",
        });

        const res = await axios.get(`${servURL}/billing/list/festival/${idFestival}`,{headers: authHeader()});
        
        dispatch({
            type: "BILLING_LIST_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "BILLING_LIST_FAIL",
            err: err
        });
    }
};


export const patchBilling = (billing) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/billing/${billing._id}`, billing,{headers: authHeader()});
        console.log(res.data)
        dispatch({
            type: "BILLING_UPDATED_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err)
    }
};