const DefaultState = {
    loading: false,
    data: {},
    errorMsg: "",
};

const GameReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "GAME_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "GAME_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: action.payload
            };
        case "GAME_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err
            }
        default:
            return state;
    }
}

export default GameReducer;