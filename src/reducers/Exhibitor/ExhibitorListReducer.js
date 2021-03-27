const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
    count: 0
};

const ExhibitorListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "EXHIBITOR_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "EXHIBITOR_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "EXHIBITOR_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        default:
            return state;
    }
}

export default ExhibitorListReducer;