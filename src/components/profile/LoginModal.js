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
import { sendOtp } from "../../services/auth.service";
// import GoogleLogin from "react-google-login";
// import { GLOGIN_CLIENT_ID } from "../../assets/js/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import rupee from "../../assets/svgs/rupee.svg";

class DeleteTest extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
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

  componentDidUpdate(){
    console.log("login",this.props.event)
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
        } 
        // else {
        //   this.props.updateModalNumber(2);
        // }
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
      if(!this.props.isBooking){
        this.props.updateLoginModal(false);
      }
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
    // console.log(res.tokenId)
    const mentor_id = this.props.params.id;
    localStorage.setItem('event',JSON.stringify(this.props.event))
    this.props.googleSigninRequested({tokenId : res.tokenId,mentor_id});
  };

  onGoogleLoginFailure = (res) =>{
    console.log(res);
  }

  handleSignin(e) {
    e.preventDefault();
    const { email, first_name, last_name } = this.state.form;
    const { userMobile } = this.props;
    const isValid = this.validate();
    if (isValid) {
      this.props.signinRequested({email, first_name, last_name, mobile: userMobile});
      // signinUser({ email, first_name, last_name, mobile: userMobile }).then(
      //   (res) => {
      //     if (res.success) {
      //       this.setState((prevState) => {
      //         return {
      //           ...prevState,
      //           otpSent: true,
      //         };
      //       });
      //     }
      //   }
      // );
    }
  }

  handleUpdateCalender(){
    const id = this.props.params.id;
    const {event} = this.props;
    console.log("last",event)
    if(event.startDate && event.endDate && event.summary)
    {
      this.props.updateCalenderEventRequested({event:this.props.event,mentor_id: id});
    }
    else{
      toast.warn("Please select your slot first",{position: toast.POSITION.TOP_CENTER})
    } 
  }

  handleShowPassword = () => {
    this.setState(prev=>{
      return{
        ...prev,
        showPassword: !prev.showPassword
      }
    })
  };

  loginRedirect=()=>{
    this.props.updateLoginModal(1);
    this.setState({otpSent: false})
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  

  render() {
    const allModals = () => {
      switch (this.props.currentModalNumber) {
        case 1:
          return (
            <>
              <div className="w-full">
                <form className="rounded p-5 py-1 mb-4" >
                  {!this.state.otpSent ? (
                    <div className="flex-col">
                      <div className="flex justify-center items-center mb-2">
                        <label
                          className="text-center font-poppins tracking-[0.18px] font-semibold text-[#989898] text-md"
                          htmlFor="Login"
                        >
                          Login to Menteezy
                        </label>
                        {this.state.isMobilEmpty && (
                          <p className="py-1 text-sm text-red-500 px-1">
                            *Invalid
                          </p>
                        )}
                      </div>
                      <div className="relative my-3">
                          <input
                          className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                          id="mobile"
                          type="mobile"
                          onKeyDown={this.handleKeyDown}
                          value={this.state.mobile}
                          onChange={(e) => this.onChangeMobile(e)}
                          placeholder=" "
                        />
                        <label htmlFor="mobile" className="font-roboto absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Mobile No.</label>
                      </div>
                        <button
                          className="w-full  bg-[#8F6EC5] text-white font-bold py-2 px-4 rounded-[3px]"
                          type="button"
                          onClick={(e) => this.handleLogin(e)}
                        >
                          Proceed
                        </button>
                      </div>
                  ) : (
                    <div>
                      <div className="flex items-center my-2">
                        {/* <label
                          className="block text-gray-700 text-sm font-bold"
                          htmlFor="Mobile"
                        >
                          OTP Verification
                        </label> */}
                        {(this.state.otpError !== "" ||
                          this.props.otpMessage !== "") ? 
                          <p className="py-1 text-sm text-red-500 px-1">
                            {this.state.otpError || this.props.otpMessage}
                          </p>
                          :
                          <p className="py-1 text-sm font-semibold font-poppins text-[#8F6EC5] px-1">Please verify your OTP...</p>
                        }
                      
                      </div>
                      <div className="relative my-3">
                        <input
                          className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                          id="otp"
                          type="text"
                          value={this.state.otp}
                          onKeyDown={this.handleKeyDown}
                          onChange={(e) => this.onChangeOtp(e)}
                          placeholder=" "
                        />
                        <label htmlFor="otp" className="font-roboto absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">OTP</label>
                       </div> 
                        <button
                          className="w-full  bg-[#8F6EC5] text-white font-bold py-2 px-4 rounded-[3px]"
                          type="button"
                          onClick={(e) => this.handleOtp(e)}
                        >
                          Verify
                        </button>
                      </div>
                  )}
                </form>
              </div>
            </>
          );
        case 2:
          return (
            <>
              <div className="px-10 rounded justify-center items-center w-full">
                  <form className="mb-9" >
                  <h1 className="pb-5 text-center font-poppins tracking-[0.18px] font-semibold text-[#989898] text-md">Join Menteezy today!</h1>
                  {/* <div className="mb-4"> */}
                    {/* <div className="flex mb-2 items-center"> */}
                      {/* <p className="text-red-600 px-2 text-xs">
                      {this.state.mobileError}
                    </p> */}
                    {/* </div> */}
                    {/* <div className="relative">
                    <input
                      className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                      id="mobile"
                      name="mobile"
                      // value={this.props.userMobile}
                      type="text"
                      placeholder=" "
                    />
                    <label for="mobile" className="font-roboto font-normal absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Mobile No.</label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center w-full">
                      <hr className="py-[1px] mr-2 rounded-full w-1/2" style={{ backgroundColor: "rgba(148, 148, 148, 0.33)" }}/>
                      <span className="font-normal text-[#797979] font-poppins text-base">Or</span>
                      <hr className="bg-[#949494] py-[1px] ml-2 rounded-full w-1/2" style={{ backgroundColor: "rgba(148, 148, 148, 0.33)" }}/>
                    </div>
                  </div> */}
                  <div className="mb-6">
                    {/* <div className="flex mb-2 items-center"> */}
                      {/* <p className="text-red-600 px-2 text-xs">
                      {this.state.mobileError}
                    </p> */}
                    {/* </div> */}
                    <div className="relative">
                    <input
                      className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                      id="Firstname"
                      name="first_name"
                      value={this.state.form.first_name}
                      onChange={(e) => this.handleChange(e)}
                      type="text"
                      placeholder=" "
                    />
                    <label htmlFor="Firstname" className="font-roboto absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">First name</label>
                    </div>
                  </div>
                  <div className="mb-6">
                    {/* <div className="flex mb-2 items-center"> */}
                      {/* <p className="text-red-600 px-2 text-xs">
                      {this.state.mobileError}
                    </p> */}
                    {/* </div> */}
                    <div className="relative">
                    <input
                      className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                      id="Lastname"
                      name="last_name"
                      value={this.state.form.lastname}
                      onChange={(e) => this.handleChange(e)}
                      type="text"
                      placeholder=" "
                    />
                    <label htmlFor="Lastname" className="font-roboto absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Last name</label>
                    </div>
                  </div>
                  <div className="mb-6">
                    {/* <div className="flex mb-2 items-center"> */}
                      {/* <p className="text-red-600 px-2 text-xs">
                      {this.state.mobileError}
                    </p> */}
                    {/* </div> */}
                    <div className="relative">
                    <input
                      className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                      id="mobile"
                      name="mobile"
                      disabled
                      value={this.props.userMobile}
                      type="text"
                      placeholder=" "
                    />
                    <label htmlFor="mobile" className="font-roboto absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Mobile No.</label>
                    </div>
                  </div>
                  <div className="mb-6">
                    {/* <div className="flex mb-2 items-center">
                      <p className="text-red-600 px-2 text-xs">
                        {this.state.firstNameError}
                      </p>
                    </div> */}
                    <div className="relative">
                        <input
                        className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                        id="email"
                        name="email"
                        value={this.state.form.email}
                        onChange={(e) => this.handleChange(e)}
                        type="email"
                        placeholder=" "
                      />
                      <label htmlFor="email" className="font-roboto absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Email</label>
                    </div>
                  </div>
                  {/* <div className=" mb-6"> */}
                    {/* <div className="flex mb-2 items-center">
                      <p className="text-red-600 px-2 text-xs">
                        {this.state.emailError}
                      </p>
                    </div> */}
                    {/* <div className="grid items-center relative">
                      <input
                        type={`${this.state.showPassword ? "text" : "password"}`}
                        className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                        autoComplete="off"
                        name="password"
                        id="password"
                        placeholder=" "
                      />
                      <label for="password" className="font-roboto absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] rounded-full bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Password</label>
                      <img
                        loading="lazy"
                        onClick={this.handleShowPassword}
                        src={this.state.showPassword ? crossEye : eye}
                        className="absolute w-5 h-5 right-0 mr-4 cursor-pointer"
                        title="View"
                        alt="view"
                      />
                    </div> */}
                  {/* </div> */}

                  <div className="flex items-center justify-between">
                    <button
                      className="w-full  bg-[#8F6EC5] text-white font-bold py-2 px-4 rounded-[3px]"
                      type="button"
                      onClick={(e) => this.handleSignin(e)}
                    >
                      Continue
                    </button>
                  </div>
                  {/* <div className="flex font-poppins text-xs py-4">
                    <p className="text-[#989898]">Already have an account?</p><button onClick={()=>this.loginRedirect()} className="text-[#8F6EC5] font-semibold">Login</button>
                  </div> */}
                </form>
                {/* ) : (
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
                )} */}
                
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
                  {this.props.isLoggedIn && this.props.isBooking ? (
                    
                    <>
                    {/* {this.props.is_google_verified ?  */}
                      <div className="w-full">
                        <form className="rounded p-5 pt-0 mb-4">
                          <h1 className="text-center pb-5 font-poppins tracking-[0.18px] font-semibold text-[#989898] text-md">Book Your Session Here</h1>
                          <div className="mb-4">
                            {/* <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="Email"
                            >
                              Anything else you want answered?
                            </label> */}
                            <div className="relative">
                              <textarea
                                className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                                placeholder=" "
                                id="summary"
                                name="summary"
                                value={this.props.event.summary}
                                onChange={(e)=>this.props.onChangeEventSumary(e)}
                                rows={5}
                              />
                              <label htmlFor="summary" className="font-roboto absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Anything you want to get answered?</label>
                            </div>
                          </div>
                          {/* <div className="mb-4"> */}
                            {/* <label
                              className="block text-[#8F6EC5] text-sm font-bold mb-2"
                              htmlFor="Mobile"
                            >
                              Duration
                            </label> */}
                            {/* <div className="relative">
                              <select
                                className="block appearance-none w-full bg-gray-100 border focus:outline-none focus:ring-0 focus:border-[#8F6EC5] text-gray-700 py-2 px-3 pr-8 rounded leading-tight"
                                id="grid-state"
                                onChange={(e)=>this.props.onChangeEventEndDate(e)}
                              >
                                <option value="1">1 hour</option>
                                <option value="2">2 hours</option>
                                <option value="3">3 hours</option>
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
                          </div> */}
                          <div onClick={() => this.handleUpdateCalender()} className="flex cursor-pointer text-[16px] w-full items-center justify-between bg-[#8F6EC5] text-white font-bold py-2 rounded-[3px] px-4">
                              <span>
                               PAY NOW
                              </span>
                              <span className="flex items-center justify-center">
                              <img src={rupee} className="w-4 h-4" alt="Rs"/>{this.props.mentor.session_rate*parseInt(this.props.event.duration)/60}
                              </span>
                            {/* <button
                              className="flex justify-center items-center w-full bg-[#8F6EC5] text-white font-bold py-2 rounded-[3px]"
                              type="button"
                              onClick={() => this.handleUpdateCalender()}
                            >
                              <img src={rupee} className="w-4 h-4" alt="Rs"/><span>435</span>Book Slot
                            </button> */}
                          </div>
                        </form>
                      </div>
                    {/* :
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
                    } */}
                    </>
                  ) : (
                    <>{allModals()}</>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <ToastContainer autoClose={2000} />
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
    updateCalenderEventRequested: (data)=>dispatch(updateCalenderEventRequested(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DeleteTest));
