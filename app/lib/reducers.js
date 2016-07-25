'use strict';

const drinksInit = [{
  name: 'Pill',
  mgPerOz: 200,
  amount: 5,
  created: Date.now()
}];

const drinkTypesInit = [
  {
    name: 'Pill',
    mgPerOz: 200
  },
  {
    name: 'Coffee',
    mgPerOz: 50
  }
];

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
    case 'REPLACE_DRINKS':
      return action.drinks;
    default:
      return state;
  }
}

export function drinkTypesReducer(state = drinkTypesInit, action) {
  switch(action.type) {
    case 'ADD_DRINK_TYPE':
      return [...state, action.drinkType];
    case 'EDIT_DRINK_TYPE':
      return [
        ...state.slice(0, action.index),
        action.drink,
        ...state.slice(action.index + 1)
      ];
    case 'DELETE_DRINK_TYPE':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
}

export function timeReducer(state = Date.now(), action) {
  switch(action.type) {
    case 'UPDATE_TIME':
      return Date.now();
    default:
      return state;
  }
}

export default {drinksReducer, drinkTypesReducer, timeReducer};

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