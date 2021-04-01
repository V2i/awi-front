const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const ReservedSpacelListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "RESERVED_SPACE_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "RESERVED_SPACE_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "RESERVED_SPACE_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            };
        case "RESERVED_SPACE_ADD_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: [...state.data, action.payload]
            }
        case "RESERVED_SPACE_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.filter(d => d._id !== action.payload._id)
            }
        case "RESERVED_SPACE_UPDATED_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.map(da => {
                    da.reservationReservedSpace = da.reservationReservedSpace.map(d => {
                        if(d._id === action.payload._id) {
                            d = action.payload;
                        }
                        return d;
                    })
                    return da
                })
            }
        default:
            return state;
    }
}

export default ReservedSpacelListReducer;