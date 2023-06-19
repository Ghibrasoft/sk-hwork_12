import { Component } from "react";
import PendingList from "./PendingList";
import DoneList from "./DoneList";
import ConfirmModal from "./ConfirmModal";

class TodoList extends Component {
  state = {
    doneTodos: [],
    openModal: false,
    todoId: "",
  };

  // done
  handleDone = (id) => {
    const { pendingTodos, addFilteredTodos } = this.props;
    const updatedPendingTodos = pendingTodos.filter((todo) => todo.id !== id);
    const todoToMove = pendingTodos.find((todo) => todo.id === id);

    addFilteredTodos(updatedPendingTodos);

    this.setState((prev) => ({
      doneTodos: [...prev.doneTodos, todoToMove],
    }));
  };

  // undo
  handleUndo = (id) => {
    const { doneTodos } = this.state;
    const { addTodo } = this.props;
    const todoToUndo = doneTodos.find((todo) => todo.id === id);
    const updatedDoneTodos = doneTodos.filter((todo) => todo.id !== id);
    addTodo(todoToUndo.todo);
    this.setState({
      doneTodos: updatedDoneTodos,
    });
  };

  // delete
  handleDelete = (id) => {
    const { doneTodos } = this.state;
    const updatedDoneTodos = doneTodos.filter((todo) => todo.id !== id);
    this.setState({
      doneTodos: updatedDoneTodos,
    });
  };

  // modal open/close
  modalHandler = (val) => {
    this.setState({ openModal: val });
  };

  // todoId
  todoIdHandler = (id) => {
    this.setState({ todoId: id });
  };

  render() {
    const { pendingTodos } = this.props;
    const { doneTodos, openModal, todoId } = this.state;

    return (
      <>
        <div className="w-full grid grid-cols-2 gap-y-10 gap-x-20">
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
