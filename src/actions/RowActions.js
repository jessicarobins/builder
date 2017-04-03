import * as types from './ActionTypes'

export const addRow = () => {
  return {
    type: types.ADD_ROW,
    row: {_id: Math.random(), components: []}
  };
}

export const selectRow = (row) => {
  return {
    type: types.SELECT_ROW,
    row
  };
}