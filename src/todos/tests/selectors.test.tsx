import { expect } from "chai";
import { getCompletedTodos } from "../selectors";
import { ITodo } from "../interface";

describe("The getCompletedTodos selector", () => {
  it("Returns only completed todos", () => {
    const fakeTodos: ITodo[] = [
      {
        id: "1",
        createdAt: new Date().toString(),
        text: "Say Hello",
        isCompleted: true,
      },
      {
        id: "2",
        createdAt: new Date().toString(),
        text: "Say Goodbye",
        isCompleted: false,
      },
      {
        id: "3",
        createdAt: new Date().toString(),
        text: "Climb Mount Everest",
        isCompleted: false,
      },
    ];
    const expected = [
      {
        id: "1",
        createdAt: new Date().toString(),
        text: "Say Hello",
        isCompleted: true,
      },
    ];
    const actual = getCompletedTodos.resultFunc(fakeTodos);

    expect(actual).to.deep.equal(expected);
  });
});
