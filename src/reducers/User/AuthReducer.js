
const user = JSON.parse(localStorage.getItem("user"));

const DefaultState = user
    ? {isLoggedIn: true, user}
    : {isLoggedIn: false, user: null}

const UserListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            };
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}

export default UserListReducer;