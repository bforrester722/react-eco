import "node-fetch";
import { expect } from "chai";
import * as sinon from "sinon";
import * as fetchMock from "fetch-mock";
import {
  addTodoRequest,
  removeTodoRequest,
  loadTodos,
  markTodoAsCompletedRequest,
} from "../thunks";
import { fakeTodos } from "./sharedData";

describe("Thunks tests", () => {
  // testing loadTodos()
  it("Dispatches the correct actions in the success scenario when loading todos", async () => {
    const fakeDispatch = sinon.spy();

    fetchMock.get("http://localhost:8080/todos", fakeTodos);

    const expectedFirstAction = { type: "LOAD_TODOS_IN_PROGRESS" };
    const expectedSecondAction = {
      type: "LOAD_TODOS_SUCCESS",
      payload: {
        todos: fakeTodos,
      },
    };

    await loadTodos()(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

    fetchMock.reset();
  });

  // testing addTodoRequest()
  it("Dispatches the correct action when adding a todo", async () => {
    const fakeDispatch = sinon.spy();

    fetchMock.post("http://localhost:8080/todos", fakeTodos[0]);

    const expectedAction = {
      type: "CREATE_TODO",
      payload: {
        todo: fakeTodos[0],
      },
    };

    await addTodoRequest(fakeTodos[0].text)(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedAction);

    fetchMock.reset();
  });

  // testing removeTodoRequest()
  it("Dispatches the correct action when removing a todo", async () => {
    const fakeDispatch = sinon.spy();

    fetchMock.delete(
      `http://localhost:8080/todos/${fakeTodos[0].id}`,
      fakeTodos[0]
    );

    const expectedAction = {
      type: "REMOVE_TODO",
      payload: {
        todo: fakeTodos[0],
      },
    };

    await removeTodoRequest(fakeTodos[0].id)(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedAction);

    fetchMock.reset();
  });

  // testing markTodoAsCompletedRequest()
  it("Dispatches the correct action when marking a todo complete", async () => {
    const fakeDispatch = sinon.spy();

    const fakeTodoCompleted = { ...fakeTodos[0], isCompleted: true };
    fetchMock.post(
      `http://localhost:8080/todos/${fakeTodos[0].id}/completed`,
      fakeTodoCompleted
    );

    const expectedAction = {
      type: "MARK_TODO_AS_COMPLETED",
      payload: {
        todo: fakeTodoCompleted,
      },
    };

    await markTodoAsCompletedRequest(fakeTodos[0].id)(fakeDispatch);
    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedAction);

    fetchMock.reset();
  });
});
