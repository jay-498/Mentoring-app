import React, { Component } from "react";
import profiledesigns from "../../assets/images/design/profiledesigns.png";
import plus from "../../assets/images/svgs/plus.png";
import pencil from "../../assets/images/svgs/pencil.png";
import cross from "../../assets/images/svgs/cross.png";
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
import {
  fetchMentorDetailsRequested,
  updateMentorExperienceRequested,
} from "../../store/actions/Mentor";
import DeleteModal from "./DeleteModal";
import DescriptionTextArea from "./DescriptionTextArea";
import ExpertiseModal from "./ExpertiseModal";
import Calender from "../calender";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.bookingref = React.createRef();
    this.state = {
      showAddExperienceModal: false,
      showAddEducationModal: false,
      showEditExperienceModal: false,
      showEditEducationModal: false,
      showExperienceDeleteModal: false,
      showEducationDeleteModal: false,
      showExpertiseModal: false,
      availableDates: [],
      currentEditCollege: {},
      currentEditCompany: {},
      NavItem: 1,
      dropDownItem: 1,
      dropDownItems: ["All", "Upcoming", "Past"],
      currentStartDateIndex: 0,
      currentStartTimeIndex: 0,
      description: "",
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
    if (!this.props.isEdit) {
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.mentor !== this.props.mentor) {
      this.setState((prev) => {
        return {
          ...prev,
          showAddEducationModal: false,
          showAddExperienceModal: false,
          showEditEducationModal: false,
          showEditExperienceModal: false,
          showExperienceDeleteModal: false,
          showEducationDeleteModal: false,
          showExpertiseModal: false,
        };
      });
    }
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
    var dateParts = date.split("/");
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
        showAddExperienceModal: !prev.showAddExperienceModal,
      };
    });
  };

  handleEducationModal = () => {
    this.setState((prev) => {
      return {
        ...prev,
        showAddEducationModal: !prev.showAddEducationModal,
      };
    });
  };

  handleEditExperienceModal(company) {
    this.setState((prev) => {
      return {
        ...prev,
        showEditExperienceModal: !prev.showEditExperienceModal,
        currentEditCompany: { ...company },
      };
    });
  }

  handleEditEducationModal(college) {
    this.setState((prev) => {
      return {
        ...prev,
        showEditEducationModal: !prev.showEditEducationModal,
        currentEditCollege: { ...college },
      };
    });
  }

  dateFormat = (date) => {
    let x = new Date(date);
    return (
      x.toLocaleString("default", { month: "short" }) + " " + x.getFullYear()
    );
  };

  handleBookingDropdown = () => {
    this.bookingref.current.classList.toggle("hidden");
  };

  handleSubmitDeleteExperience = () => {
    const { companies } = this.props.mentor;
    //removing the company
    const modifiedCompanies = companies.filter(
      (company) => company._id !== this.state.currentEditCompany._id
    );
    //replacing the company with company id
    const modified_Companies = modifiedCompanies.map((company) => {
      return { ...company, company: company.company._id };
    });
    this.props.updateMentorExperienceRequested({
      companies: [...modified_Companies],
    });
    // this.props.handleExperienceModal();
  };

  handleSubmitDeleteEducation = () => {
    const { colleges } = this.props.mentor;
    //removing the college from the array
    const modifiedColleges = colleges.filter(
      (college) => college._id !== this.state.currentEditCollege._id
    );
    //replacing the college with college id
    const modified_Colleges = modifiedColleges.map((college) => {
      return { ...college, college: college.college._id };
    });
    this.props.updateMentorExperienceRequested({
      colleges: [...modified_Colleges],
    });
    // this.props.handleEducationModal();
  };

  render() {
    const {
      showAddExperienceModal,
      showAddEducationModal,
      showEditExperienceModal,
      showEditEducationModal,
      showExperienceDeleteModal,
      showEducationDeleteModal,
      currentEditCollege,
      currentEditCompany,
      dropDownItems,
      dropDownItem,
      showExpertiseModal,
    } = this.state;
    const { mentor } = this.props;
    const NavItems = () => {
      switch (this.state.NavItem) {
        case 1:
          return (
            <>
              <div className="gap-y-3">
                <DescriptionTextArea
                  isEdit={this.props.isEdit}
                  description={mentor.description}
                />
                <hr className="bg-[#F2F2F2] mt-3 py-[0.2px] rounded w-full" />
                <div className="flex-col  gap-y-2 mt-3">
                  <div className="flex w-full justify-between items-center">
                    <h1 className="text-[#565656] font-semibold font-poppins lg:text-xl md:text-lg sm:text-md text-sm">
                      Experience
                    </h1>
                    {this.props.isEdit && (
                      <div
                        onClick={this.handleExperienceModal}
                        className="flex cursor-pointer hover:bg-gray-200 p-2 rounded-full items-center justify-center gap-x-5"
                      >
                        <img src={plus} alt="+" title="Add" />
                      </div>
                    )}
                  </div>

                  {mentor.companies &&
                    mentor.companies.length !== 0 &&
                    mentor.companies.map((company, index) => (
                      <div
                        className="flex justify-between items-center mt-2"
                        key={company._id}
                      >
                        <div className="flex">
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
                              {company.end_date
                                ? this.dateFormat(company.end_date)
                                : "Present"}
                            </p>
                          </div>
                        </div>
                        <div>
                          {this.props.isEdit && (
                            <div
                              onClick={() =>
                                this.handleEditExperienceModal(company)
                              }
                              className="flex cursor-pointer hover:bg-gray-200 rounded-full p-2 items-center justify-center gap-x-5"
                            >
                              <img src={pencil} alt="edit" title="Edit" />
                            </div>
                          )}
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
                      <div
                        onClick={this.handleEducationModal}
                        className="flex cursor-pointer hover:bg-gray-200 rounded-full p-2 items-center justify-center gap-x-5"
                      >
                        <img src={plus} alt="+" title="Add" />
                      </div>
                    )}
                  </div>
                  {mentor.colleges &&
                    mentor.colleges.length !== 0 &&
                    mentor.colleges.map((college, index) => (
                      <div
                        className="flex justify-between items-center"
                        key={college._id}
                      >
                        <div className="flex">
                          <img
                            src={
                              college.college.image_url ||
                              `https://ui-avatars.com/api/?name=${college.college?.name}&bold=true&rounded=true&background=8f6ec5`
                            }
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
                              {college.end_date
                                ? this.dateFormat(college.end_date)
                                : "Present"}
                            </p>
                          </div>
                        </div>
                        <div>
                          {this.props.isEdit && (
                            <div
                              onClick={() =>
                                this.handleEditEducationModal(college)
                              }
                              className="flex cursor-pointer hover:bg-gray-200 rounded-full p-2 items-center justify-center gap-x-5"
                            >
                              <img src={pencil} alt="edit" title="Edit" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                <hr className="bg-[#F2F2F2] mt-3 py-[0.2px] rounded w-full" />
                <div className="grid gap-y-2 my-2">
                  <div className="flex w-full justify-between items-center">
                    <h1 className="text-[#565656] font-semibold font-poppins lg:text-xl md:text-lg sm:text-md text-sm">
                      Expertise
                    </h1>
                    {this.props.isEdit && (
                      <div
                        onClick={() =>
                          this.setState({ showExpertiseModal: true })
                        }
                        className="flex cursor-pointer hover:bg-gray-200 rounded-full p-2 items-center justify-center gap-x-5"
                      >
                        <img src={pencil} alt="+" title="Add" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-x-3 items-center font-Helvetica font-bold text-[12px]">
                    {mentor.tags &&
                      mentor?.tags?.length !== 0 &&
                      mentor.tags.map((tag) => (
                        <span
                          key={tag._id}
                          className="text-[#8F6EC5] rounded-md p-1 px-2"
                          style={{ background: "rgba(212, 195, 240, 0.5)" }}
                        >
                          {tag.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </>
          );
        case 2:
          return (
            <>
              <div className="flex-col px-2">
                <div className="flex relative items-start w-full inline-block text-left"></div>
                <div className="flex-col py-4">
                  <Calender
                    mentor_id={mentor._id}
                    availableDates={this.state.availableDates}
                  />
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
          availableDates={this.state.availableDates}
        />
        <div>
          {showExperienceDeleteModal && (
            <DeleteModal
              handleSubmitDelete={this.handleSubmitDeleteExperience}
              handleDeleteModal={() =>
                this.setState({ showExperienceDeleteModal: false })
              }
            />
          )}
          {showEducationDeleteModal && (
            <DeleteModal
              handleSubmitDelete={this.handleSubmitDeleteEducation}
              handleDeleteModal={() =>
                this.setState({ showEducationDeleteModal: false })
              }
            />
          )}
          {showAddExperienceModal && (
            <ExperienceModal
              handleExperienceModal={this.handleExperienceModal}
              mentor={mentor}
              isEdit={false}
            />
          )}
          {showAddEducationModal && (
            <EducationModal
              handleEducationModal={this.handleEducationModal}
              mentor={mentor}
              isEdit={false}
            />
          )}
          {showEditExperienceModal && (
            <ExperienceModal
              handleExperienceModal={() =>
                this.setState({ showEditExperienceModal: false })
              }
              mentor={mentor}
              handleDeleteModal={() =>
                this.setState({ showExperienceDeleteModal: true })
              }
              isEdit={true}
              company={currentEditCompany}
            />
          )}
          {showEditEducationModal && (
            <EducationModal
              handleEducationModal={() =>
                this.setState({ showEditEducationModal: false })
              }
              handleDeleteModal={() =>
                this.setState({ showEducationDeleteModal: true })
              }
              mentor={mentor}
              isEdit={true}
              college={currentEditCollege}
            />
          )}
          {showExpertiseModal && (
            <ExpertiseModal
              mentor={mentor}
              isEdit={true}
              handleExpertiseModal={() =>
                this.setState({ showExpertiseModal: false })
              }
            />
          )}
          <img
            src={profiledesigns}
            alt="bg"
            className=" w-full"
            loading="lazy"
          />
        </div>
        <div className="flex-col justify-left -mt-16 sm:mx-5 lg:mx-24 md:mx-8 mx-3">
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
            <div className="flex-col items-center justify-center w-full sm:py-5 sm:py-2 py-3">
              <div className="flex font-poppins sm:gap-x-16 gap-x-4 py-1  sm:pb-3">
                <div className="flex-col relative">
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
                  {this.state.NavItem === 1 && (
                    <hr className="absolute z-10 w-full sm:my-2 my-1 rounded bg-[#8f6ec5] sm:py-[2px] py-[1px]" />
                  )}
                </div>
                {this.props.isEdit && (
                  <div className="flex-col relative">
                    <p
                      onClick={() => this.setState({ NavItem: 2 })}
                      className={`cursor-pointer font-semibold font-poppins lg:text-[24px] sm:text-[20px] text-lg ${
                        this.state.NavItem === 2
                          ? "text-[#8f6ec5]"
                          : "text-[#8c8c8c]"
                      } pr-1`}
                    >
                      Slots
                    </p>
                    {this.state.NavItem === 2 && (
                      <hr className="absolute z-10 w-full sm:my-2 my-1 rounded bg-[#8f6ec5] sm:py-[2px] py-[1px]" />
                    )}
                  </div>
                )}
                <div className="flex-col relative">
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
                  {this.state.NavItem === 3 && (
                    <hr className="absolute z-10 w-full sm:my-2 my-1 rounded bg-[#8f6ec5] sm:py-[2px] py-[1px]" />
                  )}
                </div>
              </div>
              <hr className="w-full  rounded-r bg-[#f2f2f2] py-[1px] sm:py-[2px]" />
            </div>
            {this.props.isEdit ? (
              <div>
                <>{<NavItems />}</>
              </div>
            ) : (
              <div className="grid md:grid-cols-2">
                <>{<NavItems />}</>
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
              </div>
            )}
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
    updateMentorExperienceRequested: (data) =>
      dispatch(updateMentorExperienceRequested(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
