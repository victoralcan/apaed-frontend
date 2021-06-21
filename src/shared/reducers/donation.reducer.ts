import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';

export const ACTION_TYPES = {
  NEW_DONATION: 'DONATION/NEW_DONATION',
};

const initialState = {
  loading: false,
  NewDonationCreateSuccess: false,
  NewDonationCreateError: false,
};

export type DonationState = Readonly<typeof initialState>;

// Reducer

export default (state: DonationState = initialState, action): DonationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.NEW_DONATION):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.NEW_DONATION):
      return {
        ...initialState,
        loading: false,
        NewDonationCreateError: true,
        NewDonationCreateSuccess: false,
      };
    case SUCCESS(ACTION_TYPES.NEW_DONATION):
      return {
        ...state,
        loading: false,
        NewDonationCreateError: false,
        NewDonationCreateSuccess: true,
      };
    default:
      return state;
  }
};

export const createNewDonation = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.NEW_DONATION,
    payload: APIUrl.post('stock'),
  });
};
