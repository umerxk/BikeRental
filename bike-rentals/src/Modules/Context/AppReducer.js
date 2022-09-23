const AppReducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'SET_ACTION':
            return {
                ...state,
                sideBarAction: action.payload
            }
        default:
            return state
    }
}

export default AppReducer;
