import React, { Component } from "react";

// Store
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import {
    updateBookingModal,
} from "../../store/actions/booking";
import "react-toastify/dist/ReactToastify.css";
import EventCards from "./EventCards";

class MyBookingModal extends Component {

  handleAllEvents=()=>{
    this.props.updateBookingModal(1)
  }

  handleUpcomingEvents=()=>{
    this.props.updateBookingModal(2)
  }

  handlePastEvents=()=>{
    this.props.updateBookingModal(3)
  }

  render() {
    const {AllEvents,UpcomingEvents,PastEvents} = this.props;
    const Events = () => {
      switch (this.props.bookingModal) {
        case 1:
          return (
            <>
              <EventCards events={AllEvents}/>
            </>
          );
        case 2:
          return (
            <>
              <EventCards events={UpcomingEvents}/>
            </>
          );
        case 3:
          return (
            <>
              <EventCards events={PastEvents}/>
            </>
          );
        default:
          return <></>;
      }
    };
    return (
      <>
      {this.props.bookingModal!==0 && 
          <div
            className={`flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full md:h-full`}
            id="popup-modal"
            style={{ backgroundColor: "rgb(0 ,0 ,0,0.1)" }}
          >
            <div className="flex justify-center items-center p-4 w-full h-full md:h-auto">
              <div className="flex justify-center items-center relative w-full min-w-xs max-w-xl h-full md:h-auto">
                <div className=" relative w-full rounded-lg bg-white shadop-2 p-6">
                  <div className="flex justify-between items-center w-full">
                  <h1 className="text-center font-poppins tracking-[0.18px] font-semibold text-[#000000] text-[20px]">My Bookings</h1>
                    <button
                      type="button"
                      onClick={()=>this.props.updateBookingModal(0)}
                      className="text-black bg-transparent hover:bg-gray-200 hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                    <div className="flex-col w-full py-5">
                        <div className="flex font-poppins gap-x-10 py-2">
                            <a onClick={this.handleAllEvents} className={`cursor-pointer font-medium ${this.props.bookingModal===1?"text-[#8f6ec5]":"text-[#8c8c8c]"} px-3`}>All</a>
                            <a onClick={this.handleUpcomingEvents} className={`cursor-pointer font-medium ${this.props.bookingModal===2?"text-[#8f6ec5]":"text-[#8c8c8c]"} px-1`}>Upcoming</a>
                            <a onClick={this.handlePastEvents} className={`cursor-pointer font-medium ${this.props.bookingModal===3?"text-[#8f6ec5]":"text-[#8c8c8c]"} px-1`}>Past</a>
                        </div>
                        {this.props.bookingModal===1 &&
                        <div className="flex">
                            <hr className="w-[12%] rounded bg-[#8f6ec5] py-[1px]"/>
                            <hr className="w-full rounded-r bg-[#f2f2f2] py-[1px]"/>
                        </div>
                        }
                        {this.props.bookingModal===2 &&
                        <div className="flex">
                            <hr className="w-[21%] rounded bg-[#f2f2f2] py-[1px]"/>
                            <hr className="w-[35%] rounded bg-[#8f6ec5] py-[1px]"/>
                            <hr className="w-full rounded bg-[#f2f2f2] py-[1px]"/>
                        </div>
                        }
                        {this.props.bookingModal===3 &&
                        <div className="flex w-full">
                            <hr className="w-[82%] rounded bg-[#f2f2f2] py-[1px]"/>
                            <hr className="w-[27%] rounded bg-[#8f6ec5] py-[1px]"/>
                            <hr className="w-full rounded bg-[#f2f2f2] py-[1px]"/>
                        </div>
                        }
                        <>
                        <div className="overflow-auto h-[400px] pr-3">
                        {<Events />}
                        </div>
                        </>
                    </div>
                </div>
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}

const mapStateToProps = ({ booking }) => {
  return {
    bookingModal: booking.bookingModal,
    AllEvents: booking.AllEvents,
    UpcomingEvents: booking.UpcomingEvents,
    PastEvents: booking.PastEvents
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBookingModal: (data) => dispatch(updateBookingModal(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyBookingModal));
