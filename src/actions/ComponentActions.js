import * as types from './ActionTypes'

export const addComponent = (component) => {
  return {
    type: types.ADD_COMPONENT,
    component
  };
}

export const selectComponent = (component) => {
  return {
    type: types.SELECT_COMPONENT,
    component
  };
}

export const updateComponent = (component) => {
  return {
    type: types.UPDATE_COMPONENT,
    component
  };
}