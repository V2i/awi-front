const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const TrackingListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "TRACKING_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "TRACKING_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "TRACKING_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        case "TRACKING_ADD_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: [...state.data, action.payload]
            }
        case "TRACKING_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.filter(d => d._id !== action.payload._id)
            }
        case "TRACKING_UPDATED_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.map(d => {
                    if(d._id === action.payload._id) {
                        d = action.payload;
                    }
                    return d;
                })
            }
        default:
            return state;
    }
}

export default TrackingListReducer;