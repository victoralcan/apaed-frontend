import { combineReducers } from 'redux';
import authentication, { AuthenticationState } from './authentication';
import stock, { StockState } from './stock';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly stock: StockState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  stock,
});

export default rootReducer;
