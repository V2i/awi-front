const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const GameListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "GAME_TYPE_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "GAME_TYPE_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "GAME_TYPE_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        default:
            return state;
    }
}

export default GameListReducer;