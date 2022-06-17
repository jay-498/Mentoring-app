import React, { Component } from "react";
import search from "../../assets/images/design/Search.png";
import menuopen2 from "../../assets/svgs/menuopen3.svg";
import menuclose from "../../assets/svgs/menuclose.svg";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { logOut } from "../../store/actions/Login";
import { UpdateLoginModal } from "../../store/actions/booking";
import RoundedUser from "./RoundedNav";
import { mentorAvailability } from "../../services/booking.service";
import MyBookings from "../bookings/MyBookings";
class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      navbarOpen: false,
      searchQuery: "",
    };
  }

  onChangeNavbar = () => {
    this.setState((prev) => {
      return {
        ...prev.state,
        navbarOpen: !prev.navbarOpen,
      };
    });
  };

  onChangeSearchQuery = (e) => {
    this.setState((prev) => {
      return {
        ...prev,
        searchQuery: e.target.value,
      };
    });
  };

  onKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.navigate(`/search?mentor=${this.state.searchQuery}`);
    }
  };

  render() {
    const { pathname } = this.props.location;
    return (
      <>
        <MyBookings />
        <nav
          className={`relative flex flex-wrap md:px-20 px-5 items-center ${
            pathname === "/" ? "bg-[#FFE8EB]" : "bg-[#fafafa]"
          } justify-between`}
        >
          <div className="flex w-full md:w-0  items-center">
            <div className="flex w-full relative justify-between items-center">
              <div>
                <a
                  className="text-[28px] font-semibold font-poppins leading-relaxed inline-block py-2  text-gray"
                  href="#pablo"
                >
                  Menteezy
                </a>
              </div>

              <div className="flex justify-center items-center lg:hidden">
                {this.props.isLoggedIn && (
                  <div className="justify-center mx-2 items-center cursor-pointer rounded-full p-[3px] border-[1px] border-[#8f6ec5]">
                    <RoundedUser logOut={() => this.props.logOut()} />
                  </div>
                )}
                <button
                  className="cursor-pointer text-xl leading-none px-3 py-1 rounded block outline-none focus:outline-none"
                  type="button"
                  onClick={() => this.onChangeNavbar()}
                >
                  <img
                    src={this.state.navbarOpen ? menuclose : menuopen2}
                    alt="menuopen"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            className={
              "lg:flex items-center justify-start xs:flex-col " +
              (this.state.navbarOpen ? "flex-col absolute top-16" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col md:flex-row list-none gap-x-8">
              <li className="nav-item">
                <a
                  className="sm:px-3 py-2 flex items-center text-[18px] leading-snug text-gray"
                  href="/#casecompendium"
                >
                  <span
                    className={`sm:ml-2 ${
                      this.props.location === "/"
                        ? "text-[#A36EBA]"
                        : "text-[#999FAE]"
                    } font-normal font-Helvetica hover:text-[#A36EBA]`}
                  >
                    Case Compendium
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="sm:px-3 py-2 flex items-center text-[18px] leading-snug text-gray"
                  href="/#companies"
                >
                  <span
                    className={`sm:ml-2 ${
                      this.props.location === "/about"
                        ? "text-[#A36EBA]"
                        : "text-[#999FAE]"
                    } font-normal font-Helvetica hover:text-[#A36EBA]`}
                  >
                    Companies
                  </span>
                </a>
              </li>
            </ul>
            <div
              className={
                "flex rounded justify-center items-center sm:my-4 my-1 sm:pl-10"
              }
              id="example-navbar-danger"
            >
              <div className="rounded relative  md:mr-0">
                <div
                  className="flex absolute inset-y-0 left-0 items-center pl-3 pt-1 
              pointer-events-none"
                >
                  <img
                    src={search}
                    alt="search"
                    className="w-5 h-5 opacity-40"
                    loading="lazy"
                  />
                </div>
                <input
                  type="text"
                  id="email-adress-icon"
                  className="block p-2 pl-10 sm:w-[417px] outline-none h-10 text-[#999FAE] placeholder:font-normal placeholder:text-[16px] 
                    placeholder:text-[#999FAE] rounded-[5px] placeholder:tracking-[-0.04em]"
                  placeholder="Search"
                  value={this.state.searchQuery}
                  onChange={this.onChangeSearchQuery}
                  onKeyPress={this.onKeyPress}
                  style={{ backgroundColor: "rgba(114, 114, 114,0.1)" }}
                />
              </div>
              {this.props.isLoggedIn ? (
                <div className="flex hidden lg:block justify-center items-center ml-6 cursor-pointer rounded-full p-[3px] border-[1px] border-[#8f6ec5]">
                  <RoundedUser logOut={() => this.props.logOut()} />
                </div>
              ) : (
                <div className="relative lg:ml-6 ml-2 md:mr-0">
                  <button
                    className="bg-[#8F6EC5] text-[18px] h-[40px] text-center font-Helvetica 
                text-white font-bold py-2 w-[100px] rounded-[5px]"
                    onClick={() => this.props.updateLoginModal(true)}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </>
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
    updateLoginModal: (data) => dispatch(UpdateLoginModal(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
