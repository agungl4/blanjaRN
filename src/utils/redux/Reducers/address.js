const addressReducer = (prevState = {
    selectedAddress:null
}, action) => {
    switch (action.type) {
        case "SET_ADDRESS":
            return {
                ...prevState,
                selectedAddress: action.data
            }
        default:
            return {
                ...prevState,
            };
    }
}

export default addressReducer;