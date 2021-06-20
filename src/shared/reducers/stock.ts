import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';
import { IProductLocalDonation } from '../model/productLocalDonation.model';

export const ACTION_TYPES = {
  GET_STOCK: 'estoque/GET_STOCK',
};

const initialState = {
  loading: false,
  getStockSuccess: false,
  getStockError: false,
  stock: [] as Array<IProductLocalDonation>,
};

export type StockState = Readonly<typeof initialState>;

// Reducer

export default (state: StockState = initialState, action): StockState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_STOCK):
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
    case SUCCESS(ACTION_TYPES.GET_STOCK):
      return {
        ...state,
        loading: false,
        getStockError: false,
        getStockSuccess: true,
        stock: [...action.payload.data],
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
