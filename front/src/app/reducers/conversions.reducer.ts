import { TConversions } from '../store';
import { Reducer } from 'redux';
import { ConversionsActions } from '../actions/conversions.actions';

export const conversionsReducer: Reducer<TConversions> = (state: TConversions = [], action: any): TConversions => {
  switch (action.type) {
    case ConversionsActions.GET_CONVERSIONS:
      state = action.conversions.slice() || state;
      break;
    case ConversionsActions.UPDATE_CONVERSION:
      let updateIdx = state.findIndex((conversion: any) => conversion._id === action.conversion._id);
      if (updateIdx !== -1) {
        state = [
          ...state.slice(0, updateIdx),
          Object.assign({}, action.conversion),
          ...state.slice(updateIdx + 1)
        ];
      }
      break;
  }
  return state;
};
