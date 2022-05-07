import React, { Component } from "react";

// Store
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import {
  UpdateLoginModal,
  updateModalNUmber,
} from "../../store/actions/booking";
import {
  loginRequested,
  logOut,
  signinRequested,
} from "../../store/actions/Login";

class DeleteTest extends Component {
  constructor() {
    super();
    this.state = {
      emailError: "",
      lastNameError: "",
      firstNameError: "",
      mobileError: "",
      isMobilEmpty: false,
      mobile: "",
      form: {
        first_name: "",
        last_name: "",
        mobile: "",
        email: "",
      },
    };
  }

  componentDidMount() {
    this.props.logOut();
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    let new_form_data = { ...this.state.form };
    new_form_data[name] = value;
    this.setState({ form: new_form_data });
  };

  onChangeMobile = (e) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isMobilEmpty: false,
        mobile: e.target.value,
      };
    });
  };

  handleLogin(e) {
    const { mobile } = this.state;
    e.preventDefault();
    if (mobile === "") {
      this.setState((prevState) => {
        return {
          ...prevState,
          isMobilEmpty: true,
        };
      });
    } else {
      this.props.loginRequested({ mobile });
      this.setState({
        mobile: "",
      });
      if (!this.props.isLoggedIn) {
        this.props.updateModalNumber(2);
      }
    }
  }

  validate = () => {
    let firstNameError = "";
    let emailError = "";
    let mobileError = "";
    let lastNameError = "";

    if (!this.state.form.first_name) {
      firstNameError = "Name cannot be blank.";
    }

    if (!this.state.form.last_name) {
      lastNameError = "Name cannot be blank.";
    }

    if (/^\d{10}$/.test(this.state.form.mobile) === false) {
      mobileError = "Invalid Mobile Number";
    }

    // if (this.state.formdata.password.length < 6) {
    //   passwordError = "Password cannot be less than 6 Characters.";
    // }

    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.state.form.email
      ) === false
    ) {
      emailError = "Invalid Email";
    }
    if (emailError || lastNameError || firstNameError || mobileError) {
      this.setState({ emailError, lastNameError, firstNameError, mobileError });
      return false;
    }
    return true;
  };

  handleSignin(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.props.signinRequested(this.state.form);
    }
  }

  render() {
    const allModals = () => {
      switch (this.props.currentModalNumber) {
        case 1:
          return (
            <>
              <div className="w-full">
                <form className="rounded p-5 py-1 mb-4">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <label
                        className="block text-gray-700 text-sm font-bold"
                        htmlFor="Mobile"
                      >
                        Mobile
                      </label>
                      {this.state.isMobilEmpty && (
                        <p className="py-1 text-sm text-red-500 px-1">
                          *Required
                        </p>
                      )}
                    </div>
                    <div className="flex">
                      <input
                        className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="Mobile"
                        type="text"
                        value={this.state.mobile}
                        onChange={(e) => this.onChangeMobile(e)}
                        placeholder="Mobile"
                      />
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                        type="button"
                        onClick={(e) => this.handleLogin(e)}
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          );
        case 2:
          return (
            <>
              <div className="w-full">
                <form className="rounded p-5 py-2 mb-4">
                  <div className="mb-4">
                    <div className="flex mb-2 items-center">
                      <label
                        className="block text-gray-700 text-md font-bold"
                        htmlFor="Firstname"
                      >
                        Firstname
                      </label>
                      <p className="text-red-600 px-2 text-xs">
                        {this.state.firstNameError}
                      </p>
                    </div>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="Firstname"
                      name="first_name"
                      value={this.state.form.first_name}
                      onChange={(e) => this.handleChange(e)}
                      type="text"
                      placeholder="Firstname"
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex mb-2 items-center">
                      <label
                        className="block text-gray-700 text-md font-bold"
                        htmlFor="Firstname"
                      >
                        Lastname
                      </label>
                      <p className="text-red-600 px-2 text-xs">
                        {this.state.lastNameError}
                      </p>
                    </div>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="Lastname"
                      name="last_name"
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.form.astname}
                      type="text"
                      placeholder="Lastname"
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex mb-2 items-center">
                      <label
                        className="block text-gray-700 text-md font-bold"
                        htmlFor="Firstname"
                      >
                        Mobile
                      </label>
                      <p className="text-red-600 px-2 text-xs">
                        {this.state.mobileError}
                      </p>
                    </div>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="Mobile"
                      name="mobile"
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.form.mobile}
                      type="number"
                      placeholder="Mobile"
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex mb-2 items-center">
                      <label
                        className="block text-gray-700 text-md font-bold"
                        htmlFor="Firstname"
                      >
                        Email
                      </label>
                      <p className="text-red-600 px-2 text-xs">
                        {this.state.emailError}
                      </p>
                    </div>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
                      value={this.state.form.email}
                      onChange={(e) => this.handleChange(e)}
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={(e) => this.handleSignin(e)}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </>
          );
        default:
          return <></>;
      }
    };
    return (
      <>
        {this.props.showModal ? (
          <div
            className={`flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full md:h-full`}
            id="popup-modal"
            style={{ backgroundColor: "rgb(0 ,0 ,0,0.1)" }}
          >
            <div className="flex justify-center items-center p-4 w-full h-full md:h-auto">
              <div className="flex justify-center items-center relative w-full min-w-xs max-w-sm h-full md:h-auto">
                <div className=" relative w-full rounded-lg bg-white shadop-2">
                  <div className="flex justify-end p-2">
                    <button
                      type="button"
                      onClick={() => this.props.updateLoginModal(false)}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                  {this.props.isLoggedIn ? (
                    <>
                      <div className="w-full">
                        <form className="rounded p-5 pt-0 mb-4">
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="Email"
                            >
                              Anything else you want answered?
                            </label>
                            <textarea
                              className="border-2 p-2 border-gray-100 w-full rounded"
                              placeholder="Your Answer"
                              // value={this.state.textAreaValue}
                              // onChange={this.handleChange}
                              rows={5}
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="Mobile"
                            >
                              Duration
                            </label>
                            <div className="relative">
                              <select
                                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight"
                                id="grid-state"
                              >
                                <option>30 mins</option>
                                <option>1 hour</option>
                                <option>1.5 hours</option>
                                <option>2 hours</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                  className="fill-current h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="button"
                              onClick={(e) => this.handleLogin(e)}
                            >
                              Book Slot
                            </button>
                          </div>
                        </form>
                      </div>
                    </>
                  ) : (
                    <>{allModals()}</>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ booking, Login }) => {
  return {
    showModal: booking.showLoginModal,
    isLoggedIn: Login.isLoggedIn,
    currentModalNumber: booking.currentModalNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginModal: (data) => dispatch(UpdateLoginModal(data)),
    updateModalNumber: (data) => dispatch(updateModalNUmber(data)),
    loginRequested: (data) => dispatch(loginRequested(data)),
    signinRequested: (data) => dispatch(signinRequested(data)),
    logOut: () => dispatch(logOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DeleteTest));
