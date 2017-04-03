import { combineReducers } from 'redux';
import * as _ from 'lodash'
import * as actions from '../actions/ActionTypes'

const rows = (
  state = [{_id: 1, components: []}],
  action
) => {
  switch (action.type) {
    case actions.ADD_ROW :
      return [...state, action.row];
    case actions.ADD_COMPONENT:
      _.last(state).components.push(action.component)
      return [...state];
    default:
      return state;
  }
}

const selectedRow = (
  state = null,
  action
) => {
  switch (action.type) {
    case actions.SELECT_ROW :
      return action.row
    default:
      return state;
  }
}

const RowReducer = combineReducers({
  rows,
  selectedRow
});

export const getRows = state => state.rows.rows;

export default RowReducer