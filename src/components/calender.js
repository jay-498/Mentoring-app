import React, { Component } from "react";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
import "./calender.css";
import { connect } from "react-redux";
import { updateBookingTime, updateBookingDate } from "../store/actions/booking";

export class calender extends Component {
  state = {
    date: new Date(),
  };

  isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  tileDisabled = ({ date, view }) => {
    if (view === "month") {
      if (
        this.props.unbooked_dates.find((dDate) =>
          this.isSameDay(new Date(dDate), date)
        )
      ) {
        return true;
      }
    }
  };

  tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (
        this.props.unbooked_dates.find((dDate) =>
          this.isSameDay(new Date(dDate), date)
        )
      ) {
        return "unbooked_dates";
      }
    }
  };

  onChangeDate = (date) => {
    this.setState({ date });
    this.props.updateBookingDate(date);
  };

  render() {
    return (
      <div className="flex items-center p-2 pt-0">
        <div className="max-w-3xl shadow-xl pb-3">
          <h1 className="text-3xl font-bold bg-blend-color-dodge p-5 text-left ">
            Book Your Session Here
          </h1>
          <hr className="w-96 border-cyan-300" />
          <div className="p-6 flex">
            <Calendar
              tileClassName={this.tileClassName}
              tileDisabled={this.tileDisabled}
              className="p-5 h-full"
              onChange={this.onChangeDate}
              value={this.state.date}
            />
            <div>
              <h2 className="p-5 pt-0 font-medium text-2xl">
                {this.state.date.toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h2>
              <div className="pt-0 h-96 grid gap-4 grid-cols-1 grid-rows p-10 overflow-y-auto scrollbar-hide">
                {this.props.timings.map((time) => (
                  <button
                    key={time}
                    onClick={() => this.props.updateBookingTime(time)}
                    className="bg-transparent hover:bg-cyan-500 text-cyan-700 font-semibold hover:text-white py-2 px-4 border border-cyan-500 hover:border-transparent rounded"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    timings: state.timings,
    bookingDate: state.booking_Date,
    unbooked_dates: state.unbooked_dates,
  };
};

const mapDispatchToProps = (dispatch) => {
  let isDateSet = false;
  return {
    updateBookingDate: (data) => {
      if (data > new Date()) {
        dispatch(updateBookingDate(data));
        isDateSet = true;
      } else alert("Please Kindly Book Your Session From Tommorrow");
    },
    updateBookingTime: (data) => {
      if (isDateSet) dispatch(updateBookingTime(data));
      else alert("Please Kindly Select Your Date");
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(calender);
