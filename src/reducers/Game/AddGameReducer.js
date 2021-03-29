const DefaultState = {
    loading: false,
    data: {},
    errorMsg: "",
};

const AddGameReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "GAME_POST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "GAME_POST_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: action.payload
            };
        case "GAME_POST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err
            }
        default:
            return state;
    }
}

export default AddGameReducer;