const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
    count: 0
};

const EditorListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "EDITOR_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "EDITOR_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "EDITOR_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        case "EDITOR_ADD_SUCCESS":
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

export default EditorListReducer;