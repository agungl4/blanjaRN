const authReducer = (prevState = {
    isLogin: false,
    email: '',
    name:''
}, action) => {
    switch (action.type) {
        case "LOGIN_TRUE":
            return {
                ...prevState,
                isLogin: true,
            };
        case "LOGIN_FALSE":
            return {
                ...prevState,
                isLogin: false,
            };
        case "SET_EMAIL_TRUE":
            return {
                ...prevState,
                email: action.data
            };
        case "SET_EMAIL_FALSE":
            return {
                ...prevState,
                email: ''
            }
            case "SET_NAME_TRUE":
                return {
                    ...prevState,
                name: action.data
                }
        default:
            return {
                ...prevState,
            };
    }
}

export default authReducer;