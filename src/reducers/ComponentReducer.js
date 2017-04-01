import { combineReducers } from 'redux';
import * as actions from '../actions/ActionTypes'

const components = (
  state = [],
  action
) => {
  switch (action.type) {
    case actions.ADD_COMPONENT :
      return [action.components, ...state];
    default:
      return state;
  }
}

const ComponentReducer = combineReducers({
  components
});

export const getComponents = state => state.components.components;

export default ComponentReducer