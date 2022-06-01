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
  setErrorMessage,
  signinRequested,
  updateUserMobile,
  googleSigninRequested
} from "../../store/actions/Login";
import {updateCalenderEventRequested} from "../../store/actions/booking";
import { sendOtp, signinUser } from "../../services/auth.service";
import GoogleLogin from "react-google-login";
import { GLOGIN_CLIENT_ID } from "../../assets/js/config";

class DeleteTest extends Component {
  constructor() {
    super();
    this.state = {
      emailError: "",
      otpError: "",
      otpSent: false,
      lastNameError: "",
      firstNameError: "",
      mobileError: "",
      isMobilEmpty: false,
      mobile: "",
      otp: "",
      form: {
        first_name: "",
        last_name: "",
        email: "",
      },
    };
    this.onGoogleLoginSuccess = this.onGoogleLoginSuccess.bind(this);
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

  onChangeOtp = (e) => {
    this.props.setErrorMessage("");
    this.setState((prevState) => {
      return {
        ...prevState,
        otpError: "",
        otp: e.target.value,
      };
    });
  };

  handleLogin(e) {
    const { mobile } = this.state;
    e.preventDefault();
    if (mobile === "" || /^\d{10}$/.test(mobile) === false) {
      this.setState((prevState) => {
        return {
          ...prevState,
          isMobilEmpty: true,
        };
      });
    } else {
      this.props.updateUserMobile(mobile);
      sendOtp({ mobile }).then((res) => {
        if (res.success) {
          this.setState((prevState) => {
            return {
              ...prevState,
              otpSent: true,
            };
          });
        } else {
          this.props.updateModalNumber(2);
        }
      });
      this.setState({
        mobile: "",
      });
    }
  }

  handleOtp(e) {
    const { otp } = this.state;
    const { userMobile } = this.props;
    e.preventDefault();
    if (otp === "" || /^\d{6}$/.test(otp) === false) {
      this.props.setErrorMessage("*OTP length should be 6");
    } else {
      this.props.loginRequested({ otp, mobile: userMobile });
      this.setState({
        otp: "",
      });
    }
  }

  validate = () => {
    let firstNameError = "";
    let emailError = "";
    let lastNameError = "";

    if (!this.state.form.first_name) {
      firstNameError = "Name cannot be blank.";
    }

    if (!this.state.form.last_name) {
      lastNameError = "Name cannot be blank.";
    }

    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.state.form.email
      ) === false
    ) {
      emailError = "Invalid Email";
    }
    if (emailError || lastNameError || firstNameError) {
      this.setState({ emailError, lastNameError, firstNameError });
      return false;
    }
    return true;
  };

  onGoogleLoginSuccess = (res) => {
    //hit login API here then use the userToken to redirect towards dashboard
    this.props.googleSigninRequested({tokenId : res.tokenId});
  };

  onGoogleLoginFailure = (res) =>{
    alert(res);
  }

  handleSignin(e) {
    e.preventDefault();
    const { email, first_name, last_name } = this.state.form;
    const { userMobile } = this.props;
    const isValid = this.validate();
    if (isValid) {
      signinUser({ email, first_name, last_name, mobile: userMobile }).then(
        (res) => {
          if (res.success) {
            this.setState((prevState) => {
              return {
                ...prevState,
                otpSent: true,
              };
            });
          }
        }
      );
    }
  }

  handleUpdateCalender(e){
    this.props.updateCalenderEventRequested();
  }

  render() {
    console.log("modal",this.props.is_google_verified,"login",this.props.isLoggedIn)
    const allModals = () => {
      switch (this.props.currentModalNumber) {
        case 1:
          return (
            <>
              <div className="w-full">
                <form className="rounded p-5 py-1 mb-4">
                  {!this.state.otpSent ? (
                    <div className="flex-col">
                      <div className="flex items-center mb-2">
                        <label
                          className="block text-gray-700 text-sm font-bold"
                          htmlFor="Mobile"
                        >
                          Mobile
                        </label>
                        {this.state.isMobilEmpty && (
                          <p className="py-1 text-sm text-red-500 px-1">
                            *Invalid
                          </p>
                        )}
                      </div>
                      <div className="flex">
                        <input
                          className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="mobile"
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
                  ) : (
                    <div>
                      <div className="flex items-center my-2">
                        <label
                          className="block text-gray-700 text-sm font-bold"
                          htmlFor="Mobile"
                        >
                          OTP Verification
                        </label>
                        {(this.state.otpError !== "" ||
                          this.props.otpMessage !== "") && (
                          <p className="py-1 text-sm text-red-500 px-1">
                            {this.state.otpError || this.props.otpMessage}
                          </p>
                        )}
                      </div>
                      <div className="flex">
                        <input
                          className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="otp"
                          type="text"
                          value={this.state.otp}
                          onChange={(e) => this.onChangeOtp(e)}
                          placeholder="OTP"
                        />
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                          type="button"
                          onClick={(e) => this.handleOtp(e)}
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </>
          );
        case 2:
          return (
            <>
              <div className="w-full">
                {!this.state.otpSent ? (
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
                        {/* <p className="text-red-600 px-2 text-xs">
                        {this.state.mobileError}
                      </p> */}
                      </div>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="Mobile"
                        name="mobile"
                        disabled
                        value={this.props.userMobile}
                        // onChange={(e) => this.handleChange(e)}
                        type="text"
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
                ) : (
                  <div className="ounded p-5 py-2 mb-4">
                    <div className="mb-4">
                      <div className="flex items-center my-2">
                        <label
                          className="block text-gray-700 text-sm font-bold"
                          htmlFor="Mobile"
                        >
                          OTP Verification
                        </label>
                      </div>
                    </div>
                    <div className="flex">
                      <input
                        className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="otp"
                        type="text"
                        value={this.state.otp}
                        onChange={(e) => this.onChangeOtp(e)}
                        placeholder="OTP"
                      />
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                        type="button"
                        onClick={(e) => this.handleOtp(e)}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}
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
                    {this.props.is_google_verified ? 
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
                              onClick={(e) => this.handleUpdateCalender(e)}
                            >
                              Book Slot
                            </button>
                          </div>
                        </form>
                      </div>
                    :
                    <div className="w-full">
                        <form className="rounded p-5 pt-0 mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="Email"
                            >
                              Please verify your email here
                            </label>
                          <GoogleLogin
                              className="mt-2 rounded"
                              clientId={GLOGIN_CLIENT_ID}
                              buttonText="Login in with Google"
                              onSuccess={this.onGoogleLoginSuccess}
                              onFailure={this.onGoogleLoginFailure}
                              cookiePolicy={"single_host_origin"}
                          />
                        </form>
                    </div>
                    }
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
    otpMessage: Login.otpMessage,
    isLoggedIn: Login.isLoggedIn,
    userMobile: Login.userMobile,
    is_google_verified: Login.is_google_verified,
    currentModalNumber: booking.currentModalNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setErrorMessage: (data) => dispatch(setErrorMessage(data)),
    updateLoginModal: (data) => dispatch(UpdateLoginModal(data)),
    updateModalNumber: (data) => dispatch(updateModalNUmber(data)),
    loginRequested: (data) => dispatch(loginRequested(data)),
    signinRequested: (data) => dispatch(signinRequested(data)),
    updateUserMobile: (data) => dispatch(updateUserMobile(data)),
    googleSigninRequested: (data) => dispatch(googleSigninRequested(data)),
    logOut: () => dispatch(logOut()),
    updateCalenderEventRequested: ()=>dispatch(updateCalenderEventRequested())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DeleteTest));
