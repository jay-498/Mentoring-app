import React, { Component } from "react";
import { useState } from "react";
import menuopen from "../../assets/svgs/menuopen.svg";
import search from "../../assets/images/design/Search.png";
import menuopen2 from "../../assets/svgs/menuopen3.svg";
import menuclose from "../../assets/svgs/menuclose.svg";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { logOut } from "../../store/actions/Login";
import { UpdateLoginModal } from "../../store/actions/booking";

class Navbar extends Component {
  constructor(){
    super();
      this.state={
        navbarOpen: false,
        location: ""
      }
  }

  onChangeNavbar=()=>{
    this.setState(prev=>{
      return{
        ...prev.state,
        navbarOpen: !prev.navbarOpen
      }
    })
  }
  // const [navbarOpen, setNavbarOpen] = useState(false);
  // const location = useLocation().pathname;
  render(){
  return (
    <>
      <nav className="relative flex flex-wrap md:mx-20 mx-5 items-center justify-between py-3">
        <div className="flex flex-row w-full xl:w-0 items-center mr-auto">
          <div className="w-full relative flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start">
            <div>
              <a
                className="text-[28px] font-semibold font-poppins leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  text-gray"
                href="#pablo"
              >
                Menteezy
              </a>
            </div>
            <div>
              <button
                className="cursor-pointer text-xl leading-none px-3 py-1 rounded block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => this.onChangeNavbar()}
              >
                <img src={this.state.navbarOpen ? menuclose : menuopen2} alt="menuopen" loading="lazy"/>
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            "md:flex items-center justify-start xs:flex-col " +
            (this.state.navbarOpen ? "flex-col" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex-col md:flex-row list-none xl:ml-auto gap-x-8">
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-[18px] leading-snug text-gray"
                href="#casecompendium"
              >
                <span
                  className={`sm:ml-2 ${
                    this.state.location === "/" ? "text-[#A36EBA]" : "text-[#999FAE]"
                  } font-normal font-Helvetica hover:text-[#A36EBA]`}
                >
                  Case Compendium
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-[18px] leading-snug text-gray"
                href="#companies"
              >
                <span
                  className={`sm:ml-2 ${
                    this.state.location === "/about" ? "text-[#A36EBA]" : "text-[#999FAE]"
                  } font-normal font-Helvetica hover:text-[#A36EBA]`}
                >
                  Companies
                </span>
              </a>
            </li>
          </ul>
          <div
            className={
              "flex rounded my-4 sm:pl-10"
            }
            id="example-navbar-danger"
          >
            <div className="rounded relative  md:mr-0">
              <div
                className="flex absolute inset-y-0 left-0 items-center pl-3 pt-1 
              pointer-events-none"
              >
                <img src={search} alt="search" className="w-5 h-5 opacity-40" loading="lazy"/>
              </div>
              <input
                type="text"
                id="email-adress-icon"
                className="block p-2 pl-10 sm:w-[417px] outline-none h-10 text-[#999FAE] placeholder:font-normal placeholder:text-[16px] 
                    placeholder:text-[#999FAE] rounded-[5px] placeholder:tracking-[-0.04em]"
                placeholder="Search"
                style={{ backgroundColor: "rgba(114, 114, 114,0.1)" }}
              />
            </div>
            <div className="relative lg:ml-6 md:mr-0">
              <button
                className="bg-[#8F6EC5] text-[18px] h-[40px] text-center font-Helvetica 
              text-white font-bold py-2 w-[100px] rounded-[5px]"
              onClick={!this.props.isLoggedIn?()=>this.props.updateLoginModal(true):()=>this.props.logOut()}
              >
                {!this.props.isLoggedIn?"Login":"Logout"}
              </button>
            </div>
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


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
