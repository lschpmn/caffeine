'use strict';

const drinksInit = [{
  name: 'pill',
  mgPerOz: 200,
  amount: 1,
  created: 1468451177410
}];

export function drinksReducer(state = drinksInit, action) {
  switch (action.type) {
    case 'ADD_DRINK':
      return [...state, action.drink];
    case 'EDIT_DRINK':
      return [
        ...state.slice(0, action.index),
        action.drink,
        ...state.slice(action.index + 1)
      ];
    case 'DELETE_DRINK':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
}

export function drinkTypesReducer() {
  return [
    {
      name: 'pill',
      mgPerOz: 200
    },
    {
      name: 'coffee',
      mgPerOz: 50
    }
  ];
}

export default {drinksReducer, drinkTypesReducer};

/**
 * @typedef {Object} drink
 * @property {String} name
 * @property {Number} mgPerOz
 * @property {Number} amount
 * @property {Number} created
 */

/**
 * @typedef {Object} drinkType
 * @property {String} name
 * @property {Number} mgPerOz
 */