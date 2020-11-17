const initialState = {
    loggedIn: false
};

const stateReducer = (state = initialState, action) => {
    const currentState = { ...state };
    switch (action.type) {
        case 'ON_LOGIN':
            return Object.assign(currentState, { 
                ...currentState,
                loggedIn: true
            });
        case 'ON_LOGOUT':
            return Object.assign(currentState, { 
                ...currentState,
                loggedIn: false
            });
        default:
            return currentState; 
    }
  }

  export default stateReducer;