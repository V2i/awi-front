const DefaultState = {
    loading: false,
    data: {},
    errorMsg: "",
};

const ReservationReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "RESERVATION_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "RESERVATION_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: action.payload
            };
        case "RESERVATION_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err
            }
        default:
            return state;
    }
}

export default ReservationReducer;