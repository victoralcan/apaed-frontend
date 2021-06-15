import { combineReducers } from 'redux';
import authentication, { AuthenticationState } from './authentication';

export interface IRootState {
  readonly authentication: AuthenticationState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
});

export default rootReducer;
