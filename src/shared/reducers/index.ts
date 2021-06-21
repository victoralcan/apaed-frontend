import { combineReducers } from 'redux';
import authentication, { AuthenticationState } from './authentication';
import stock, { StockState } from './stock.reducer';
import donor, { DonorState } from './donor.reducer';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly stock: StockState;
  readonly donor: DonorState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  stock,
  donor,
});

export default rootReducer;
