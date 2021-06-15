import axios from 'axios';

import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  GET_SESSION: 'authentication/GET_SESSION',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
};

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  account: {} as any,
  sessionHasBeenFetched: false,
  idToken: null as string,
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
    case REQUEST(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...initialState,
        loginError: true,
      };
    case FAILURE(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        loginError: false,
        loginSuccess: true,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
      };
    case SUCCESS(ACTION_TYPES.GET_SESSION): {
      const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        account: action.payload.data,
      };
    }
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const getSession = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_SESSION,
    payload: axios.get('api/account'),
  });
};

export const login = (username, password, rememberMe = false) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: axios.post('api/authenticate', { username, password, rememberMe }),
  });
  const bearerToken = result.value.headers.authorization;
  if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
    const jwt = bearerToken.slice(7, bearerToken.length);
    APIUrl.defaults.headers.common.Authorization = bearerToken;
    if (rememberMe) {
      localStorage.setItem('jwt_access_token', jwt);
    } else {
      sessionStorage.setItem('jwt_access_token', jwt);
    }
  }
  await dispatch(getSession());
};

export const clearAuthToken = () => {
  sessionStorage.removeItem('jwt_access_token');
  localStorage.removeItem('jwt_access_token');
  delete APIUrl.defaults.headers.common.Authorization;
};

export const logout = () => (dispatch) => {
  clearAuthToken();
  dispatch({
    type: ACTION_TYPES.LOGOUT,
  });
};

export const clearAuthentication = () => (dispatch) => {
  clearAuthToken();
  dispatch({
    type: ACTION_TYPES.CLEAR_AUTH,
  });
};
