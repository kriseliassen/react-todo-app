import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from '../types';

export const todoReducer = (state, action) => {
  switch(action.type) {
    case ADD_TODO:
      return [
        ...state,
        action.payload
      ]
    case UPDATE_TODO:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return {...todo, ...action.payload};
        }
        return todo
      })
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.payload );
    default:
      return state;
  }
};
