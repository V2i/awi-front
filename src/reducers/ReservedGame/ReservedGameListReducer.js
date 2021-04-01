const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const ReservedGameListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "RESERVED_GAME_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "RESERVED_GAME_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "RESERVED_GAME_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        case "RESERVED_GAME_ADD_SUCCESS":
                return {
                    ...state,
                    loading: false,
                    errorMsg: "",
                    data: [...state.data, action.payload]
                }
        case "RESERVED_GAME_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.filter(d => d._id !== action.payload._id)
            }
        case "RESERVED_GAME_UPDATED_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.map(da => {
                    da.reservationReservedGames = da.reservationReservedGames.map(d => {               
                        if(d._id === action.payload._id) {
                            d = action.payload;
                        }
                        return d;
                    })
                    return da
                })
            }
        default:
            return state;
    }
}

export default ReservedGameListReducer;