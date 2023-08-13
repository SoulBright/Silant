const initialState = {
  isAuthenticated: localStorage.getItem('authToken') ? true : false,
  token: localStorage.getItem('authToken') || null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('authToken', action.payload);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('authToken');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
}

export const login = (token) => {
  return {
    type: 'LOGIN',
    payload: token,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};