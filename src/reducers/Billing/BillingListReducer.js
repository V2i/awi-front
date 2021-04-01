const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const BillingListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "BILLING_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "BILLING_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "BILLING_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        case "BILLING_ADD_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: [...state.data, action.payload]
            }
        case "BILLING_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.filter(d => d._id !== action.payload._id)
            }
        case "BILLING_UPDATED_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.map(d => {
                    if( d.reservationBilling._id === action.payload._id) {
                        d = action.payload;
                    }
                    return d;
                })
            }
        default:
            return state;
    }
};

export default BillingListReducer;