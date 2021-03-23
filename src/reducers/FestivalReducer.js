const DefaultState = {
    loading: false,
    data: {},
    errorMsg: "",
};

const FestivalReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "FESTIVAL_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "FESTIVAL_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "FESTIVAL_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        default:
            return state;
    }
}

export default FestivalReducer;