import React, { Component } from "react";
import { verifyEventCode } from "../../services/Mentor.service";
import { toast } from "react-toastify";
// Store

class OtpVerififcation extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
    };
  }

  handleChangeCode = (e) => {
    if (e.target.value.length <= 6) {
      this.setState({ code: e.target.value });
      if (e.target.value.length === 6) {
        verifyEventCode({
          event_id: this.props.eventId,
          verification_code: e.target.value,
        })
          .then((res) => {
            if (res.data.success) {
              toast.success(res.data.msg, {
                position: toast.POSITION.TOP_CENTER,
              });
              this.props.handleChangeOtp();
            } else {
              toast.error(res.data.msg, {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  render() {
    return (
      <>
        <div
          className={`flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 w-full md:inset-0 h-full md:h-full`}
          id="popup-modal"
          style={{ backgroundColor: "rgb(0 ,0 ,0,0.1)" }}
        >
          <div className="flex justify-center items-center p-4 w-full h-full md:h-auto">
            <div className="flex justify-center items-center relative w-full min-w-xs max-w-sm h-full md:h-auto">
              <div className=" relative w-full rounded-lg bg-white shadop-2">
                <div className="flex justify-between items-center w-full p-4">
                  <h1 className="text-center p-1.5 font-poppins tracking-[0.18px] font-semibold text-[#989898] text-[16px]">
                    Enter 6 digit code for verification
                  </h1>
                  <button
                    type="button"
                    onClick={() => this.props.handleChangeOtp()}
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
                <div className="rounded p-5 pt-0 mb-0">
                  <div className="relative">
                    <input
                      className="border-2 border-gray-300 block py-2 px-2 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                      id="Otp"
                      name="Otp"
                      value={this.state.code}
                      onChange={this.handleChangeCode}
                      type="text"
                      placeholder=" "
                    />
                    <label
                      htmlFor="Otp"
                      className="font-roboto absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                    >
                      Otp
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default OtpVerififcation;
