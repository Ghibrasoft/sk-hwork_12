import { Component } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import Moment from "react-moment";

class PendingList extends Component {
  render() {
    const { pendingTodos, handleDone } = this.props;
    return (
      <div className="flex flex-col gap-5 pb-5 overflow-y-auto">
        <h1 className="border-b-2 border-yellow-500 bg-white sticky top-0">
          Pending ({pendingTodos.length})
        </h1>

        <ul className="flex flex-col gap-2">
          {pendingTodos.map(({ id, title }) => (
            <li
              key={id}
              className="flex justify-between border rounded-lg p-3 bg-yellow-100 hover:bg-yellow-200 transition-opacity group"
            >
              <div className="w-full overflow-hidden break-words">
                <p>{title}</p>
                <small className="flex justify-end">
                  <Moment fromNow>{id}</Moment>
                </small>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleDone(id);
                  toast.success("Task done!");
                }}
                className="text-gray-500 hover:text-green-500 ml-5 transition-all"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <AiOutlineCheckCircle size={25} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default PendingList;
