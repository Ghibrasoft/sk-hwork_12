import { Component } from "react";
import TodoForm from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { addTodo, addFilteredTodos } from "./helpers/TodoFunctions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    pendingTodos: [],
  };

  render() {
    const { pendingTodos } = this.state;

    return (
      <>
        <ToastContainer />
        <section className="h-screen">
          <div className="flex justify-center">
            <div className="md:w-5/6 rounded-lg flex flex-col items-center gap-5">
              <h1 className="mt-10 text-5xl font-medium">Manage your tasks</h1>
              <div className="w-full flex flex-col items-center overflow-y-auto">
                <TodoForm addTodo={(todo) => addTodo(this, todo)} />
                <TodoList
                  pendingTodos={pendingTodos}
                  addFilteredTodos={(todos) => addFilteredTodos(this, todos)}
                  addTodo={(todo) => addTodo(this, todo)}
                />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default App;
