import React from "react";
import "./TodoListItem.css";
const TodoListItem = ({ todo, onCompletedPressed, onRemovePressed }) => (
  <div className="todo-item-container">
    <h3>{todo.text}</h3>
    <div className="buttons-container">
      {todo.isCompleted ? null : (
        <button
          className="completed-button"
          onClick={() => onCompletedPressed(todo.id)}
        >
          Mark As Completed
        </button>
      )}
      <button
        onClick={() => onRemovePressed(todo.id)}
        className="remove-button"
      >
        Remove
      </button>
    </div>
  </div>
);

export default TodoListItem;
