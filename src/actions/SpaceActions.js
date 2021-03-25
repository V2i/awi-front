import axios from "axios";

export const postSpace = (space) => async dispatch => {
    try {

        const res = await axios.post(`https://awi-api.herokuapp.com/space`, space);

        dispatch({
            type: "FESTIVAL_UPDATED_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        // dispatch({
        //     type: "FESTIVAL_POST_FAIL",
        //     err: err,
        // });
    }
};

export const deleteSpace = (id) => async dispatch => {
    try {

        const res = await axios.delete(`https://awi-api.herokuapp.com/space/${id}`);

        dispatch({
            type: "FESTIVAL_DELETE_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "FESTIVAL_FAIL",
        //     err: err,
        // });
    }
};

export const patchSpace = (space) => async dispatch => {
    try {

        const res = await axios.patch(`https://awi-api.herokuapp.com/space/${space._id}`, space);

        dispatch({
            type: "FESTIVAL_UPDATED_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "FESTIVAL_FAIL",
        //     err: err,
        // });
    }
};