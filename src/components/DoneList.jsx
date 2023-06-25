import { Component } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrUndo } from "react-icons/gr";
import Moment from "react-moment";

class DoneList extends Component {
  render() {
    const { doneTodos, handleUndo, modalHandler, todoIdHandler } = this.props;

    return (
      <div className="flex flex-col gap-5 pb-5 overflow-y-auto">
        <h1 className="border-b-2 border-green-500 bg-white sticky top-0">
          Done ({doneTodos.length})
        </h1>

        <ul className="flex flex-col gap-2">
          {doneTodos.map(({ id, title }) => (
            <li
              key={id}
              className="flex justify-between border rounded-lg p-3 bg-green-100 hover:bg-green-200 group transition-opacity"
            >
              <div className="w-full overflow-hidden break-words">
                <p>{title}</p>
                <small className="flex justify-end">
                  <Moment fromNow>{id}</Moment>
                </small>
              </div>
              <div className="flex gap-1 ml-5">
                <button
                  type="button"
                  onClick={() => handleUndo(id)}
                  className="text-gray-500 hover:text-yellow-500 transition-all"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <GrUndo size={25} />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    modalHandler(true);
                    todoIdHandler(id);
                  }}
                  className="text-gray-500 hover:text-red-500 transition-all group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <AiOutlineCloseCircle size={25} />
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DoneList;
