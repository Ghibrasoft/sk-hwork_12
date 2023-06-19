// adds new todo
const addTodo = (component, todo) => {
  component.setState((prevState) => ({
    pendingTodos: [...prevState.pendingTodos, { id: Date.now(), todo }],
  }));
};

// updates todos array
const addFilteredTodos = (component, todos) => {
  component.setState({ pendingTodos: todos });
};

export { addTodo, addFilteredTodos };
