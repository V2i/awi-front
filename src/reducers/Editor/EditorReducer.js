const DefaultState = {
    loading: false,
    data: {},
    errorMsg: "",
};

const EditorReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "EDITOR_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "EDITOR_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: action.payload
            };
        case "EDITOR_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err
            }
        case "EDITOR_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.filter(d => d._id !== action.payload._id)
            }
        case "EDITOR_UPDATED_SUCCESS":
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

export default EditorReducer;