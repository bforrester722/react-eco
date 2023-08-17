import { expect } from "chai";
import { getCompletedTodos, getIncompleteTodos } from "../selectors";
import { ITodo } from "../interface";
import { fakeTodos } from "./sharedData";

describe("Selectors tests", () => {
  it("Returns only completed todos", () => {
    const expected: ITodo[] = fakeTodos.filter(
      (todo: ITodo) => todo.isCompleted
    );
    const actual: ITodo[] = getCompletedTodos.resultFunc(fakeTodos);
    expect(actual).to.deep.equal(expected);
  });

  it("Returns only incompleted todos", () => {
    const expected: ITodo[] = fakeTodos.filter(
      (todo: ITodo) => !todo.isCompleted
    );
    const actual: ITodo[] = getIncompleteTodos.resultFunc(fakeTodos);

    expect(actual).to.deep.equal(expected);
  });
});
