const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
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
        case "EXHIBITOR_ADD_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: [...state.data, action.payload]
            }
        case "EXHIBITOR_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.filter(d => d._id !== action.payload._id)
            }
        case "EXHIBITOR_UPDATED_SUCCESS":
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

export default ExhibitorListReducer;