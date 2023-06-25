import React, { Component } from "react";
import PendingList from "./PendingList";
import DoneList from "./DoneList";
import ConfirmModal from "./ConfirmModal";
import AddTodo from "./AddTodo";

class TodoList extends Component {
  state = {
    openModal: false,
    todoId: "",
    pendingTodos: [],
    doneTodos: [],
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        const pending = data.filter((todo) => todo.completed === false);
        const done = data.filter((todo) => todo.completed === true);
        this.setState({
          pendingTodos: pending,
          doneTodos: done,
        });
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }

  addNewTodo = (todo) => {
    this.setState((prevState) => ({
      pendingTodos: [
        {
          userId: Date.now() + 1,
          id: Date.now(),
          title: todo,
          completed: false,
        },
        ...prevState.pendingTodos,
      ],
    }));
  };

  handleDone = (id) => {
    const { pendingTodos } = this.state;
    const updatedPendingTodos = pendingTodos.filter((todo) => todo.id !== id);
    const todoToMove = pendingTodos.find((todo) => todo.id === id);

    if (todoToMove) {
      todoToMove.completed = true;

      this.setState((prevState) => ({
        pendingTodos: updatedPendingTodos,
        doneTodos: [...prevState.doneTodos, todoToMove],
      }));
    }
  };

  handleUndo = (id) => {
    const { undoTodo } = this.props;
    const { doneTodos } = this.state;
    const todoToUndo = doneTodos.find((todo) => todo.id === id);
    const updatedDoneTodos = doneTodos.filter((todo) => todo.id !== id);

    if (todoToUndo) {
      todoToUndo.completed = false;
      undoTodo && undoTodo(todoToUndo.title);

      this.setState((prevState) => ({
        doneTodos: updatedDoneTodos,
        pendingTodos: [...prevState.pendingTodos, todoToUndo],
      }));
    }
  };

  handleDelete = (id) => {
    const { doneTodos } = this.state;
    const updatedDoneTodos = doneTodos.filter((todo) => todo.id !== id);
    this.setState({
      doneTodos: updatedDoneTodos,
    });
  };

  modalHandler = (val) => {
    this.setState({ openModal: val });
  };

  todoIdHandler = (id) => {
    this.setState({ todoId: id });
  };

  render() {
    const { openModal, todoId, pendingTodos, doneTodos } = this.state;
    return (
      <>
        <div className="w-full flex justify-center sticky top-0">
          <AddTodo addNewTodo={this.addNewTodo} />
        </div>
        <div className="w-full grid grid-cols-2 gap-y-10 gap-x-20 overflow-y-auto">
          {/* pending todos */}
          {pendingTodos.length > 0 && (
            <PendingList
              pendingTodos={pendingTodos}
              handleDone={this.handleDone}
            />
          )}

          {/* done todos */}
          {doneTodos.length > 0 && (
            <DoneList
              doneTodos={doneTodos}
              handleDelete={this.handleDelete}
              handleUndo={this.handleUndo}
              todoId={todoId}
              todoIdHandler={this.todoIdHandler}
              modalHandler={this.modalHandler}
            />
          )}
        </div>
        <ConfirmModal
          openModal={openModal}
          modalHandler={this.modalHandler}
          handleDelete={this.handleDelete}
          todoId={todoId}
        />
      </>
    );
  }
}

export default TodoList;
