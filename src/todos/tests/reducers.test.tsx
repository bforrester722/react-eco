import { expect } from "chai";
import { todos } from "../reducers";
import { IState } from "../interface";
import { fakeTodos } from "./sharedData";

describe("The todos reducer", () => {
  it("Adds a new todo when CREATE_TODO action is received", () => {
    const fakeAction = {
      type: "CREATE_TODO",
      payload: {
        todo: fakeTodos[0],
      },
    };
    const originalState: IState["todos"] = {
      isLoading: false,
      data: [],
    };

    const expected = {
      isLoading: false,
      data: [fakeTodos[0]],
    };
    const actual = todos(originalState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });

  it("Removes a todo when REMOVE_TODO action is received", () => {
    const fakeTodo = { ...fakeTodos[0], id: "remove" };
    const fakeAction = {
      type: "REMOVE_TODO",
      payload: {
        todo: fakeTodo,
      },
    };
    const originalState: IState["todos"] = {
      isLoading: false,
      data: [...fakeTodos, fakeTodo],
    };
    const expected = {
      isLoading: false,
      data: fakeTodos,
    };
    const actual = todos(originalState, fakeAction);

    expect(actual).to.deep.equal(expected);
  });

  it("Marks a todo as completed when MARK_TODO_AS_COMPLETED action is received", () => {
    const fakeAction = {
      type: "MARK_TODO_AS_COMPLETED",
      payload: {
        todo: { ...fakeTodos[1], isCompleted: true },
      },
    };
    const originalState: IState["todos"] = {
      isLoading: false,
      data: fakeTodos,
    };
    const newFake = fakeTodos.map((todo) => {
      return todo.id === fakeTodos[1].id
        ? { ...todo, isCompleted: true }
        : todo;
    });
    const expected = {
      isLoading: false,
      data: newFake,
    };
    const actual = todos(originalState, fakeAction);
    expect(actual).to.deep.equal(expected);
  });
});
