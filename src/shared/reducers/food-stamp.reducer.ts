import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';
import { IFoodStamp } from 'shared/model/foodStamp.model';

export const ACTION_TYPES = {
  GET_FOOD_STAMPS: 'foodStamps/GET_FOOD_STAMPS',
  SET_FOOD_STAMP_VIEW: 'foodStamps/SET_FOOD_STAMP_VIEW',
  CREATE_FOOD_STAMP: 'foodStamps/CREATE_FOOD_STAMP',
  UPDATE_FOOD_STAMP: 'foodStamps/UPDATE_FOOD_STAMP',
  RESET_SUCCESS: 'foodStamps/RESET_REGISTER',
  RESET: 'foodStamps/RESET',
  DELETE_FOOD_STAMP: 'foodStamps/DELETE',
};

const initialState = {
  loading: false,
  getFoodStampsSuccess: false,
  getFoodStampsError: false,
  createFoodStampSuccess: false,
  createFoodStampError: false,
  updateFoodStampSuccess: false,
  updateFoodStampError: false,
  deleteFoodStampSuccess: false,
  deleteFoodStampError: false,
  foodStamps: [] as Array<IFoodStamp>,
  toViewFoodStamps: {} as IFoodStamp,
  totalCount: 0,
};

export type FoodStampState = Readonly<typeof initialState>;

// Reducer
export default (state: FoodStampState = initialState, action): FoodStampState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_FOOD_STAMPS):
    case REQUEST(ACTION_TYPES.CREATE_FOOD_STAMP):
      return {
        ...state,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.UPDATE_FOOD_STAMP):
      return {
        ...state,
        loading: true,
        updateFoodStampError: false,
        updateFoodStampSuccess: false,
      };
    case FAILURE(ACTION_TYPES.GET_FOOD_STAMPS):
      return {
        ...initialState,
        loading: false,
        getFoodStampsError: true,
        getFoodStampsSuccess: false,
      };
    case FAILURE(ACTION_TYPES.CREATE_FOOD_STAMP):
      return {
        ...initialState,
        loading: false,
        createFoodStampError: true,
        createFoodStampSuccess: false,
      };
    case FAILURE(ACTION_TYPES.UPDATE_FOOD_STAMP):
      return {
        ...initialState,
        loading: false,
        updateFoodStampError: true,
        updateFoodStampSuccess: false,
      };
    case FAILURE(ACTION_TYPES.DELETE_FOOD_STAMP):
      return {
        ...initialState,
        loading: false,
        deleteFoodStampError: true,
        deleteFoodStampSuccess: false,
      };
    case SUCCESS(ACTION_TYPES.GET_FOOD_STAMPS):
      return {
        ...state,
        loading: false,
        getFoodStampsError: false,
        getFoodStampsSuccess: true,
        foodStamps: [...action.payload.data[0]],
        totalCount: action.payload.data[1],
      };
    case SUCCESS(ACTION_TYPES.CREATE_FOOD_STAMP):
      return {
        ...state,
        loading: false,
        createFoodStampError: false,
        createFoodStampSuccess: true,
      };
    case SUCCESS(ACTION_TYPES.UPDATE_FOOD_STAMP):
      return {
        ...state,
        loading: false,
        updateFoodStampError: false,
        updateFoodStampSuccess: true,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FOOD_STAMP):
      return {
        ...state,
        loading: false,
        deleteFoodStampError: false,
        deleteFoodStampSuccess: true,
      };
    case ACTION_TYPES.RESET_SUCCESS:
      return {
        ...state,
        getFoodStampsError: false,
        getFoodStampsSuccess: false,
      };
    case ACTION_TYPES.SET_FOOD_STAMP_VIEW:
      return {
        ...state,
        toViewFoodStamps: action.payload,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const getFoodStamps = (skip: number, take: number) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_FOOD_STAMPS,
    payload: APIUrl.get(`foodStamp?skip=${skip}&take=${take}`),
  });
};

export const createFoodStamp = (foodStamp: IFoodStamp) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.CREATE_FOOD_STAMP,
    payload: APIUrl.post('foodStamp', foodStamp),
  });
};

export const updateFoodStamp = (foodStamp: IFoodStamp) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.UPDATE_FOOD_STAMP,
    payload: APIUrl.put('foodStamp', foodStamp),
  });
};

export const deleteFoodStamp = (foodStamp_id: string) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.DELETE_FOOD_STAMP,
    payload: APIUrl.delete(`foodStamp/${foodStamp_id}`),
  });
  dispatch(getFoodStamps(0, 10));
};

export const setToViewFoodStamp = (foodStamp: IFoodStamp) => ({
  type: ACTION_TYPES.SET_FOOD_STAMP_VIEW,
  payload: foodStamp,
});

export const resetSuccessGetfoodStamp = () => ({
  type: ACTION_TYPES.RESET_SUCCESS,
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
