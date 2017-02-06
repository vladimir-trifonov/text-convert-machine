import { TConversions } from '../store';
import { Reducer } from 'redux';
import { ConversionsActions } from '../actions/conversions.actions';

export const conversionsReducer: Reducer<TConversions> = (state: TConversions = [], action: any): TConversions => {
  switch (action.type) {
    case ConversionsActions.GET_CONVERSIONS:
      state = action.conversions.slice() || state;
      break;
  }
  return state;
};
