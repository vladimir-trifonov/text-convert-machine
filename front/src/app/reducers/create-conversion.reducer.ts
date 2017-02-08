import { TCreateConversion } from '../store';
import { Reducer } from 'redux';
import { CreateConversionActions } from '../actions/create-conversion.actions';

export const createConversionReducer: Reducer<TCreateConversion> = (state: TCreateConversion = [], action: any): TCreateConversion => {
  switch (action.type) {
    case CreateConversionActions.CREATE_CONVERSION:
      state = action.createConversion ? Object.assign({}, action.createConversion) : state;
      break;
  }
  return state;
};
