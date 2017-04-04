import { combineReducers } from 'redux';
import * as actions from '../actions/ActionTypes'

const components = (
  state = [],
  action
) => {
  switch (action.type) {
    case actions.ADD_COMPONENT :
      return [action.component, ...state];
    case actions.UPDATE_COMPONENT :
      return state.map( item => {
        if(item._id !== action.component._id) {
            return item;
        }
        return action.component
      })
    default:
      return state;
  }
}

const selected = (
  state = null,
  action
) => {
  switch (action.type) {
    case actions.SELECT_COMPONENT :
      return action.component;
    default:
      return state;
  }
}

const ComponentReducer = combineReducers({
  components,
  selected
});

export const getComponents = state => state.components.components;
export const getSelectedComponent = state => state.components.selected;

export default ComponentReducer