import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';
import { IProductLocalDonation, IProductLocalDonationGet } from '../model/productLocalDonation.model';
import { ITransferPostPut } from '../model/transfer.model';

export const ACTION_TYPES = {
  MAKE_TRANSFER: 'transfer/MAKE_TRANSFER',
  SET_TRANSFER_PRODUCT: 'transfer/SET_TRANSFER_PRODUCT',
  RESET_SUCCESS: 'transfer/RESET_REGISTER',
  RESET: 'transfer/RESET',
};

const initialState = {
  loading: false,
  makeTransferSuccess: false,
  makeTransferError: false,
  toTransferProduct: {} as IProductLocalDonationGet,
  amount: 0,
};

export type TransferState = Readonly<typeof initialState>;

// Reducer

export default (state: TransferState = initialState, action): TransferState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.MAKE_TRANSFER):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.MAKE_TRANSFER):
      return {
        ...initialState,
        loading: false,
        makeTransferError: true,
        makeTransferSuccess: false,
      };
    case SUCCESS(ACTION_TYPES.MAKE_TRANSFER):
      return {
        ...state,
        loading: false,
        makeTransferError: false,
        makeTransferSuccess: true,
      };
    case ACTION_TYPES.SET_TRANSFER_PRODUCT:
      return {
        ...state,
        toTransferProduct: action.payload,
        amount: action.amount,
      };
    case ACTION_TYPES.RESET_SUCCESS:
      return {
        ...state,
        makeTransferError: false,
        makeTransferSuccess: false,
        toTransferProduct: {},
        amount: 0,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const makeTransfer = (transfer: ITransferPostPut) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.MAKE_TRANSFER,
    payload: APIUrl.post('transfer', transfer),
  });
};

export const setToTransferProduct = (product: IProductLocalDonation, amount: number) => async (dispatch) => {
  const { data: fetchedProduct } = await APIUrl.get(`stock/${product.id}`);
  await dispatch({
    type: ACTION_TYPES.SET_TRANSFER_PRODUCT,
    payload: fetchedProduct,
    amount,
  });
};

export const resetSuccessTransfer = () => ({
  type: ACTION_TYPES.RESET_SUCCESS,
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
