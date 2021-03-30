const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const EditorListFestivalReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "EDITOR_LIST_FESTIVAL_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "EDITOR_LIST_FESTIVAL_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "EDITOR_LIST_FESTIVAL_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        default:
            return state;
    }
}

export default EditorListFestivalReducer;