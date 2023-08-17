import { ITodo } from "../interface";

export const fakeTodos: ITodo[] = [
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
