import React, { Component } from "react";
import profiledesigns from "../../assets/images/design/profiledesigns.png";
import Slots from "./Slots";
import { withRouter } from "../../utils/withRouter";
import mainService from "../../services/main.service";
import { UpdateLoginModal } from "../../store/actions/booking";
import { connect } from "react-redux";
import LoginModal from "./LoginModal";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentor: {},
    };
  }
  componentDidMount() {
    const id = this.props.params.id;
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
  }

  render() {
    const { mentor } = this.state;
    return (
      <div className="flex flex-col overflow-hidden pb-10">
        <LoginModal />
        <div>
          <img src={profiledesigns} alt="bg" className="w-full" />
        </div>
        <div className="flex-col justify-left -mt-16 mx-5 sm:mx-10 lg:mx-40 md:mx-16">
          <div className="sm:flex  items-center">
            <img
              src={mentor.profile_picture}
              alt="ProfileImage"
              className="rounded-full border-solid border-white w-24 h-24 sm:w-44 sm:h-44 md:w-52 md:h-52 border-8 sm:-mt-5 mt-4"
            />
            <div className="flex-col sm:pt-8 text-left items-center sm:pl-10">
              <p className="text-[32px] font-bold text-[#797979] font-poppins pt-1">
                {mentor.name}
              </p>
              <p className="font-poppins font-normal text-[#797979] text-[16px[">
                {mentor.companies &&
                  mentor.companies.length !== 0 &&
                  mentor.companies[0].description}
              </p>
            </div>
          </div>
          <div className="flex-col mt-10">
            <h1 className="text-[#5B6BD0] font-semibold font-poppins text-[24px]">
              Overview
            </h1>
            <div className="flex">
              <hr className="bg-[#5B6BD0] mt-3 py-[2px] rounded w-28" />
              <hr className="bg-[#F2F2F2] mt-3 py-[2px] rounded w-full" />
            </div>
            <div className="grid md:grid-cols-2">
              <div className="grid gap-y-3">
                <p className="font-Helvetica font-normal text-[#273150] py-5 lg:text-xl md:text-lg sm:text-md text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi.”
                </p>
                {mentor.companies &&
                  mentor.companies.length !== 0 &&
                  mentor.companies.map((company, index) => (
                    <div className="grid gap-y-2" key={company._id}>
                      <h1 className="text-[#565656] font-semibold font-poppins lg:text-xl md:text-lg sm:text-md text-sm">
                        Experience
                      </h1>
                      <div className="flex items-center mt-2">
                        <img
                          src={company.image_url}
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
                    </div>
                  ))}

                {mentor.colleges &&
                  mentor.colleges.length !== 0 &&
                  mentor.colleges.map((college, index) => (
                    <div className="grid gap-y-2" key={college._id}>
                      <h1 className="text-[#565656] font-semibold font-poppins lg:text-xl md:text-lg sm:text-md text-sm">
                        Education
                      </h1>
                      <div className="flex items-center mt-2">
                        <img
                          src={college.image_url}
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
                <div className="grid gap-y-2">
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

              <Slots />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginModal: (data) => {
      dispatch(UpdateLoginModal(data));
    },
  };
};

export default connect(mapDispatchToProps)(withRouter(Profile));
