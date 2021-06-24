import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';
import { ICategory } from '../model/category.model';

export const ACTION_TYPES = {
  GET_CATEGORIES: 'category/GET_CATEGORIES',
  GET_CATEGORY: 'category/GET_CATEGORY',
  CREATE_CATEGORY: 'category/CREATE_CATEGORY',
  RESET: 'category/RESET',
};

const initialState = {
  loading: false,
  getCategorySuccess: false,
  getCategoryError: false,
  getCategoriesSuccess: false,
  getCategoriesError: false,
  createCategorySuccess: false,
  createCategoryError: false,
  categories: [] as Array<ICategory>,
  category: {} as ICategory,
};

export type CategoryState = Readonly<typeof initialState>;

// Reducer

export default (state: CategoryState = initialState, action): CategoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_CATEGORY):
      return {
        ...state,
        loading: true,
        getCategoryError: false,
        getCategorySuccess: false,
      };
    case REQUEST(ACTION_TYPES.GET_CATEGORIES):
      return {
        ...state,
        loading: true,
        getCategoriesSuccess: false,
        getCategoriesError: false,
      };
    case REQUEST(ACTION_TYPES.CREATE_CATEGORY):
      return {
        ...state,
        loading: true,
        createCategoryError: false,
        createCategorySuccess: false,
      };
    case FAILURE(ACTION_TYPES.GET_CATEGORY):
      return {
        ...initialState,
        loading: false,
        getCategoryError: true,
        getCategorySuccess: false,
      };
    case FAILURE(ACTION_TYPES.GET_CATEGORIES):
      return {
        ...initialState,
        loading: false,
        getCategoriesError: true,
        getCategoriesSuccess: false,
      };
    case FAILURE(ACTION_TYPES.CREATE_CATEGORY):
      return {
        ...initialState,
        loading: false,
        createCategoryError: true,
        createCategorySuccess: false,
      };
    case SUCCESS(ACTION_TYPES.GET_CATEGORY):
      return {
        ...state,
        loading: false,
        getCategoryError: false,
        getCategorySuccess: true,
        category: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.GET_CATEGORIES):
      return {
        ...state,
        loading: false,
        getCategoriesError: false,
        getCategoriesSuccess: true,
        categories: [...action.payload.data],
      };
    case SUCCESS(ACTION_TYPES.CREATE_CATEGORY):
      return {
        ...state,
        loading: false,
        createCategoryError: false,
        createCategorySuccess: true,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const getCategories = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_CATEGORIES,
    payload: APIUrl.get('ncm'),
  });
};

export const createCategory = (category: ICategory) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.CREATE_CATEGORY,
    payload: APIUrl.post('ncm', category),
  });
};

export const getCategoryById = (id: string) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_CATEGORY,
    payload: APIUrl.get(`ncm/${id}`),
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
