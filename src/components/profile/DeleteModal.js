import React, { Component } from "react";

class DeleteModal extends Component {
  render() {
    return (
      <div className="z-50 flex justify-center items-center overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed">
        <div className="z-50 relative p-3 mx-auto my-0 max-w-md min-w-xs">
          <div className="bg-white rounded shadow-lg border flex flex-col overflow-hidden px-7 py-7">
            <div className="text-center font-poppins py-2 text-2xl text-gray-700">
              Are you sure ?
            </div>
            <div className="text-center font-poppins font-light text-gray-700 mb-5">
              Do you really want to delete this record?
            </div>
            <div className="flex font-Manrope justify-center">
              <button
                className="bg-gray-300 text-gray-900 rounded hover:bg-gray-200 px-6 py-2 focus:outline-none mx-1"
                onClick={() => this.props.handleDeleteModal()}
              >
                Cancel
              </button>
              <button
                className="bg-[#8F6EC5] text-white rounded hover:bg-red-400 px-6 py-2 focus:outline-none mx-1"
                onClick={() => this.props.handleSubmitDelete()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"></div>
      </div>
    );
  }
}

export default DeleteModal;
