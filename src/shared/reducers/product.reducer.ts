import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';
import { IProduct } from '../model/product.model';

export const ACTION_TYPES = {
  GET_PRODUCTS: 'product/GET_PRODUCTS',
  GET_PRODUCT: 'product/GET_PRODUCT',
  RESET: 'product/RESET',
};

const initialState = {
  loading: false,
  getProductSuccess: false,
  getProductError: false,
  getProductsSuccess: false,
  getProductsError: false,
  products: [] as Array<IProduct>,
  product: {} as IProduct,
};

export type ProductState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductState = initialState, action): ProductState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_PRODUCT):
      return {
        ...state,
        loading: true,
        getProductError: false,
        getProductSuccess: false,
      };
    case REQUEST(ACTION_TYPES.GET_PRODUCTS):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_PRODUCT):
      return {
        ...initialState,
        loading: false,
        getProductError: true,
        getProductSuccess: false,
      };
    case FAILURE(ACTION_TYPES.GET_PRODUCTS):
      return {
        ...initialState,
        loading: false,
        getProductsError: true,
        getProductsSuccess: false,
      };
    case SUCCESS(ACTION_TYPES.GET_PRODUCT):
      return {
        ...state,
        loading: false,
        getProductError: false,
        getProductSuccess: true,
        product: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.GET_PRODUCTS):
      return {
        ...state,
        loading: false,
        getProductsError: false,
        getProductsSuccess: true,
        products: [...action.payload.data],
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const getProductsByNCM = (ncmId: number) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_PRODUCTS,
    payload: APIUrl.get(`products/${ncmId}`),
  });
};

export const getProductById = (id: string) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_PRODUCT,
    payload: APIUrl.get(`products/${id}`),
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
