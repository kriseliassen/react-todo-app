import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addTodo } from '../actions/todoActions';
import todoStore from '../store/todoStore';
import '../styles/Form.css'

const Form = () => {
  const [titleValue, setTitleValue] = useState('');
  const [detailsValue, setDetailsValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [taskAdded, setTaskAdded] = useState(false);

  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  }

  const handleDetailsChange = e => {
    setDetailsValue(e.target.value);
  };

  const handleDateChange = e => {
    setDateValue(e.target.value);
  };

  const resetForm = event => {
    setTitleValue('');
    setDetailsValue('');
    setDateValue('');
    event.target.title.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      title: titleValue,
      details: detailsValue,
      dueDate: dateValue,
      done: false,
    };
    todoStore.dispatch(addTodo(newItem));
    setTaskAdded(true)
    setTimeout(() => setTaskAdded(false), 3000)
    resetForm(e);
  };

  return (
    <div className="Form__container">
      <h2 className="Form__header">Add new task</h2>
      {<div className={`Form__success-flag ${!taskAdded ? 'hidden' : null}`}><p>New task added</p></div>}
      <form className="Form__form" onSubmit={handleSubmit}>
        <label htmlFor="Form__form-input--title" className="Form__form-input--label">
          <input
            type="text"
            id="Form__form-input--title"
            className="Form__form-input Form__form-input--title"
            autoComplete="off"
            placeholder="&nbsp;"
            name="title"
            value={titleValue}
            required
            onChange={handleTitleChange} />
            <span className="placeholder">Title</span>
        </label>
        <label htmlFor="Form__form-input--details" className="Form__form-input--label">
          <input
            type="text"
            id="Form__form-input--details"
            className="Form__form-input Form__form-input--details"
            autoComplete="off"
            placeholder="&nbsp;"
            name="details"
            value={detailsValue}
            onChange={handleDetailsChange} />
            <span className="placeholder">Details</span>
        </label>
        <label htmlFor="Form__form-input--date" className="Form__form-input--label Form__form-input--label-date">
          <span className="placeholder--duedate">Due date</span>
          <input
            type="date"
            id="Form__form-input--date"
            className="Form__form-input Form__form-input--date"
            name="date"
            placeholder='dd-mm-yyyy'
            value={dateValue}
            onChange={handleDateChange} />
        </label>
        <input type="submit" value="Add" className="Form__form-input--btn" />
      </form>
    </div>
  )
}

export default Form
