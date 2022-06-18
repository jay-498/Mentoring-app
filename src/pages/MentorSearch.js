import React, { Component } from "react";
import CarouselDiscover from "../components/main/CarouselDiscover";
import facebook from "../assets/images/icons/facebook.png";
import instagram from "../assets/images/icons/Instagram.png";
import linkedin from "../assets/images/icons/linkedin.png";
import twitter from "../assets/images/icons/twitter.png";
import youtube from "../assets/images/icons/youtube.png";
import { connect } from "react-redux";
import { withRouter } from "../utils/withRouter";
import { logOut } from "../store/actions/Login";
import { mentorSearch } from "../services/booking.service";
import MyBookings from "../components/bookings/MyBookings";
import LoginModal from "../components/profile/LoginModal";
class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      search: "",
      query: "",
      isEmailValid: false,
      mentorDetails: [],
    };
  }

  componentDidMount() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const query = params.get("mentor");
    this.fetchMentorDetails(query);
  }

  componentDidUpdate(prevProps) {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const query = params.get("mentor");
    console.log("check");
    if (this.state.query !== query) {
      this.fetchMentorDetails(query);
    }
  }

  fetchMentorDetails(query) {
    mentorSearch(query)
      .then((res) => {
        this.setState((prevState) => ({
          ...prevState,
          query,
          mentorDetails: res.data.data,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (e) => {
    this.setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    if (e.target.name === "email") {
      this.setState((prev) => {
        return {
          ...prev,
          isEmailValid:
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              e.target.value
            ) === true,
        };
      });
    }
  };

  render() {
    return (
      <div className="flex-col mx-auto">
        <div className="flex-col">
          <div className="flex-col lg:mx-10 sm:mx-6 mx-2">
            <CarouselDiscover
              isSlider={false}
              mentorDetails={this.state.mentorDetails}
            />
          </div>
        </div>

        <div className="flex flex-col lg:p-10 p-5 bg-[#F9EFFD]">
          <div className="flex flex-col lg:mx-36 mx-5">
            <h1 className="text-[#939EA4] text-[14px] font-medium font-Roboto sm:pb-14 pb-7">
              Your company
            </h1>
            <hr style={{ backgroundColor: "#CDD1D4", height: "1px" }} />
            <div className="sm:flex flex-col">
              <div className="flex-col sm:flex">
                <ul className="flex list-none lg:mr-auto">
                  <li>
                    <a
                      className="py-2 flex items-center font-bold leading-snug text-gray hover:opacity-75"
                      href="#pablo"
                    >
                      <span className="font-normal text-[#929ECC] font-Roboto text-[14px]">
                        Home
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="px-5 py-2 flex items-center font-bold leading-snug text-gray hover:opacity-75"
                      href="#pablo"
                    >
                      <span className="ml-5 font-normal text-[#929ECC] font-Roboto text-[14px]">
                        About
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="px-3 py-2 flex items-center font-bold leading-snug text-gray hover:opacity-75"
                      href="#pablo"
                    >
                      <span className="ml-2 font-normal text-[#929ECC] font-Roboto text-[14px]">
                        Contact
                      </span>
                    </a>
                  </li>
                </ul>
                <ul className="flex list-none lg:ml-auto">
                  <li className="flex items-center justify-center">
                    <a
                      className="py-2  font-bold leading-snug text-gray hover:opacity-75"
                      href="#pablo"
                    >
                      <img
                        alt="facebook"
                        src={facebook}
                        className="w-4 h-4"
                        loading="lazy"
                      />
                    </a>
                  </li>
                  <li className="flex items-center justify-center">
                    <a
                      className="px-5 py-2  font-bold leading-snug text-gray hover:opacity-75"
                      href="#pablo"
                    >
                      <img
                        alt="linkedin"
                        src={linkedin}
                        className="w-4 h-4"
                        loading="lazy"
                      />
                    </a>
                  </li>
                  <li className="flex items-center justify-center">
                    <a
                      className="px-3 py-2  font-bold leading-snug text-gray hover:opacity-75"
                      href="#pablo"
                    >
                      <img
                        alt="twitter"
                        src={twitter}
                        className="w-4 h-4"
                        loading="lazy"
                      />
                    </a>
                  </li>
                  <li className="flex items-center justify-center">
                    <a
                      className="px-3 py-2  font-bold leading-snug text-gray hover:opacity-75"
                      href="#pablo"
                    >
                      <img
                        alt="youtube"
                        src={youtube}
                        className="w-4 h-4"
                        loading="lazy"
                      />
                    </a>
                  </li>
                  <li className="flex items-center justify-center">
                    <a
                      className="px-3 py-2 font-bold leading-snug text-gray hover:opacity-75"
                      href="#pablo"
                    >
                      <img
                        loading="lazy"
                        alt="instagram"
                        src={instagram}
                        className="w-4 h-4"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-col sm:py-10 py-5">
          <div className="flex flex-col sm:mx-20 mx-10">
            <p className="text-slate-400 text-xl font-normal font-Helvetica text-center">
              © 2020. All rights reserved
            </p>
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
    logOut: () => dispatch(logOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomePage));
