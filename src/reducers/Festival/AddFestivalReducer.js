const DefaultState = {
    loading: false,
    data: {},
    errorMsg: "",
};

const AddFestivalReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "FESTIVAL_POST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "FESTIVAL_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: action.payload
            };
        case "FESTIVAL_POST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err
            }
        default:
            return state;
    }
}

export default AddFestivalReducer;