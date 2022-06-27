import React, { Component } from "react";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
import delet from "../assets/svgs/delete.svg";
import plus from "../assets/svgs/plus.svg";
import copy from "../assets/svgs/copy.svg";
import "./calender.css";
import { connect } from "react-redux";
import { updateBookingTime, updateBookingDate } from "../store/actions/booking";

const dates = [];
export class calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      weekDays: [
        {
          name: "SUN",
          slots: 1,
        },
        {
          name: "MON",
          slots: 1,
        },
        {
          name: "TUE",
          slots: 1,
        },
        {
          name: "WED",
          slots: 1,
        },
        {
          name: "THU",
          slots: 1,
        },
        {
          name: "FRI",
          slots: 1,
        },
        {
          name: "SAT",
          slots: 1,
        },
      ],
      availableDates: [],
    };
  }

  isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  getDay(date) {
    return new Date(date).getDay();
  }

  // tileDisabled = ({ date, view }) => {
  //   if (view === "month") {
  //     if (
  //       this.props.unbooked_dates.find((dDate) =>
  //         this.isSameDay(new Date(dDate), date)
  //       )
  //     ) {
  //       return true;
  //     }
  //   }
  // };

  // tileClassName = ({ date, view }) => {
  //   if (view === "month") {
  //     if (
  //       this.props.unbooked_dates.find((dDate) =>
  //         this.isSameDay(new Date(dDate), date)
  //       )
  //     ) {
  //       return "unbooked_dates";
  //     }
  //   }
  // };

  onChangeDate = (date) => {
    if (date > new Date()) {
      if (dates.indexOf(date.toString()) === -1) {
        dates.push(date.toString());
        this.setState((prev) => {
          return {
            ...prev,
            date: date,
            availableDates: [
              ...prev.availableDates,
              {
                date: date,
                times: [{ start_time: "09:00", end_time: "10:00" }],
              },
            ],
          };
        });
      }
    } else alert("Please Kindly Book Your Session From Tommorrow");
  };

  IncreaseSlot(index) {
    const { availableDates } = this.state;
    let dates = [...availableDates];
    let date = { ...dates[index] };
    date.times = [...date.times, { start_time: "09:00", end_time: "10:00" }];
    dates[index] = date;
    this.setState((prev) => {
      return {
        ...prev,
        availableDates: dates,
      };
    });
  }

  removeSlot(index) {
    const { availableDates } = this.state;
    let dates = [...availableDates];
    dates.splice(index, 1);
    this.setState((prev) => {
      return {
        ...prev,
        availableDates: dates,
      };
    });
  }

  DeleteSlot(timeIndex, dateIndex) {
    const { availableDates } = this.state;
    let dates = [...availableDates];
    let date = { ...dates[dateIndex] };
    let times = [...date.times];
    times.splice(timeIndex, 1);
    dates[dateIndex] = { ...date, times };
    this.setState((prev) => {
      return {
        ...prev,
        availableDates: dates,
      };
    });
  }

  // handleChangeCheckbox(e) {
  //   let index = e.target.name;
  //   const { availableDates } = this.state;
  //   let dates = [...availableDates];
  //   let date = { ...dates[index] };
  //   dates[index] = date;
  //   this.setState((prev) => {
  //     return {
  //       ...prev,
  //       availableDates: dates,
  //     };
  //   });
  // }

  onChangeStartTime = (e, timeIndex, dateIndex) => {
    const { availableDates } = this.state;
    let dates = [...availableDates];
    let date = { ...dates[dateIndex] };
    let times = [...date.times];
    times[timeIndex].start_time = e.target.value;
    this.setState((prev) => {
      return {
        ...prev,
        availableDates: [...dates],
      };
    });
  };

  onChangeEndTime = (e, timeIndex, dateIndex) => {
    const { availableDates } = this.state;
    let dates = [...availableDates];
    let date = { ...dates[dateIndex] };
    let times = [...date.times];
    times[timeIndex].end_time = e.target.value;
    this.setState((prev) => {
      return {
        ...prev,
        availableDates: [...dates],
      };
    });
  };

  handleSubmitDates = () => {
    const { availableDates } = this.state;
    //replacing the college array with college id
    let dates = [...availableDates];
    let times = [];
    for (let i = 0; i < dates.length; i++) {
      times = [...dates[i].times];
      for (let j = 0; j < times.length; j++) {
        let diff = parseInt(times[j].end_time) - parseInt(times[j].start_time);
        let start_time = parseInt(times[j].start_time);
        if (diff > 1) {
          times.splice(j, 1);
          let replaceTimes = [];
          for (let i = 1; i <= diff; i++) {
            let str_start_time = start_time.toString() + ":00";
            let str_end_time = (start_time + 1).toString() + ":00";
            replaceTimes.push({
              start_time: str_start_time,
              end_time: str_end_time,
            });
            start_time += 1;
          }
          times = [...replaceTimes, ...times];
          //issue is here
          //i have to set this times to dates
        }
        console.log("replace", times);
      }
    }

    //remove duplicate elements for times
    for (let i = 0; i < dates.length; i++) {
      times = [...dates[i].times];
      const unique_times = [
        ...new Map(times.map((item, key) => [item[key], item])).values(),
      ];
      dates[i].times = [...unique_times];
      console.log("uniqie", unique_times);
    }

    // console.log(
    //   parseInt(e.target.value) - parseInt(times[timeIndex].start_time)
    // );
    console.log("finalBooked", dates);
  };

  dateFormat = (date) => {
    let x = new Date(date);
    return (
      "date",
      ("0" + x.getDate()).slice(-2) +
        " " +
        x.toLocaleString("default", { month: "long" }) +
        " " +
        x.getFullYear()
    );
  };

  render() {
    return (
      <div className="lg:flex rounded-lg shadow-xl gap-x-10 p-5 pt-0">
        <div className="max-w-3xl  pb-3">
          <h1 className="text-xl font-poppins font-bold bg-blend-color-dodge pb-2 text-left ">
            Select Your available Dates
          </h1>
          <hr className="w-96 border-violet-300" />
          <div className="p-6 flex">
            <Calendar
              // tileClassName={this.tileClassName}
              // tileDisabled={this.tileDisabled}
              className="p-5 h-full"
              onChange={this.onChangeDate}
              // value={this.state.date}
            />
          </div>
        </div>
        {this.state.availableDates.length !== 0 && (
          <div className="flex-col w-full shadow-lg p-5 rounded-2xl">
            <h1 className="text-lg font-semibold font-poppins">
              Set your daily hours
            </h1>
            <div className="flex  w-full">
              <div className="flex-col w-full h-[350px] overflow-auto w-full py-4 pr-2">
                {this.state.availableDates.map((date, dateIndex) => (
                  <div
                    key={dateIndex}
                    className="flex gap-x-5 items-start justify-between"
                  >
                    <p className="flex font-poppins text-semibold px-2 m-2 py-3 rounded-lg bg-white">
                      {this.dateFormat(date.date)}
                    </p>
                    <div className="flex-col">
                      {date.times.map((time, timeIndex) => (
                        <div
                          key={timeIndex}
                          className="flex py-1 gap-x-3 items-center justify-start"
                        >
                          <input
                            className="p-2 py-3 focus:outline-none rounded-lg font-poppins"
                            type="time"
                            value={time.start_time}
                            onChange={(e) =>
                              this.onChangeStartTime(e, timeIndex, dateIndex)
                            }
                            step="900"
                          />
                          <p>-</p>
                          <input
                            className="p-2 py-3 focus:outline-none rounded-lg font-poppins"
                            type="time"
                            onChange={(e) =>
                              this.onChangeEndTime(e, timeIndex, dateIndex)
                            }
                            value={time.end_time}
                            step="900"
                          />
                          {timeIndex === 0 && (
                            <img
                              src={plus}
                              alt="x"
                              className="w-4 h-4 cursor-pointer"
                              onClick={() => this.IncreaseSlot(dateIndex)}
                            />
                          )}
                          <img
                            src={delet}
                            onClick={() =>
                              this.DeleteSlot(timeIndex, dateIndex)
                            }
                            alt="x"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-x-5 items-center justify-end pt-5">
                      <img
                        onClick={() => this.removeSlot(dateIndex)}
                        src={delet}
                        alt="x"
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`flex   justify-end
                items-end gap-x-3`}
            >
              <button
                onClick={this.handleSubmitDates}
                className="cursor-pointer font-Manrope bg-[#8F6EC5] rounded-[5px] text-[15px] font-medium text-white font-semibold py-2 px-5 font-Helvetica"
              >
                Update
              </button>
            </div>
          </div>
        )}
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
