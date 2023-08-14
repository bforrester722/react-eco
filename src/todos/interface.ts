export interface ITodo {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface IState {
  todos: {
    data: ITodo[];
    isLoading: boolean;
  };
}
