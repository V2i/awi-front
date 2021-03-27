const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
    count: 0
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
            }
        default:
            return state;
    }
}

export default ReservationListReducer;