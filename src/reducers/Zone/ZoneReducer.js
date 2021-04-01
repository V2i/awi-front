const DefaultState = {
    loading: false,
    data: {},
    errorMsg: "",
};

const ZoneReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "ZONE_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "ZONE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: action.payload
            };
        case "ZONE_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err
            }
        case "ZONE_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.filter(d => d._id !== action.payload._id)
            }
        case "ZONE_UPDATED_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: action.payload
            }
        default:
            return state;
    }
}

export default ZoneReducer;