import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { getTodos, getTodosLoading } from "./selectors";
import {
  loadTodos,
  removeTodoRequest,
  markTodoAsCompletedRequest,
} from "./thunks";

import "./TodoList.css";
import { ITodo, IState } from "./interface";
import { Dispatch } from "redux";

interface IProps {
  todos: ITodo[];
  isLoading: boolean;
  onRemovePressed: (val: string) => void;
  onCompletedPressed: (val: string) => void;
  startLoadingTodos: () => void;
}

const TodoList = ({
  todos = [],
  onRemovePressed,
  onCompletedPressed,
  isLoading,
  startLoadingTodos,
}: IProps) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    <div className="list-wrapper">
      <NewTodoForm />
      {todos.map((todo) => (
        <TodoListItem
          key={todo.text}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
    </div>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state: IState) => ({
  isLoading: getTodosLoading(state),
  todos: getTodos(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id: string) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id: string) => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
