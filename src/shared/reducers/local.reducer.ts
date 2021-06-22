import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';
import { ILocal } from '../model/local.model';

export const ACTION_TYPES = {
  GET_LOCALS: 'locals/GET_LOCALS',
  RESET_SUCCESS: 'locals/RESET_REGISTER',
  RESET: 'locals/RESET',
};

const initialState = {
  loading: false,
  getLocalsSuccess: false,
  getLocalsError: false,
  locals: [] as Array<ILocal>,
};

export type LocalState = Readonly<typeof initialState>;

// Reducer

export default (state: LocalState = initialState, action): LocalState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_LOCALS):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_LOCALS):
      return {
        ...initialState,
        loading: false,
        getLocalsError: true,
        getLocalsSuccess: false,
      };
    case SUCCESS(ACTION_TYPES.GET_LOCALS):
      return {
        ...state,
        loading: false,
        getLocalsError: false,
        getLocalsSuccess: true,
        locals: [...action.payload.data],
      };
    case ACTION_TYPES.RESET_SUCCESS:
      return {
        ...state,
        getLocalsError: false,
        getLocalsSuccess: false,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const getLocals = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_LOCALS,
    payload: APIUrl.get('locals'),
  });
};

export const resetSuccessGetLocals = () => ({
  type: ACTION_TYPES.RESET_SUCCESS,
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
