// adds new todo
const undoTodo = (component, todo) => {
  component.setState((prevState) => ({
    pendingTodos: [
      ...prevState.pendingTodos,
      { userId: Date.now() + 1, id: Date.now(), title: todo, completed: false },
    ],
  }));
};

export { undoTodo };
