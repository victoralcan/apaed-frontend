import { combineReducers } from 'redux';
import authentication, { AuthenticationState } from './authentication';
import stock, { StockState } from './stock.reducer';
import donor, { DonorState } from './donor.reducer';
import category, { CategoryState } from './category.reducer';
import product, { ProductState } from './product.reducer';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly stock: StockState;
  readonly donor: DonorState;
  readonly category: CategoryState;
  readonly product: ProductState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  stock,
  donor,
  category,
  product,
});

export default rootReducer;
