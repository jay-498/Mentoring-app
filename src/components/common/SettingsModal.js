import React, { Component } from "react";

// Store
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import {
  fetchCurrentMentorDetailsRequested,
  updateMentorExperienceRequested,
} from "../../store/actions/Mentor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class SettingsModal extends Component {
  constructor() {
    super();
    this.state = {
      settings: {
        name: "",
        upi_id: "",
        meet_link: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchCurrentMentorDetailsRequested();
    console.log(this.props.mentor);
  }

  componentDidUpdate(prevProps) {
    const { mentor } = this.props;
    if (mentor !== prevProps.mentor) {
      this.setState((prev) => {
        return {
          ...prev,
          settings: {
            ...prev.settings,
            name: mentor.name,
            meet_link: mentor.google_meet_link,
            upi_id: mentor.upi_payment_id,
          },
        };
      });
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    let new_form_data = { ...this.state.settings };
    new_form_data[name] = value;
    this.setState({ settings: new_form_data });
  };

  validate = () => {
    const { name, meet_link, upi_id } = this.state.settings;
    if (name === "" || meet_link === "" || upi_id === "") {
      return false;
    }
    return true;
  };

  handleUpdateSettings = () => {
    if (this.validate) {
      this.props.updateMentorExperienceRequested(this.state.settings);
    }
  };

  render() {
    return (
      <>
        <div
          className={`flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full md:h-full`}
          id="popup-modal"
          style={{ backgroundColor: "rgb(0 ,0 ,0,0.1)" }}
        >
          <div className="flex justify-center items-center p-4 w-full h-full md:h-auto">
            <div className="flex justify-center items-center relative w-full min-w-xs max-w-xl h-full md:h-auto">
              <div className=" relative w-full rounded-lg bg-white shadop-2">
                <div className="flex justify-between items-center w-full p-4">
                  <h1 className="text-center p-1.5 pl-3.5 font-poppins tracking-[0.18px] font-semibold text-[#989898] text-[20px]">
                    Settings
                  </h1>
                  <button
                    type="button"
                    onClick={() => this.props.handleSettingsModal()}
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
                    <div className="mb-2">
                      <label
                        className="block px-1 text-[#8F6EC5] text-sm font-bold mb-2"
                        htmlFor="Mobile"
                      >
                        Basic Information
                      </label>
                      <div className="relative">
                        <input
                          className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                          id="name"
                          name="name"
                          value={this.state.settings.name}
                          onChange={(e) => this.handleChange(e)}
                          type="text"
                          placeholder=" "
                        />
                        <label
                          htmlFor="Titlename"
                          className="font-poppins absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] 
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                                peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                        >
                          Name
                        </label>
                      </div>
                    </div>

                    <div className="mb-2">
                      <label
                        className="block px-1 text-[#8F6EC5] text-sm font-bold mb-2"
                        htmlFor="Mobile"
                      >
                        Payment Information
                      </label>
                      <div className="relative">
                        <input
                          className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                          id="UpiId"
                          name="upi_id"
                          value={this.state.settings.upi_id}
                          onChange={(e) => this.handleChange(e)}
                          type="text"
                          placeholder=" "
                        />
                        <label
                          htmlFor="Companyname"
                          className="font-poppins absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] 
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                                peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                        >
                          Upi Id
                        </label>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block px-1 text-[#8F6EC5] text-sm font-bold mb-2"
                        htmlFor="Mobile"
                      >
                        Meeting Information
                      </label>
                      <div className="relative">
                        <input
                          className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                          id="meet_link"
                          name="meet_link"
                          value={this.state.settings.meet_link}
                          onChange={(e) => this.handleChange(e)}
                          type="text"
                          placeholder=" "
                        />
                        <label
                          htmlFor="MeetLink"
                          className="font-poppins absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] 
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                                peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                        >
                          Meet Link
                        </label>
                      </div>
                    </div>

                    <div className={`flex justify-end gap-x-3  items-center`}>
                      <button
                        onClick={this.handleUpdateSettings}
                        className=" font-Manrope bg-[#8F6EC5] rounded-[5px] text-[15px] font-medium text-white font-semibold py-2 px-5 font-Helvetica"
                      >
                        Update
                      </button>
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

const mapStateToProps = ({ Mentor }) => {
  return {
    mentor: Mentor.MentorDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentMentorDetailsRequested: () =>
      dispatch(fetchCurrentMentorDetailsRequested()),
    updateMentorExperienceRequested: (data) =>
      dispatch(updateMentorExperienceRequested(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SettingsModal));
