import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from '../types';

export const addTodo = (object) => ({ type: ADD_TODO, payload: object});

export const updateTodo = (object) => ({ type: UPDATE_TODO, payload: object});

export const deleteTodo = (id) => ({ type: DELETE_TODO, payload: id});
