import React, { Component } from "react";
import profiledesigns from "../../assets/images/design/profiledesigns.png";
import plus from "../../assets/images/svgs/plus.png";
import pencil from "../../assets/images/svgs/pencil.png";
import Slots from "./Slots";
import { withRouter } from "../../utils/withRouter";
import downarrow from "../../assets/images/svgs/downarrow.png";
import { mentorAvailability } from "../../services/booking.service";
import {
  updateCalenderEventRequested,
  UpdateLoginModal,
} from "../../store/actions/booking";
import { connect } from "react-redux";
import LoginModal from "./LoginModal";
import { logOut } from "../../store/actions/Login";
import ExperienceModal from "./ExperienceModal";
import EducationModal from "./EducationModal";
import { toast } from "react-toastify";
import { fetchMentorDetailsRequested } from "../../store/actions/Mentor";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.bookingref = React.createRef();
    this.state = {
      showExperienceModal: false,
      showEducationModal: false,
      availableDates: [],
      NavItem: 1,
      dropDownItem: 1,
      dropDownItems: ["All", "Upcoming", "Past"],
      // StartDates: [
      //   {
      //     date: "Fri Jun 03 2022 8:00:00 GMT+0530 (India Standard Time)",
      //     times: [8, 9, 10, 14, 16],
      //   },
      //   {
      //     date: "Sat Jun 04 2022 10:00:00 GMT+0530 (India Standard Time)",
      //     times: [10, 9],
      //   },
      //   {
      //     date: "Sun Jun 05 2022 14:00:00 GMT+0530 (India Standard Time)",
      //     times: [14, 16, 20],
      //   },
      //   {
      //     date: "Mon Jun 06 2022 9:00:00 GMT+0530 (India Standard Time)",
      //     times: [9, 10, 14, 16],
      //   },
      //   {
      //     date: "Tue Jun 07 2022 8:00:00 GMT+0530 (India Standard Time)",
      //     times: [8, 9, 10, 20],
      //   },
      // ],
      currentStartDateIndex: 0,
      currentStartTimeIndex: 0,
      event: {
        startDate: "",
        endDate: "",
        duration: 0,
        summary: "",
      },
    };
    this.onChangeEventStartDate = this.onChangeEventStartDate.bind(this);
    this.onChangeEventEndDate = this.onChangeEventEndDate.bind(this);
    this.onChangeEventSumary = this.onChangeEventSumary.bind(this);
    this.onChangeEventStartTime = this.onChangeEventStartTime.bind(this);
    this.addHours = this.addHours.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleUpdateCalender = this.handleUpdateCalender.bind(this);
    this.dateFormat = this.dateFormat.bind(this);
  }

  componentDidMount() {
    const id = this.props.params.id;
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const modal = params.get("modal");
    const storageEvent = JSON.parse(localStorage.getItem("event"));
    if (modal === "true") {
      this.props.updateLoginModal(true);
      this.setState((prev) => {
        return {
          ...prev,
          event: { ...storageEvent },
        };
      });
    }
    // this.props.fetchMentorDetailsRequested({ id });
    mentorAvailability(id).then((res) => {
      this.setState((prev) => {
        return {
          ...prev,
          availableDates: [...res.data.data],
        };
      });
      // this.onChangeEventStartDate(0);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.availableDates.length !== prevState.availableDates.length) {
      this.onChangeEventStartDate(0);
    }
    if (prevState.event.startDate === "" && this.state.event.startDate !== "") {
      this.onChangeEventStartTime(0);
    }
    if (prevState.event.startDate !== this.state.event.startDate) {
      this.onChangeEventStartTime(this.state.currentStartTimeIndex);
    }
  }

  onChangeEventStartDate = (index) => {
    const { availableDates } = this.state;
    if (availableDates.length) {
      this.setState((prev) => {
        return {
          ...prev,
          currentStartDateIndex: index,
          event: {
            ...prev.event,
            startDate: this.formatDate(availableDates[index].date),
          },
        };
      });
    }
  };

  formatDate = (date) => {
    var dateParts = date.split("-");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject.toString();
  };

  startTimesCalculate(timeIndex) {
    const { startDate } = this.state.event;
    const { availableDates, currentStartDateIndex } = this.state;
    const newStartDate = new Date(startDate);
    const newTime = new Date(newStartDate.getTime());
    const times = availableDates[currentStartDateIndex].times;
    const splitStartTimes = times[timeIndex].start_time.split(":");
    newTime.setHours(parseInt(splitStartTimes[0]));
    newTime.setMinutes(parseInt(splitStartTimes[1]));
    return String(newTime);
  }

  endTimesCalculate(timeIndex) {
    const { startDate } = this.state.event;
    const { availableDates, currentStartDateIndex } = this.state;
    const newStartDate = new Date(startDate);
    const newTime = new Date(newStartDate.getTime());
    const times = availableDates[currentStartDateIndex].times;
    const splitStartTimes = times[timeIndex].end_time.split(":");
    newTime.setHours(parseInt(splitStartTimes[0]));
    newTime.setMinutes(parseInt(splitStartTimes[1]));
    return String(newTime);
  }

  onChangeEventStartTime = (timeIndex) => {
    this.setState(
      (prev) => {
        return {
          ...prev,
          currentStartTimeIndex: timeIndex,
          event: {
            ...prev.event,
            startDate: this.startTimesCalculate(timeIndex),
            endDate: this.endTimesCalculate(timeIndex),
          },
        };
      },
      () => this.durationCalculation()
    );
  };

  diff_hours(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  }

  durationCalculation() {
    const { startDate, endDate } = this.state.event;
    let dt1 = new Date(endDate);
    let dt2 = new Date(startDate);
    this.setState((prev) => {
      return {
        ...prev,
        event: {
          ...prev.event,
          duration: this.diff_hours(dt1, dt2) * 60,
        },
      };
    });
  }

  handleUpdateCalender = (rate) => {
    const id = this.props.params.id;
    const { event } = this.state;
    if (event.startDate && event.endDate) {
      this.props.updateCalenderEventRequested({
        event: { ...event, amount: (parseInt(rate) * event.duration) / 60 },
        mentor_id: id,
      });
    } else {
      toast.warn("Please select your slot", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  onChangeEventSumary = (e) => {
    this.setState((prev) => {
      return {
        ...prev,
        event: {
          ...prev.event,
          summary: e.target.value,
        },
      };
    });
  };

  addHours(numOfHours, startDate) {
    var oldDateObj = new Date(startDate);
    var newDateObj = new Date(startDate);
    newDateObj.setTime(oldDateObj.getTime() + numOfHours * 60 * 60 * 1000);
    return newDateObj;
  }

  onChangeEventEndDate = (e) => {
    const endDate = this.addHours(
      parseInt(e.target.value),
      this.state.event.startDate
    );
    this.setState((prev) => {
      return {
        ...prev,
        event: {
          ...prev.event,
          endDate: String(endDate),
          duration: e.target.value * 60,
        },
      };
    });
  };

  logout = () => {
    this.props.logOut();
    this.interval = setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  handleExperienceModal = () => {
    this.setState((prev) => {
      return {
        ...prev,
        showExperienceModal: !prev.showExperienceModal,
      };
    });
  };

  handleEducationModal = () => {
    this.setState((prev) => {
      return {
        ...prev,
        showEducationModal: !prev.showEducationModal,
      };
    });
  };

  dateFormat = (date) => {
    let x = new Date(date);
    return (
      x.toLocaleString("default", { month: "short" }) + " " + x.getFullYear()
    );
  };

  handleBookingDropdown = () => {
    this.bookingref.current.classList.toggle("hidden");
  };

  render() {
    const {
      showExperienceModal,
      showEducationModal,
      dropDownItems,
      dropDownItem,
    } = this.state;
    const { mentor } = this.props;
    const NavItems = () => {
      switch (this.state.NavItem) {
        case 1:
          return (
            <>
              <div className="gap-y-3">
                <p className="font-Helvetica font-normal text-[#273150] sm:py-5 pb-0 lg:text-xl md:text-lg sm:text-md text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi.”
                </p>
                <hr className="bg-[#F2F2F2] mt-3 py-[0.2px] rounded w-full" />
                <div className="flex-col  gap-y-2 mt-3">
                  <div className="flex w-full justify-between items-center">
                    <h1 className="text-[#565656] font-semibold font-poppins lg:text-xl md:text-lg sm:text-md text-sm">
                      Experience
                    </h1>
                    {this.props.isEdit && (
                      <div className="flex items-center justify-center gap-x-5">
                        <img
                          src={plus}
                          alt="+"
                          title="Add"
                          className="cursor-pointer"
                          onClick={this.handleExperienceModal}
                        />
                        <img
                          src={pencil}
                          alt="edit"
                          title="Edit"
                          className="cursor-pointer"
                          onClick={this.handleExperienceModal}
                        />
                      </div>
                    )}
                  </div>

                  {mentor.companies &&
                    mentor.companies.length !== 0 &&
                    mentor.companies.map((company, index) => (
                      <div className="flex items-center mt-2" key={company._id}>
                        <img
                          src={
                            company.company?.image_url ||
                            `https://ui-avatars.com/api/?name=${company.company?.name}&bold=true&rounded=true&background=8f6ec5`
                          }
                          loading="lazy"
                          alt="C"
                          className="w-[50px] h-[38px]"
                        />
                        <div className="flex-col text-left items-center px-3">
                          <p className="lg:text-[18px] md:text-lg sm:text-md text-sm font-semibold text-[#565656] font-poppins">
                            {company.job_title}
                          </p>
                          <p className="font-poppins font-normal text-[#797979] text-[12px] text-sm">
                            {company.company?.name} |{" "}
                            {this.dateFormat(company.start_date)} -{" "}
                            {this.dateFormat(company.end_date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  <hr className="bg-[#F2F2F2] mt-3 py-[0.2px] rounded w-full" />
                </div>

                <div className="grid gap-y-2 my-2">
                  <div className="flex w-full justify-between items-center">
                    <h1 className="text-[#565656] font-semibold font-poppins lg:text-xl md:text-lg sm:text-md text-sm">
                      Education
                    </h1>
                    {this.props.isEdit && (
                      <div className="flex items-center justify-center gap-x-5">
                        <img
                          src={plus}
                          alt="+"
                          title="Add"
                          className="cursor-pointer"
                          onClick={this.handleEducationModal}
                        />
                        <img
                          src={pencil}
                          alt="edit"
                          title="Edit"
                          className="cursor-pointer"
                          onClick={this.handleEducationModal}
                        />
                      </div>
                    )}
                  </div>
                  {mentor.colleges &&
                    mentor.colleges.length !== 0 &&
                    mentor.colleges.map((college, index) => (
                      <div className="flex items-center" key={college._id}>
                        <img
                          src={college.college.image_url}
                          loading="lazy"
                          alt="ProfileImage"
                          className="w-[38px] h-[38px]"
                        />
                        <div className="flex-col text-left items-center px-3">
                          <p className="lg:text-[18px] md:text-lg sm:text-md text-sm font-semibold text-[#565656] font-poppins">
                            {college.degree}
                          </p>
                          <p className="font-poppins font-normal text-[#797979] text-[12px] text-sm">
                            {college.college.name} |{" "}
                            {this.dateFormat(college.start_date)} -{" "}
                            {this.dateFormat(college.end_date)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <hr className="bg-[#F2F2F2] mt-3 py-[0.2px] rounded w-full" />
                <div className="grid gap-y-2 my-2">
                  <h1 className="text-[#565656] font-semibold font-poppins lg:text-xl md:text-lg sm:text-md text-sm">
                    Expertise
                  </h1>
                  <div className="flex gap-x-3 items-center font-Helvetica font-bold text-[12px]">
                    <span
                      className="text-[#8F6EC5] rounded-md p-1 px-2"
                      style={{ background: "rgba(212, 195, 240, 0.5)" }}
                    >
                      Research
                    </span>
                    <span
                      className="text-[#F4864D] rounded-md p-1 px-2"
                      style={{ background: "rgba(251, 227, 215, 0.5)" }}
                    >
                      Prototyping
                    </span>
                    <span
                      className="text-[#29ACE4] rounded-md p-1 px-2"
                      style={{ background: "rgba(180,229,250, 0.5)" }}
                    >
                      Testing
                    </span>
                  </div>
                </div>
              </div>
            </>
          );
        case 2:
          return (
            <>
              <div className="flex-col px-2">
                <div className="flex relative items-start w-full inline-block text-left">
                  <div
                    className="flex gap-x-10 items-center"
                    onClick={this.handleBookingDropdown}
                  >
                    <p className="text-[20px] font-poppins font-medium py-1">
                      {dropDownItems[dropDownItem - 1]} Sessions
                    </p>
                    <img src={downarrow} alt="arrow" />
                  </div>
                  <div
                    ref={this.bookingref}
                    className="hidden absolute flex bg-white left-44 text-base list-none"
                    id="dropdown"
                  >
                    <div className="flex-col w-[178px] shadow-lg justify-between items-center py-1 text-[14px] font-medium">
                      <div
                        onClick={() => this.setState({ dropDownItem: 1 })}
                        className="flex  cursor-pointer hover:bg-[#8f6ec530] items-center justify-start p-1 px-4"
                      >
                        All
                      </div>
                      <div
                        onClick={() => this.setState({ dropDownItem: 2 })}
                        className="flex cursor-pointer items-center hover:bg-[#8f6ec530] justify-start p-1 px-4"
                      >
                        Upcoming
                      </div>
                      <div
                        onClick={() => this.setState({ dropDownItem: 3 })}
                        className="flex cursor-pointer items-center hover:bg-[#8f6ec530] justify-start p-1 px-4"
                      >
                        Past
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-col py-4">
                  <p className="text-[#8f6ec5] pb-2 font-bold sm:text-[16px]">
                    Friday, 18th June,2022 I 10:30 am
                  </p>
                  <hr className="max-w-[500px] py-[1px] text-[##E4E4E4]" />
                  <div className="flex items-center py-2">
                    <img
                      loading="lazy"
                      className="w-12 h-12 rounded-full shadow-lg overflow-hidden"
                      src={mentor.profile_picture}
                      alt="profile"
                    />
                    <div className="flex-col px-6 text-left">
                      <h5 className="sm:text-[16px] font-Manrope font-bold text-[#3e3e3e]">
                        Garvit Goswami
                      </h5>
                      <h5 className="font-medium font-Manrope text-[#888585]">
                        Microsoft
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        case 3:
          return <>{/* <EventCards events={PastEvents}/> */}</>;
        default:
          return <></>;
      }
    };
    return (
      <div className="flex flex-col overflow-hidden pb-10">
        <LoginModal
          onChangeEventSumary={this.onChangeEventSumary}
          onChangeEventEndDate={this.onChangeEventEndDate}
          handleUpdateCalender={this.handleUpdateCalender}
          event={this.state.event}
          mentor={mentor}
          isBooking={true}
        />
        <div>
          {showExperienceModal && (
            <ExperienceModal
              handleExperienceModal={this.handleExperienceModal}
              mentor={mentor}
            />
          )}
          {showEducationModal && (
            <EducationModal
              handleEducationModal={this.handleEducationModal}
              mentor={mentor}
            />
          )}
          <img
            src={profiledesigns}
            alt="bg"
            className=" w-full"
            loading="lazy"
          />
        </div>
        <div className="flex-col justify-left -mt-16 sm:mx-2 lg:mx-24 md:mx-8  mx-5">
          <div className="flex  items-center">
            {Object.keys(mentor).length !== 0 && (
              <img
                src={mentor.profile_picture}
                loading="lazy"
                alt="mentor"
                className="rounded-full border-solid border-white w-24 h-24 sm:w-44 sm:h-44 md:w-52 md:h-52 border-8 sm:-mt-5 mt-5"
              />
            )}
            <div className="flex-col pt-10 sm:pt-8 text-left items-center sm:pl-10 pl-3">
              <p className="sm:text-[32px] text-[20px] font-bold text-[#797979] font-poppins pt-1">
                {mentor.name}
              </p>
              <p className="font-poppins font-normal text-[#797979] sm:text-[16px] text-[10px]">
                {mentor.companies &&
                  mentor.companies.length !== 0 &&
                  mentor.companies[0].description}
              </p>
            </div>
          </div>
          <div className="flex-col sm:mt-10">
            <div className="flex-col w-full sm:py-5 py-2">
              <div className="flex font-poppins sm:gap-x-16 gap-x-4 py-2 sm:pb-3">
                <p
                  onClick={() => this.setState({ NavItem: 1 })}
                  className={`cursor-pointer font-semibold font-poppins lg:text-[24px] sm:text-[20px] text-lg ${
                    this.state.NavItem === 1
                      ? "text-[#8f6ec5]"
                      : "text-[#8c8c8c]"
                  } pr-1`}
                >
                  Profile
                </p>
                <p
                  onClick={() => this.setState({ NavItem: 2 })}
                  className={`cursor-pointer font-semibold font-poppins lg:text-[24px] sm:text-[20px] text-lg ${
                    this.state.NavItem === 2
                      ? "text-[#8f6ec5]"
                      : "text-[#8c8c8c]"
                  } pr-1`}
                >
                  Sessions
                </p>
                <p
                  onClick={() => this.setState({ NavItem: 3 })}
                  className={`cursor-pointer font-semibold font-poppins lg:text-[24px] sm:text-[20px] text-lg ${
                    this.state.NavItem === 3
                      ? "text-[#8f6ec5]"
                      : "text-[#8c8c8c]"
                  } pr-1`}
                >
                  Testimonials
                </p>
              </div>
              {this.state.NavItem === 1 && (
                <div className="flex">
                  <hr className="lg:w-[8%] sm:w-[12%] w-[16%] rounded bg-[#8f6ec5] sm:py-[2px] py-[1px]" />
                  <hr className="lg:w-full rounded-r bg-[#f2f2f2] py-[1px]" />
                </div>
              )}
              {this.state.NavItem === 2 && (
                <div className="flex">
                  <hr className="lg:w-[12%] sm:w-[22%] w-[39%]  rounded bg-[#f2f2f2] py-[1px]" />
                  <hr className="lg:w-[13%] sm:w-[27%] w-[50%] rounded bg-[#8f6ec5] sm:py-[2px] py-[1px]" />
                  <hr className="w-full rounded bg-[#f2f2f2] py-[1px]" />
                </div>
              )}
              {this.state.NavItem === 3 && (
                <div className="flex w-full">
                  <hr className="lg:w-[36%] sm:w-[37%] w-[50%] rounded bg-[#f2f2f2] py-[1px]" />
                  <hr className="lg:w-[23%] sm:w-[23%] w-[37%] rounded bg-[#8f6ec5] sm:py-[2px] py-[1px]" />
                  <hr className="lg:w-full sm:w-[30%] rounded bg-[#f2f2f2] py-[1px]" />
                </div>
              )}
            </div>
            <div className="grid md:grid-cols-2">
              <>{<NavItems />}</>
              {!this.props.isEdit && (
                <div className="pt-5 sm:p-0">
                  <Slots
                    formatDate={this.formatDate}
                    onChangeEventStartDate={this.onChangeEventStartDate}
                    onChangeEventStartTime={this.onChangeEventStartTime}
                    startDates={this.state.StartDates}
                    availableDates={this.state.availableDates}
                    event={this.state.event}
                    currentStartTimeIndex={this.state.currentStartTimeIndex}
                    currentStartDateIndex={this.state.currentStartDateIndex}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ booking, Login, Mentor }) => {
  return {
    isLoggedIn: Login.isLoggedIn,
    mentor: Mentor.MentorDetails,
    Usertype: Login.userType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginModal: (data) => dispatch(UpdateLoginModal(data)),
    logOut: () => dispatch(logOut()),
    updateCalenderEventRequested: (data) =>
      dispatch(updateCalenderEventRequested(data)),
    fetchMentorDetailsRequested: (data) =>
      dispatch(fetchMentorDetailsRequested(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
