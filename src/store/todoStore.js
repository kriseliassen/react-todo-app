import {createStore} from 'redux';
import { todoReducer } from '../reducers/todoReducer';
import { loadState, saveState } from '../localStorage';

const localStorageState = loadState();

const todoStore = createStore(
  todoReducer,
  localStorageState
);

todoStore.subscribe(() => {
  saveState(todoStore.getState());
});

export default todoStore;