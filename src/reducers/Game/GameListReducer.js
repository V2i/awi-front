const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
    count: 0
};

const GameListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "GAME_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "GAME_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "GAME_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        case "GAME_LIST_EDITOR_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "GAME_LIST_EDITOR_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "GAME_LIST_EDITOR_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        case "GAME_ADD_SUCCESS":
                return {
                    ...state,
                    loading: false,
                    errorMsg: "",
                    data: [...state.data, action.payload]
                }
        case "GAME_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.filter(d => d._id !== action.payload._id)
            }
        default:
            return state;
    }
}

export default GameListReducer;