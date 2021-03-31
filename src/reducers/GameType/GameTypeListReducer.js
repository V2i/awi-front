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
        case "GAME_TYPE_ADD_SUCCESS":
                return {
                    ...state,
                    loading: false,
                    errorMsg: "",
                    data: [...state.data, action.payload]
                }
        case "GAME_TYPE_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.filter(d => d._id !== action.payload._id)
            }
        case "GAME_TYPE_UPDATED_SUCCESS":
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

export default GameListReducer;