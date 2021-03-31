const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const ReservationListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "RESERVATION_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "RESERVATION_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "RESERVATION_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            };
        case "RESERVATION_ADD_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: [...state.data, action.payload]
            };
        case "RESERVATION_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.filter(d => d._id !== action.payload._id)
            };
        default:
            return state;
    }
}

export default ReservationListReducer;