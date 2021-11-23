import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { addTodo, updateTodo, deleteTodo } from './actions/todoActions';
import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from './types';
import { todoReducer } from './reducers/todoReducer';
import todoStore from './store/todoStore';
import App from './App';
import Todo from './components/Todo';
import Form from './components/Form';
import TodoList from './components/TodoList';


const todoListMock = [
  {
    id: 'ac34768-4e0e-ca23-0fc4-ee24387dc7', title: 'Go to gym', details: '', done: true, dueDate: '2021-11-14'
  },
  {
    id: 'ebe7af-dcf7-0e3b-6b02-c6b2dc5b3d6b', title: 'Do laundry', details: 'tomorrow', done: false, dueDate: '2021-11-14'
  },
  {
    id: '331307-870d-b137-3ff5-1073f85a1ee', title: 'Go to bed', details: 'later', done: false, dueDate: '2021-11-14'
  },
];

const doneItemMock = {
  id: '1234567', title: 'Get groceries', details: 'tomorrow', done: true, dueDate: '2021-11-14'
};

const notDoneItemMock = {
  id: '12378229', title: 'Call home', details: 'today', done: false, dueDate: '2021-11-14'
};

const itemsHidden = jest.fn();

describe('Redux store', () => {
  it('gets todos', () => {
    const todos = todoStore.getState();
    expect(todos).toEqual([]);
  });
});

describe('ACTIONS', () => {
  describe('the addTodo action', () => {
    test('should return the correct type and payload', () => {
      const result = addTodo(doneItemMock);
      expect(result).toEqual(
        { type: ADD_TODO, payload: doneItemMock}
      )
    })
  })
  describe('the updateTodo action', () => {
    test('should return the correct type and payload', () => {
      const result = updateTodo(notDoneItemMock);
      expect(result).toEqual(
        { type: UPDATE_TODO, payload: notDoneItemMock}
      )
    })
  })
  describe('the deleteTodo action', () => {
    test('should return the correct type and payload', () => {
      const result = deleteTodo('12345');
      expect(result).toEqual(
        { type: DELETE_TODO, payload: '12345'}
      )
    })
  })
})

describe('REDUCERS', () => {
  describe('the todoReducer', () => {
    test('should add todo item', () => {
      const action = { type: ADD_TODO, payload: doneItemMock}
      const expectedResult = [
        {
        id: 'ac34768-4e0e-ca23-0fc4-ee24387dc7', title: 'Go to gym', details: '', done: true, dueDate: '2021-11-14'
        },
        {
          id: 'ebe7af-dcf7-0e3b-6b02-c6b2dc5b3d6b', title: 'Do laundry', details: 'tomorrow', done: false, dueDate: '2021-11-14'
        },
        {
          id: '331307-870d-b137-3ff5-1073f85a1ee', title: 'Go to bed', details: 'later', done: false, dueDate: '2021-11-14'
        },
        {
          id: '1234567', title: 'Get groceries', details: 'tomorrow', done: true, dueDate: '2021-11-14'
        }
      ]
      const result = todoReducer(todoListMock, action)
      expect(result).toEqual(expectedResult)
    })
    test('should update todo item', () => {
      const action = { type: UPDATE_TODO, payload: {
        id: 'ebe7af-dcf7-0e3b-6b02-c6b2dc5b3d6b', title: 'Hand in weekend test', details: 'tomorrow', done: false, dueDate: '2021-11-14'
      }}
      const expectedResult = [
        {
        id: 'ac34768-4e0e-ca23-0fc4-ee24387dc7', title: 'Go to gym', details: '', done: true, dueDate: '2021-11-14'
        },
        {
          id: 'ebe7af-dcf7-0e3b-6b02-c6b2dc5b3d6b', title: 'Hand in weekend test', details: 'tomorrow', done: false, dueDate: '2021-11-14'
        },
        {
          id: '331307-870d-b137-3ff5-1073f85a1ee', title: 'Go to bed', details: 'later', done: false, dueDate: '2021-11-14'
        }
      ]
      const result = todoReducer(todoListMock, action)
      expect(result).toEqual(expectedResult)
    })
    test('should delete todo item', () => {
      const action = { type: DELETE_TODO, payload: 'ebe7af-dcf7-0e3b-6b02-c6b2dc5b3d6b'}
      const expectedResult = [
        {
        id: 'ac34768-4e0e-ca23-0fc4-ee24387dc7', title: 'Go to gym', details: '', done: true, dueDate: '2021-11-14'
        },
        {
          id: '331307-870d-b137-3ff5-1073f85a1ee', title: 'Go to bed', details: 'later', done: false, dueDate: '2021-11-14'
        }
      ]
      const result = todoReducer(todoListMock, action)
      expect(result).toEqual(expectedResult)
    })
  })
})

describe('COMPONENTS', () => {
  describe('the App component', () => {
    test('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <Provider store={todoStore}>
        <App />
      </Provider>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    test('renders a navbar and a footer', () => {
      render(
      <Provider store={todoStore}>
        <App />
      </Provider>);
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  })
  describe('the Form component', () => {
    test('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <Provider store={todoStore}>
        <Form />
      </Provider>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    test('renders a form to enter new task', () => {
      render(<Form />);
      expect(screen.getByLabelText('Title')).toBeInTheDocument();
      expect(screen.getByLabelText('Details')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Add'))
        .toBeInTheDocument();
    });
    test('should accept user input', () => {
      const mockTitle = 'Do laundry';
      const mockDetails = 'Tomorrow';
      render(<Form />);
      const titleInput = screen.getByLabelText('Title');
      const detailsInput = screen.getByLabelText('Details');
      userEvent.type(titleInput, mockTitle);
      userEvent.type(detailsInput, mockDetails);
      expect(titleInput).toHaveValue('Do laundry');
      expect(detailsInput).toHaveValue('Tomorrow');
    });
  })
  describe('the Todo List component', () => {
    test('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <Provider store={todoStore}>
        <TodoList />
      </Provider>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  })
  describe('the Todo component', () => {
    test('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <Provider store={todoStore}>
        <Todo itemsHidden={itemsHidden} todo={notDoneItemMock} key={notDoneItemMock.id}/>
      </Provider>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    test('should render a remove-button if item is done', () => {
      render(<Todo itemsHidden={itemsHidden} todo={doneItemMock} key={doneItemMock.id}/>);
      expect(screen.getByTestId('remove-btn')).toBeInTheDocument();
    });
    test('should NOT render a remove-button if item is not done', () => {
      render(<Todo itemsHidden={itemsHidden} todo={notDoneItemMock} key={notDoneItemMock.id}/>);
      expect(screen.queryByTestId('remove-btn')).toBeNull();
    });
  })
})