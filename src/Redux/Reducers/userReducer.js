import types from "../types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Register User
    case types.USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.USER_REGISTER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case types.USER_REGISTER_FAILURE:
      return { ...state, loading: false };

    //Login User
    case types.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        token: action.payload.token,
      };
    case types.USER_LOGIN_FAILURE:
      return { ...state, loading: false };

    // Forget User Password Token
    case types.USER_FORGET_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case types.USER_FORGET_PASSWORD_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case types.USER_FORGET_PASSWORD_FAILURE:
      return { ...state, loading: false };

    // USer Update password
    case types.USER_UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.USER_UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
