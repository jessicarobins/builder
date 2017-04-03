import { combineReducers } from 'redux';

// import components from './ComponentReducer'
import rows from './RowReducer'

const rootReducer = combineReducers({
  // components,
  rows
});

export default rootReducer;