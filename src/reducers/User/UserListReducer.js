const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const UserListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "USER_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "USER_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "USER_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        case "USER_ADD_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: [...state.data, action.payload]
            }
        case "USER_DELETE_SUCCESS":
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

export default UserListReducer;