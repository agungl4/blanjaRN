export const setLogintrue = () => {
    return {
        type: "LOGIN_TRUE",

    }
}

export const setLoginfalse = () => {
    return {
        type: "LOGIN_FALSE",
    }
}
export const setEmail = (data) => {
    return {
        type: "SET_EMAIL_TRUE",
        data
    }
}

export const removeEmail = () => {
    return {
        type : "SET_EMAIL_FALSE",
    }
}

export const setName = (data) => {
    return {
        type: "SET_NAME_TRUE",
        data
    }
}