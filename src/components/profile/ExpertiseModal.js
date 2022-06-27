import React, { Component } from "react";

// Store
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import {
  fetchTagsRequested,
  updateMentorExperienceRequested,
} from "../../store/actions/Mentor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditModal.css";
import SearchSelect from "./SelectSearch";
import Selectsearch from "./react_select_search";

class ExpertiseModal extends Component {
  constructor() {
    super();
    this.state = {
      TagOptions: [],
      tags: [],
    };
  }

  componentDidMount() {
    this.props.fetchTagsRequested();
    if (this.props.isEdit) {
      const { tags } = this.props.mentor;
      //replacing colleges with college id
      let tag = [];
      tags.map((x) => tag.push(x._id));
      this.setState((prev) => {
        return {
          ...prev,
          tags: [...tag],
        };
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tags !== this.props.tags) {
      //replacing colleges with college id
      const Options = this.props.tags.map((tag) => {
        return { value: tag._id, name: tag.name };
      });
      this.setState((prev) => {
        return { ...prev, TagOptions: [...Options] };
      });
    }
  }

  handleChangeTag = (tag) => {
    this.setState((prev) => {
      return {
        ...prev,
        tags: [...tag],
      };
    });
  };

  validate = () => {
    const { tags } = this.state;
    if (tags.length) {
      return false;
    }
    return true;
  };

  handleSubmitExpertise = () => {
    const { tags } = this.state;
    // if (this.validate()) {
    this.props.updateMentorExperienceRequested({
      tags: [...tags],
    });
    // this.props.handleExpertiseModal();
    // }
  };

  render() {
    console.log(this.state.tags);
    return (
      <>
        <div
          className={`flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 w-full md:inset-0 h-full md:h-full`}
          id="popup-modal"
          style={{ backgroundColor: "rgb(0 ,0 ,0,0.1)" }}
        >
          <div className="flex justify-center items-center p-4 w-full h-full md:h-auto">
            <div className="flex justify-center items-center relative w-full min-w-xs max-w-xl h-full md:h-auto">
              <div className=" relative w-full rounded-lg bg-white shadop-2">
                <div className="flex justify-between items-center w-full p-4">
                  <h1 className="text-center p-1.5 pl-3.5 font-poppins tracking-[0.18px] font-semibold text-[#989898] text-[20px]">
                    Expertise
                  </h1>
                  <button
                    type="button"
                    onClick={() => this.props.handleExpertiseModal()}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="popup-modal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="w-full">
                  <div className="rounded p-5 pt-0 mb-0">
                    <div className="mb-6 relative h-[230px]">
                      {/* <Selectsearch
                        options={this.state.TagOptions}
                        onChange={this.handleChangeTag}
                        multiSelect={true}
                        value={this.state.tags}
                        name="tags"
                      /> */}
                      <SearchSelect
                        options={this.state.TagOptions}
                        onChange={this.handleChangeTag}
                        multiSelect={true}
                        value={this.state.tags}
                        name="tags"
                      />
                    </div>
                    <div
                      className={`flex justify-end
                       items-center gap-x-3`}
                    >
                      <button
                        onClick={this.handleSubmitExpertise}
                        className=" font-Manrope bg-[#8F6EC5] rounded-[5px] text-[15px] font-medium text-white font-semibold py-2 px-5 font-Helvetica"
                      >
                        Save
                      </button>
                      {/* {this.props.isEdit && (
                        <button
                          onClick={() => this.props.handleDeleteModal()}
                          className=" font-Manrope bg-[#8F6EC5] rounded-[5px] text-[15px] font-medium text-white font-semibold py-2 px-5 font-Helvetica"
                        >
                          Delete
                        </button>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

const mapStateToProps = ({ booking, Mentor }) => {
  return {
    showModal: booking.showLoginModal,
    tags: Mentor.tags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMentorExperienceRequested: (data) =>
      dispatch(updateMentorExperienceRequested(data)),
    fetchTagsRequested: () => dispatch(fetchTagsRequested()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ExpertiseModal));
