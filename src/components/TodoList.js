import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Todo from './Todo';
import '../styles/TodoList.css'

const TodoList = () => {
  const todoItems = useSelector(state => state);
  const [itemsHidden, setItemsHidden] = useState(false);

  const toggleHideDoneItems = () => {
    setItemsHidden(!itemsHidden)
  }
  const numberDoneItems = todoItems.filter(item => item.done).length

  return (
    <div className="TodoList__container">
      <h2 className="TodoList__header">Your tasks</h2>
      <button onClick={toggleHideDoneItems} className="TodoList__btn-hideshow">{!itemsHidden ? 'Hide done items' : 'Show done items'}</button>
      <p className="TodoList__counter">
            {numberDoneItems}
            /
            {todoItems.length}
            {' '}
            tasks done
          </p>
      <div className="TodoList__items">
        {todoItems.length === 0 && <p className="TodoList__items--text-empty">You have no tasks on your to-do list</p>}
        {todoItems.map(item => <Todo itemsHidden={itemsHidden} todo={item} key={item.id}/>)}
      </div>
    </div>
  )
}

export default TodoList;
