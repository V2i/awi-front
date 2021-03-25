const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
    count: 0
};

const FestivalListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "FESTIVAL_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "FESTIVAL_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "FESTIVAL_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            };
        case "FESTIVAL_ADD_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: [...state.data, action.payload]
            }
        case "FESTIVAL_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.filter(d => d._id !== action.payload._id)
            }
        default:
            return state;
    }
}

export default FestivalListReducer;