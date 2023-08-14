import { Dispatch } from "redux";
import {
  createTodo,
  removeTodo,
  markTodoAsCompleted,
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
} from "./actions";

// used to fetch todos from local server
export const loadTodos = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();

    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFailure());
    dispatch(displayAlert(e));
  }
};

// used to add todo from local server
export const addTodoRequest =
  (text: string) => async (dispatch: Dispatch<any>) => {
    try {
      const body = JSON.stringify({ text });
      const response = await fetch("http://localhost:8080/todos", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body,
      });
      const todo = await response.json();
      dispatch(createTodo(todo));
    } catch (e) {
      dispatch(displayAlert(e));
    }
  };

// used to remove todo from local server
export const removeTodoRequest =
  (id: string) => async (dispatch: Dispatch<any>) => {
    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "delete",
      });
      const removedTodo = await response.json();
      dispatch(removeTodo(removedTodo));
    } catch (e) {
      dispatch(displayAlert(e));
    }
  };

// used to mark a todo complete from local server
export const markTodoAsCompletedRequest =
  (id: string) => async (dispatch: Dispatch<any>) => {
    try {
      const response = await fetch(
        `http://localhost:8080/todos/${id}/completed`,
        {
          method: "post",
        }
      );
      const updatedTodo = await response.json();
      dispatch(markTodoAsCompleted(updatedTodo));
    } catch (e) {
      dispatch(displayAlert(e));
    }
  };

// used to show when an error has occured fetching or updating data
export const displayAlert = (text: string) => () => {
  alert(text);
};
