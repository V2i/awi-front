const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
    count: 0
};

const FestivalListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "FESTIVAL_LIST_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "FESTIVAL_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action._payload,
            };
        case "FESTIVAL_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: "lol",
            }
        default:
            return state;
    }
}

export default FestivalListReducer;