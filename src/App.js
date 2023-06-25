import { Component } from "react";
import TodoList from "./components/TodoList";
import { undoTodo } from "./helpers/TodoFunctions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    pendingTodos: [],
    doneTodos: [],
  };

  render() {
    return (
      <>
        <ToastContainer />
        <section className="h-screen">
          <div className="flex justify-center h-full">
            <div className="md:w-5/6 rounded-lg flex flex-col items-center gap-5">
              <h1 className="mt-10 text-5xl font-medium">Manage your tasks</h1>
              <div className="w-full px-5 h-4/5 flex flex-col items-center">
                <TodoList undoTodo={(todo) => undoTodo(this, todo)} />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default App;
