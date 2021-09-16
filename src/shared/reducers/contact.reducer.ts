import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';
import { IContact } from '../model/contact.model';
import { IDonor } from '../model/donor.model';
import { createDonor } from './donor.reducer';
import { ILocal } from '../model/local.model';
import { createLocal } from './local.reducer';

export const ACTION_TYPES = {
  CREATE_CONTACT: 'contact/CREATE_CONTACT',
  GET_CONTACT: 'contact/GET_CONTACT',
  RESET: 'contact/RESET',
};

const initialState = {
  loading: false,
  createContactSuccess: false,
  createContactError: false,
  contact: {} as IContact,
  toViewContact: {} as IContact,
};

export type ContactState = Readonly<typeof initialState>;

// Reducer

export default (state: ContactState = initialState, action): ContactState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.CREATE_CONTACT):
      return {
        ...state,
        loading: true,
        createContactError: false,
        createContactSuccess: false,
      };
    case FAILURE(ACTION_TYPES.CREATE_CONTACT):
      return {
        ...state,
        loading: false,
        createContactError: true,
        createContactSuccess: false,
      };
    case SUCCESS(ACTION_TYPES.GET_CONTACT):
      return {
        ...state,
        loading: false,
        toViewContact: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTACT):
      return {
        ...state,
        loading: false,
        createContactError: false,
        createContactSuccess: true,
        contact: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const createContactForFornecedor = (contact: IContact, donor: IDonor) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTACT,
    payload: APIUrl.post('contacts', contact),
  });

  dispatch(createDonor({ ...donor, contact_id: result.value.data.id, active: true }));
};

export const createContactForLocal = (contact: IContact, local: ILocal) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTACT,
    payload: APIUrl.post('contacts', contact),
  });

  dispatch(createLocal({ ...local, contact_id: result.value.data.id, active: true }));
};

export const getContactById = (contactId: string) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_CONTACT,
    payload: APIUrl.get(`contacts/${contactId}`),
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
