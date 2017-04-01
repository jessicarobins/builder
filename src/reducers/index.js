import { combineReducers } from 'redux';

import components from './ComponentReducer'

const rootReducer = combineReducers({
  components
});

export default rootReducer;