const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const ZoneListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "ZONE_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "ZONE_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "ZONE_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        case "ZONE_ADD_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: [...state.data, action.payload]
            }
        default:
            return state;
    }
}

export default ZoneListReducer;