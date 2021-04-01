const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const ContactListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "CONTACT_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "CONTACT_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "CONTACT_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            }
        case "CONTACT_ADD_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: [...state.data, action.payload]
            }
        case "CONTACT_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: state.data.filter(d => d._id !== action.payload._id)
            }
        case "CONTACT_UPDATED_SUCCESS":
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
};

export default ContactListReducer;