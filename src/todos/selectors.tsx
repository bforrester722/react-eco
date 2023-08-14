import { createSelector } from "reselect";
import { ITodo, IState } from "./interface";

export const getTodos = (state: IState) => state.todos.data;
export const getTodosLoading = (state: IState) => state.todos.isLoading;

export const getIncompleteTodos = createSelector(getTodos, (todos) =>
  todos.filter((todo: ITodo) => !todo.isCompleted)
);

export const getCompletedTodos = createSelector(getTodos, (todos: ITodo[]) =>
  todos.filter((todo) => todo.isCompleted)
);
