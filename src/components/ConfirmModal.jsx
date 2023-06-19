import { Component } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

class ConfirmModal extends Component {
  render() {
    const { openModal, todoId, modalHandler, handleDelete } = this.props;
    return (
      // backdrop
      <div
        onClick={() => modalHandler(false)}
        className={`flex justify-center items-center fixed inset-0 transition-colors ${
          openModal ? "visible bg-black/50" : "invisible"
        }`}
      >
        {/* modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white flex flex-col gap-7 rounded-xl shadow p-7 transition-opacity ${
            openModal ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          {/* modal body */}
          <div className="flex flex-col items-center">
            <AiOutlineCloseCircle size={50} color="red" />
            <h3 className="text-lg text-gray-800 font-bold">Confirm delete</h3>
            <p className="text-sm text-gray-500 whitespace-normal">
              Are you sure you want delete this task?
            </p>
          </div>
          <div className="flex gap-1 justify-center">
            <button
              type="button"
              onClick={() => {
                modalHandler(false);
                handleDelete(todoId);
                toast.error("Task deleted!");
              }}
              className="bg-red-500 text-white rounded-lg px-5 py-1 hover:bg-red-700"
            >
              Delete
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white rounded-lg px-5 py-1 hover:bg-gray-700"
              onClick={() => {
                modalHandler(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmModal;
