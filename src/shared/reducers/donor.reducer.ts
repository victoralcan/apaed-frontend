import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';
import { IDonor } from '../model/donor.model';

export const ACTION_TYPES = {
  GET_DONOR: 'donor/GET_DONOR',
  GET_DONORS: 'donor/GET_DONORS',
  RESET: 'donor/RESET',
};

const initialState = {
  loading: false,
  getDonorSuccess: false,
  getDonorError: false,
  getDonorsSuccess: false,
  getDonorsError: false,
  donors: [] as Array<IDonor>,
  donor: {} as IDonor,
};

export type DonorState = Readonly<typeof initialState>;

// Reducer

export default (state: DonorState = initialState, action): DonorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_DONOR):
      return {
        ...state,
        loading: true,
        getDonorError: false,
        getDonorSuccess: false,
      };
    case REQUEST(ACTION_TYPES.GET_DONORS):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_DONOR):
      return {
        ...initialState,
        loading: false,
        getDonorError: true,
        getDonorSuccess: false,
      };
    case FAILURE(ACTION_TYPES.GET_DONORS):
      return {
        ...initialState,
        loading: false,
        getDonorsError: true,
        getDonorsSuccess: false,
      };
    case SUCCESS(ACTION_TYPES.GET_DONOR):
      return {
        ...state,
        loading: false,
        getDonorError: false,
        getDonorSuccess: true,
        donor: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.GET_DONORS):
      return {
        ...state,
        loading: false,
        getDonorsError: false,
        getDonorsSuccess: true,
        donors: [...action.payload.data],
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const getDonors = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_DONORS,
    payload: APIUrl.get('donors'),
  });
};

export const getDonorByDocument = (document: string) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_DONOR,
    payload: APIUrl.get(`donors/${document}`),
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
