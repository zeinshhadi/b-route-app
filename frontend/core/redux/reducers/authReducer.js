const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
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
  }
};

export default authReducer;
