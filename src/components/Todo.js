import React, { useState } from 'react';
import todoStore from '../store/todoStore';
import { updateTodo, deleteTodo } from '../actions/todoActions';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import '../styles/Todo.css'

const Todo = ({todo, itemsHidden}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const isDone = todo.done;

  const handleEditInputTitle = (e) => {
    setCurrentTodo({ ...currentTodo, title: e.target.value });
  }

  const handleEditInputDetails = (e) => {
    setCurrentTodo({ ...currentTodo, details: e.target.value });
  }
  const handleEditInputDate = (e) => {
    setCurrentTodo({ ...currentTodo, dueDate: e.target.value });
  }

  const handleClickEditBtn = e => {
    e.stopPropagation();
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };
  
  const handleEditSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    todoStore.dispatch(updateTodo(currentTodo))
    setIsEditing(false);
  };

  const handleClickRemoveBtn = e => {
    e.stopPropagation();
    todoStore.dispatch(deleteTodo(todo.id))
  };

  const toggleDone = () => {
    todoStore.dispatch(updateTodo({ ...todo, done: !todo.done }))
  };

  const formattedDate = () => {
    const date = todo.dueDate;
    const [year, month, day] = date.split('-');
    const dateObj = {month, day, year};
    return dateObj;
  }
  const dateObject = todo.dueDate ? formattedDate() : null;

  return (
    <div className={`Todo__container ${isDone ? 'done' : 'not-done'} ${itemsHidden ? 'hidden' : undefined}`} data-testid="todo-item">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="Todo__edit-form">
          <h3 className="Todo__edit-form--header">Edit todo</h3>
          <label htmlFor="editTitle" className="Todo__edit-form--label">Edit title: </label>
          <input
            name="editTitle"
            type="text"
            className="Todo__edit-form--input"
            placeholder="Edit details"
            autoComplete="off"
            value={currentTodo.title}
            onChange={handleEditInputTitle}
          />
          <label htmlFor="editDetails" className="Todo__edit-form--label">Edit details: </label>
          <input
            name="editDetails"
            type="text"
            className="Todo__edit-form--input"
            placeholder="Edit details"
            autoComplete="off"
            value={currentTodo.details}
            onChange={handleEditInputDetails}
          />
          <label htmlFor="editDate" className="Todo__edit-form--label">Edit due date: </label>
          <input
            name="editDate"
            type="date"
            className="Todo__edit-form--input"
            placeholder='dd-mm-yyyy'
            value={currentTodo.dueDate}
            onChange={handleEditInputDate}
          />
          <div className="Todo__edit-form--btns">
            <button type="button" onClick={() => setIsEditing(false)} className="Todo__edit-form--btn Todo__edit-form--btn-cancel">Cancel</button>
            <button type="submit" className="Todo__edit-form--btn Todo__edit-form--btn-update">Update</button>
          </div>
        </form>
      ) : (
        <div className="Todo__content" onClick={toggleDone}>
          <div className="Todo__info">
            {isDone ? <ImCheckboxChecked className="checkbox" /> : <ImCheckboxUnchecked className="checkbox" />}
            <div className="Todo__info--text">
              <h3 className="Todo__info--title">{todo.title}</h3>
              <p className="Todo__info--details">{todo.details}</p>
              {todo.dueDate && (
              <p className="Todo__info--duedate"><span className="text-emphasis">Due date: </span>{dateObject.day}.{dateObject.month}.{dateObject.year}</p>)}
            </div>
          </div>
          {!isDone && <button type="button" className="Todo__content--btn Todo__content--btn--edit" onClick={handleClickEditBtn}><FaEdit /></button>}
          {isDone && <button type="button"   className="Todo__content--btn Todo__content--btn--remove" onClick={handleClickRemoveBtn} data-testid="remove-btn" aria-label="remove item button"><FaRegTrashAlt /></button>}
        </div>
      )}
    </div>
  )
}

export default Todo
