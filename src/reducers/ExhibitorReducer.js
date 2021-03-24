const DefaultState = {
    loading: false,
    data: {},
    errorMsg: "",
};

const ExhibitorReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "EXHIBITOR_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "EXHIBITOR_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: action.payload
            };
        case "EXHIBITOR_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err
            }
        default:
            return state;
    }
}

export default ExhibitorReducer;