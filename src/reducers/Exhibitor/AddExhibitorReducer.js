const DefaultState = {
    loading: false,
    data: {},
    errorMsg: "",
};

const AddExhibitorReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "EXHIBITOR_POST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "EXHIBITOR_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: action.payload
            };
        case "EXHIBITOR_POST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err
            }
        default:
            return state;
    }
}

export default AddExhibitorReducer;