import { combineReducers } from 'redux';
import authentication, { AuthenticationState } from './authentication';
import stock, { StockState } from './stock.reducer';
import donor, { DonorState } from './donor.reducer';
import category, { CategoryState } from './category.reducer';
import product, { ProductState } from './product.reducer';
import donation, { DonationState } from './donation.reducer';
import transfer, { TransferState } from './transfer.reducer';
import local, { LocalState } from './local.reducer';
import type, { TypeState } from './type.reducer';
import unityMeasurement, { UnityMeasurementState } from './unityMeasurement.reducer';
import contact, { ContactState } from './contact.reducer';
import foodStamp, { FoodStampState } from './food-stamp.reducer';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly stock: StockState;
  readonly donor: DonorState;
  readonly category: CategoryState;
  readonly product: ProductState;
  readonly donation: DonationState;
  readonly transfer: TransferState;
  readonly local: LocalState;
  readonly type: TypeState;
  readonly unityMeasurement: UnityMeasurementState;
  readonly contact: ContactState;
  readonly foodStamp: FoodStampState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  stock,
  donor,
  category,
  product,
  donation,
  transfer,
  local,
  type,
  unityMeasurement,
  contact,
  foodStamp,
});

export default rootReducer;
