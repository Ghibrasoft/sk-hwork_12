import { Component } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

class TodoForm extends Component {
  state = {
    newTodo: "",
  };

  handleChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { newTodo } = this.state;
    const { addTodo } = this.props;

    if (newTodo.trim() !== "") {
      addTodo(newTodo);
      this.setState({ newTodo: "" });
    }
  };

  render() {
    const { newTodo } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="w-1/2">
        <div className="my-5 flex w-full rounded-full shadow-lg">
          <input
            type="text"
            name="todo"
            placeholder="Write To-Do..."
            value={newTodo}
            onChange={this.handleChange}
            className="px-4 py-2 w-full rounded-l-full ring-1 ring-blue-500 outline-none focus:ring-blue-700 focus:shadow-lg transition-all"
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center px-3 rounded-r-full text-white bg-blue-500 ring-1 ring-blue-500 hover:px-5 hover:ring-blue-700 hover:bg-blue-700 active:ring-offset-2 transition-all group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              <AiOutlinePlusCircle size={25} />
            </span>
            Add
          </button>
        </div>
      </form>
    );
  }
}

export default TodoForm;
