import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';
import { IProductLocalDonation } from '../model/productLocalDonation.model';

export const ACTION_TYPES = {
  GET_STOCK: 'stock/GET_STOCK',
  EDIT_PRODUCT: 'stock/EDIT_PRODUCT',
  REGISTER_NEW_PRODUCT_TO_STOCK: 'stock/REGISTER_NEW_PRODUCT_TO_STOCK',
  RESET_REGISTER: 'stock/RESET_REGISTER',
  RESET: 'stock/RESET',
};

const initialState = {
  loading: false,
  getStockSuccess: false,
  getStockError: false,
  registerNewProductToStockSuccess: false,
  registerNewProductToStockError: false,
  stock: [] as Array<IProductLocalDonation>,
  toEditProduct: {} as IProductLocalDonation,
};

export type StockState = Readonly<typeof initialState>;

// Reducer

export default (state: StockState = initialState, action): StockState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_STOCK):
    case REQUEST(ACTION_TYPES.REGISTER_NEW_PRODUCT_TO_STOCK):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_STOCK):
      return {
        ...initialState,
        loading: false,
        getStockError: true,
        getStockSuccess: false,
      };
    case FAILURE(ACTION_TYPES.REGISTER_NEW_PRODUCT_TO_STOCK):
      return {
        ...initialState,
        loading: false,
        registerNewProductToStockError: true,
        registerNewProductToStockSuccess: false,
      };
    case SUCCESS(ACTION_TYPES.REGISTER_NEW_PRODUCT_TO_STOCK):
      return {
        ...state,
        loading: false,
        registerNewProductToStockError: false,
        registerNewProductToStockSuccess: true,
      };
    case SUCCESS(ACTION_TYPES.GET_STOCK):
      return {
        ...state,
        loading: false,
        getStockError: false,
        getStockSuccess: true,
        stock: [...action.payload.data],
      };
    case ACTION_TYPES.EDIT_PRODUCT:
      return {
        ...state,
        toEditProduct: action.payload,
      };
    case ACTION_TYPES.RESET_REGISTER:
      return {
        ...state,
        registerNewProductToStockSuccess: false,
        registerNewProductToStockError: false,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const getStock = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_STOCK,
    payload: APIUrl.get('stock'),
  });
};

export const registerNewProductToStock = (product: IProductLocalDonation) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.REGISTER_NEW_PRODUCT_TO_STOCK,
    payload: APIUrl.post('stock', product),
  });
};

export const setProductToEdit = (product: IProductLocalDonation) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.EDIT_PRODUCT,
    payload: product,
  });
};

export const resetSuccessRegister = () => ({
  type: ACTION_TYPES.RESET_REGISTER,
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
