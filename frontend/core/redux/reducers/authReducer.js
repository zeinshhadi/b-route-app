const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LogIn Success":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case "LogIn Failed":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default authReducer;
