import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodoRequest } from "./thunks";
import { getTodos } from "./selectors";
import { IState, ITodo } from "./interface";
import "./NewTodoForm.css";
import { Dispatch } from "redux";

interface IProps {
  todos: ITodo[];
  onCreatePressed: (val: string) => void;
}
const NewTodoForm = ({ todos, onCreatePressed }: IProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="new-todo-form">
      <input
        className="new-todo-input"
        type="text"
        placeholder="Type your new todo here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          const isDuplicateText = todos.some(
            (todo) => todo.text === inputValue
          );
          if (!isDuplicateText) {
            onCreatePressed(inputValue);
            setInputValue("");
          }
        }}
        className="new-todo-button"
      >
        Create Todo
      </button>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    todos: getTodos(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onCreatePressed: (text: string) => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
