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