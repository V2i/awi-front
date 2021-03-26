const DefaultState = {
    loading: false,
    data: {},
    errorMsg: "",
};

const EditorReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "EDITOR_POST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "EDITOR_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: action.payload
            };
        case "EDITOR_POST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err
            }
        default:
            return state;
    }
}

export default EditorReducer;