import React, { Component } from "react";
import profiledesigns from "../../assets/images/design/profiledesigns.png";
import plus from "../../assets/images/svgs/plus.png";
import pencil from "../../assets/images/svgs/pencil.png";
import Slots from "./Slots";
import { withRouter } from "../../utils/withRouter";
import mainService from "../../services/main.service";
import { UpdateLoginModal } from "../../store/actions/booking";
import { connect } from "react-redux";
import LoginModal from "./LoginModal";
import { logOut } from "../../store/actions/Login";
import ExperienceModal from "./ExperienceModal";
import EducationModal from "./EducationModal";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExperienceModal : false,
      showEducationModal : false,
      mentor: {},
      StartDates: [
        {
          date: "Fri Jun 03 2022 8:00:00 GMT+0530 (India Standard Time)",
          times: [8 ,9 ,10 ,14, 16]
        },
        {
          date: "Sat Jun 04 2022 10:00:00 GMT+0530 (India Standard Time)",
          times: [10 ,9]
        },
        {
          date: "Sun Jun 05 2022 14:00:00 GMT+0530 (India Standard Time)",
          times: [14, 16, 20]
        },
        {
          date: "Mon Jun 06 2022 9:00:00 GMT+0530 (India Standard Time)",
          times: [9 ,10 ,14, 16]
        },
        {
          date: "Tue Jun 07 2022 8:00:00 GMT+0530 (India Standard Time)",
          times: [8 ,9 ,10, 20]
        }
      ],
      currentStartDateIndex : 0,
      currentStartTimeIndex : 0,
      event: {
        startDate: "",
        endDate : "",
        duration: "60",
        summary : "",
      }
    };
    this.onChangeEventStartDate= this.onChangeEventStartDate.bind(this);
    this.onChangeEventEndDate = this.onChangeEventEndDate.bind(this);
    this.onChangeEventSumary = this.onChangeEventSumary.bind(this);
    this.onChangeEventStartTime = this.onChangeEventStartTime.bind(this);
    this.addHours = this.addHours.bind(this);
  }
  componentDidMount() {
    const id = this.props.params.id;
    const search = window.location.search
    const params = new URLSearchParams(search);
    const modal = params.get('modal');
    const storageEvent = JSON.parse(localStorage.getItem('event'))
    if(modal==="true"){
     this.props.updateLoginModal(true);
     this.setState(prev=>{
       return{
         ...prev,
         event: {...storageEvent},
       }
     })
    }
    mainService
      .getMentorById(id)
      .then((response) => {
        let tempMentors = JSON.parse(JSON.stringify(response.data));
        this.setState((prevState) => ({
          ...prevState,
          mentor: tempMentors,
        }));
      })
      .catch((err) => console.log(err));
    this.onChangeEventStartDate(0);
  }

  onChangeEventStartDate=(index)=>{
    const {StartDates} = this.state;
    this.setState(prev=>{
      return{
        ...prev,
        currentStartDateIndex: index,
        event: {
          ...prev.event,
          startDate : (StartDates[index].date),
        }
      }
    })
  }

  onChangeEventStartTime=(timeIndex)=>{
    const {startDate} = this.state.event;
    const {StartDates,currentStartDateIndex} = this.state;
    const newStartDate = new Date(startDate);
    newStartDate.setHours(StartDates[currentStartDateIndex].times[timeIndex])
    this.setState(prev=>{
      return{
        ...prev,
        currentStartTimeIndex: timeIndex,
        event: {
          ...prev.event,
          startDate : String(newStartDate),
        }
      }
    })
  }

  onChangeEventSumary=(e)=>{
    this.setState(prev=>{
      return{
        ...prev,
        event: {
          ...prev.event,
          summary : e.target.value,
        }
      }
    })
  }

  addHours(numOfHours,startDate) {
    var oldDateObj = new Date(startDate);
    var newDateObj = new Date(startDate);
    newDateObj.setTime(oldDateObj.getTime() + (numOfHours*60* 60 * 1000));
    return newDateObj;
  }

  onChangeEventEndDate=(e)=>{
    const endDate = this.addHours(parseInt(e.target.value),this.state.event.startDate);
    this.setState(prev=>{
      return{
        ...prev,
        event: {
          ...prev.event,
          endDate: String(endDate),
          duration: (e.target.value*60),
        }
      }
    })
  }

  logout=()=>{
    this.props.logOut();
    this.interval = setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  handleExperienceModal=()=>{
    this.setState(prev=>{
      return{
          ...prev,
          showExperienceModal: !prev.showExperienceModal,
      }
    })
  }

  handleEducationModal=()=>{
    this.setState(prev=>{
      return{
          ...prev,
          showEducationModal: !prev.showEducationModal,
      }
    })
  }



  render() {
    const { mentor,showExperienceModal ,showEducationModal} = this.state;
    return (
      <div className="flex flex-col overflow-hidden pb-10">
        <LoginModal 
        onChangeEventSumary={this.onChangeEventSumary} 
        onChangeEventEndDate={this.onChangeEventEndDate}
        event={this.state.event}
        mentor={this.state.mentor}
        isBooking="true"/>
        <div>
        {showExperienceModal && <ExperienceModal handleExperienceModal={this.handleExperienceModal}/>}
        {showEducationModal && <EducationModal handleEducationModal={this.handleEducationModal}/>}
          <img src={profiledesigns} alt="bg" className=" w-full" loading="lazy"/>
          {this.props.isLoggedIn &&
          <div>
            <button onClick={this.logout} className="absolute right-10 top-3 bg-[#8F6EC5] text-white font-bold py-1 px-4 rounded">
                Logout
            </button>
          </div>
          }
        </div>
        <div className="flex-col justify-left -mt-16 mx-5 sm:mx-10 lg:mx-32 md:mx-16">
          <div className="flex  items-center">
            {Object.keys(mentor).length!==0 &&
            <img
              src={mentor.profile_picture}
              loading="lazy"
              alt="mentor"
              className="rounded-full border-solid border-white w-24 h-24 sm:w-44 sm:h-44 md:w-52 md:h-52 border-8 sm:-mt-5 mt-5"
            />
            }
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
          <div className="flex-col sm:mt-10 mt-7">
            <h1 className="text-[#5B6BD0] font-semibold font-poppins sm:text-[24px] text-[20px]">
              Overview
            </h1>
            <div className="flex">
              <hr className="bg-[#5B6BD0] mt-3 py-[2px] rounded w-28" />
              <hr className="bg-[#F2F2F2] mt-3 py-[2px] rounded w-full" />
            </div>
            <div className="grid md:grid-cols-2">
              <div className="gap-y-3">
                <p className="font-Helvetica font-normal text-[#273150] py-5 pb-0 lg:text-xl md:text-lg sm:text-md text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi.”
                </p>
                <hr className="bg-[#F2F2F2] mt-3 py-[0.2px] rounded w-full" />
                {console.log(mentor)}
                {mentor.companies &&
                  mentor.companies.length !== 0 &&
                  mentor.companies.map((company, index) => (
                    <div className="grid gap-y-2" key={company._id}>
                      <div className="flex w-full justify-between items-center"> 
                        <h1 className="text-[#565656] font-semibold font-poppins lg:text-xl md:text-lg sm:text-md text-sm">
                          Experience
                        </h1>
                        <div className="flex items-center justify-center gap-x-5">
                          <img src={plus} alt="+" title="Add" className="cursor-pointer" onClick={this.handleExperienceModal}/>
                          <img src={pencil} alt="edit" title="Edit" className="cursor-pointer" onClick={this.handleExperienceModal}/>
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <img
                          src={company.image_url}
                          loading="lazy"
                          alt="ProfileImage"
                          className="w-[38px] h-[38px]"
                        />
                        <div className="flex-col text-left items-center px-3">
                          <p className="lg:text-[18px] md:text-lg sm:text-md text-sm font-semibold text-[#565656] font-poppins">
                            {company.description}
                          </p>
                          <p className="font-poppins font-normal text-[#797979] text-[12px] text-sm">
                            {company.name}
                          </p>
                        </div>
                      </div>
                      <hr className="bg-[#F2F2F2] mt-3 py-[0.2px] rounded w-full" />
                    </div>
                  ))}


                {mentor.colleges &&
                  mentor.colleges.length !== 0 &&
                  mentor.colleges.map((college, index) => (
                    <div className="grid gap-y-2 my-2" key={college._id}>
                      <div className="flex w-full justify-between items-center"> 
                        <h1 className="text-[#565656] font-semibold font-poppins lg:text-xl md:text-lg sm:text-md text-sm">
                          Education
                        </h1>
                        <div className="flex items-center justify-center gap-x-5">
                          <img src={plus} alt="+" title="Add" className="cursor-pointer" onClick={this.handleEducationModal}/>
                          <img src={pencil} alt="edit" title="Edit" className="cursor-pointer" onClick={this.handleEducationModal}/>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <img
                          src={college.image_url}
                          loading="lazy"
                          alt="ProfileImage"
                          className="w-[38px] h-[38px]"
                        />
                        <div className="flex-col text-left items-center px-3">
                          <p className="lg:text-[18px] md:text-lg sm:text-md text-sm font-semibold text-[#565656] font-poppins">
                            {college.description}
                          </p>
                          <p className="font-poppins font-normal text-[#797979] text-[12px] text-sm">
                            {college.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
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
              <div className="pt-5 sm:p-0">
                  <Slots 
                  onChangeEventStartDate={this.onChangeEventStartDate}
                  onChangeEventStartTime={this.onChangeEventStartTime}
                  startDates={this.state.StartDates}
                  event={this.state.event}
                  currentStartTimeIndex={this.state.currentStartTimeIndex}
                  currentStartDateIndex={this.state.currentStartDateIndex}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ booking, Login }) => {
  return {
    isLoggedIn: Login.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginModal: (data) => dispatch(UpdateLoginModal(data)),
    logOut: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Profile));
