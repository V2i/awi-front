import axios from "axios";
import servURL from "../servUrl";

export const postSpace = (space, festival) => async dispatch => {
    try {

        const newSpace = await axios.post(`${servURL}/space`, space);

        festival.festivalSpace.push(newSpace.data);

        const res = await axios.patch(`${servURL}/festival/${festival._id}`, festival);

        dispatch({
            type: "FESTIVAL_UPDATED_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        // dispatch({
        //     type: "FESTIVAL_POST_FAIL",
        //     err: err,
        // });
        console.log(err);
    }
};

export const deleteSpace = (id, festival) => async dispatch => {
    try {

        const deletedSpace = await axios.delete(`${servURL}/space/${id}`);

        festival.festivalSpace = festival.festivalSpace.filter(s => s._id !== deletedSpace.data._id);

        const res = await axios.patch(`${servURL}/festival/${festival._id}`, festival);

        dispatch({
            type: "FESTIVAL_UPDATED_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: "FESTIVAL_FAIL",
        //     err: err,
        // });
        console.log(err);
    }
};

export const patchSpace = (space) => async dispatch => {
    try {

        const res = await axios.patch(`${servURL}/space/${space._id}`, space);

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