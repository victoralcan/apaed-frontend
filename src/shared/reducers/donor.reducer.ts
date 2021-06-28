import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';
import { IDonor } from '../model/donor.model';

export const ACTION_TYPES = {
  GET_DONOR: 'donor/GET_DONOR',
  GET_DONORS: 'donor/GET_DONORS',
  CREATE_DONOR: 'donor/CREATE_DONOR',
  SET_DONOR_VIEW: 'donor/SET_DONOR_VIEW',
  RESET: 'donor/RESET',
};

const initialState = {
  loading: false,
  getDonorSuccess: false,
  getDonorError: false,
  getDonorsSuccess: false,
  getDonorsError: false,
  createDonorSuccess: false,
  createDonorError: false,
  donors: [] as Array<IDonor>,
  donor: {} as IDonor,
  toViewDonor: {} as IDonor,
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
    case REQUEST(ACTION_TYPES.CREATE_DONOR):
      return {
        ...state,
        loading: true,
        createDonorSuccess: false,
        createDonorError: false,
      };
    case FAILURE(ACTION_TYPES.GET_DONOR):
      return {
        ...state,
        loading: false,
        getDonorError: true,
        getDonorSuccess: false,
      };
    case FAILURE(ACTION_TYPES.GET_DONORS):
      return {
        ...state,
        loading: false,
        getDonorsError: true,
        getDonorsSuccess: false,
      };
    case FAILURE(ACTION_TYPES.CREATE_DONOR):
      return {
        ...state,
        loading: false,
        createDonorError: true,
        createDonorSuccess: false,
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
    case SUCCESS(ACTION_TYPES.CREATE_DONOR):
      return {
        ...state,
        loading: false,
        createDonorError: false,
        createDonorSuccess: true,
      };
    case ACTION_TYPES.SET_DONOR_VIEW:
      return {
        ...state,
        toViewDonor: action.payload,
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

export const createDonor = (donor: IDonor) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.CREATE_DONOR,
    payload: APIUrl.post('donors', donor),
  });
};

export const setToViewDonor = (donor: IDonor) => ({
  type: ACTION_TYPES.SET_DONOR_VIEW,
  payload: donor,
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
