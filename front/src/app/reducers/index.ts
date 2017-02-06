import { combineReducers } from 'redux';
import { conversionsReducer } from './conversions.reducer';
import { IAppState } from '../store'

export const rootReducer = combineReducers<IAppState>({
  conversions: conversionsReducer
});