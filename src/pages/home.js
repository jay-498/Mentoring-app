import React, { Component } from "react";
import profile from "../assets/images/profile/Profil1.png";
import CarouselDiscover from "../components/main/CarouselDiscover";
import Gallery from "../components/main/Carousel";
import ExploreCarousel from "../components/main/ExploreCarousel";
import Testimonials from "../components/main/Testimonials";
import Mentors from "../components/main/Mentors";
import sign from "../assets/images/mentee/sign.png";
import plane1 from "../assets/images/design/plane1.png";
import plane2 from "../assets/images/design/plane3.png";
import dots from "../assets/images/design/Dots.png";
import facebook from "../assets/images/icons/facebook.png";
import search from "../assets/images/design/Search.png";
import instagram from "../assets/images/icons/Instagram.png";
import linkedin from "../assets/images/icons/linkedin.png";
import twitter from "../assets/images/icons/twitter.png";
import youtube from "../assets/images/icons/youtube.png";
import bg from "../assets/images/bg.png";
import Navbar from "../components/common/Navbar";
import LoginModal from "../components/profile/LoginModal";
import { connect } from "react-redux";
import { withRouter } from "../utils/withRouter";
import { UpdateLoginModal } from "../store/actions/booking";
import { logOut } from "../store/actions/Login";

class HomePage extends Component {
  constructor(){
    super();
    this.state={
       email: "",
       search: "",
       isEmailValid: false
    }
  }

  handleChange=(e)=>{
    this.setState(prev=>{
      return{
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
    if(e.target.name==="email"){
    this.setState(prev=>{
      return{
        ...prev,
        isEmailValid: (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value) === true),
      }
    })
    }
  }

  render() {
    return (
      <div className="flex-col mx-auto sm:h-[870px] h-[650px] bg-[#FFE8EB]">
        {/* <Navbar /> */}
        <LoginModal isBooking="false"/>
        <div className="grid lg:grid-cols-2 sm:h-[840px] h-[540px] sm:mx-20 mx-5">
          <div className="flex flex-col pt-[30%] gap-y-4">
            <div className="flex justify-start leading-[64px]">
              <p className="text-[#8F6EC5] sm:w-[600px] font-bold sm:text-[52px] text-[42px] font-poppins">
                Learn and grow from
                the best in industry
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <p className="text-[#797373] font-medium text-2xl font-poppins">
                Find the best mentor who can help you ace your
                <br /> next case
              </p>
              <div className="flex first-letter:my-2">
                <div className="rounded-l-lg relative md:mr-0">
                  <div className="flex absolute inset-y-0 left-0 items-center sm:pl-7 pl-4 pointer-events-none">
                    <img src={search} alt="search" loading="lazy"/>
                  </div>
                  <input
                    type="text"
                    name="search"
                    onChange={(e)=>this.handleChange(e)}
                    id="email-adress-icon"
                    className="block p-2 sm:pl-16 pl-12 sm:w-[417px] py-3 text-[#797373] 
                          rounded-l-lg md:text-md sm:text-[20px] text-[17px]
                          dark:bg-[#fff] placeholder:text-[#797373] placeholder:font-medium 
                          placeholder:font-nunito"
                    placeholder="Find your mentor"
                  />
                </div>
                <button className="bg-[#8F6EC5] text-white font-bold sm:py-3 py-2 sm:px-12 px-7 rounded-r-lg">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="lg:visible invisible flex-col  justify-center items-center pt-8">
            <div className="h-[590px] w-full">
              <img src={profile} className="relative h-[750px] w-full" alt="profile" loading="lazy"/>
            </div>
            <h1 className="font-Helvetica text-xl font-normal text-center">
              Pragyan Pandey, Software Engineer
            </h1>
          </div>
        </div>

        <div className="relative justify-center items-center py-10 mt-0">
          <div className="flex-col lg:mx-20 mx-6">
            <h1
              className="text-[#1D2538] text-center  text-[20px]
            sm:text-[40px] font-semibold font-poppins tracking-[-0.04em] py-5 sm:pb-8"
            >
              Mentors we’ve work with
            </h1>
            <Mentors />
          </div>
        </div>

        <div
          className="flex flex-col sm:pt-10"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col lg:mx-10 sm:mx-6 mx-2 sm:mt-16 mt-8">
            <h1 className="text-[#646464] sm:text-3xl text-2xl sm:pl-[44px] pl-[30px] font-medium font-poppins">
              CATEGORIES
            </h1>
            <Gallery />
          </div>
        </div>

        <div className="flex flex-col sm:pt-20 pt-10">
          <div className="absolute sm:w-[60px] w-[40px] mt-36 sm:ml-10 ml-4">
            <img src={dots} alt="dot" loading="lazy"/>
          </div>
          <div className="flex flex-col lg:mx-10 sm:mx-6 mx-2">
            <div className="flex">
              <h1 className="text-[#646464] pl-[44px] sm:text-3xl text-2xl font-medium font-poppins">
                DISCOVER TOP MENTORS
              </h1>
            </div>
            <CarouselDiscover isSlider="true"/>
          </div>
        </div>

        <div className="flex mx-28 sm:pt-28 pt-10">
          <img
            loading="lazy"
            src={plane1}
            alt="plane1"
            className="sm:w-[163px] w-[100px] h-[50px] sm:h-[83px] ml-auto"
          />
        </div>

        <div className="flex flex-col sm:pt-10 pt-5" id="companies">
          <div className="absolute sm:left-[-40px] left-[-70px]">
            <img src={plane2} alt="plane2" loading="lazy" className="w-[113px] h-[100px]" />
          </div>
          <div className="flex-col lg:mx-20 sm:mx-6 mx-2">
            <h1 className="text-[#646464] sm:text-3xl text-2xl sm:pb-10 font-medium font-poppins text-center">
              EXPLORE CONSULTING COMPANIES
            </h1>
            <ExploreCarousel />
          </div>
        </div>

        <div className="flex justify-center items-center sm:pt-28 pt-10 m-5" id="casecompendium">
          <div className="flex justify-center items-center">
            <div className="flex bg-[#A36EBA] rounded-[28px]">
              <div className="flex-col lg:p-28 p-10">
                <h1 className="sm:text-5xl text-2xl  text-slate-100 font-bold font-Helvetica">
                  Sign in to our book
                </h1>
                <p className="font-normal text-white sm:text-xl text-md font-Helvetica py-6">
                  Craven omni memoria patriae zombieland clairvius
                  <br /> narcisse religionis sunt diri undead historiarum.
                </p>
                <div className="flex first-letter:my-2">
                  <div className="rounded-l-lg relative md:mr-0">
                    <input
                      type="email"
                      name="email"
                      id="email-adress-icon"
                      className="block p-2 pl-10 sm:w-[380px] sm:h-[54px] text-[#fff] 
                              rounded-l-lg sm:text-[16px] text-[12px] font-normal font-Helvetica
                              placeholder-opacitywhite border border-[#FFACFF] outline-none"
                      placeholder="Email Address"
                      onChange={this.handleChange}
                      style={{ background: "rgba(255, 208, 255, 0.15)" }}
                    />
                  </div>
                  <button 
                  className={`${!this.state.isEmailValid && "opacity-70"} bg-[#FFACFF] sm:text-[16px] text-[12px] font-Helvetica text-white font-bold py-2 px-4 rounded-r-lg`}
                  disabled={!this.state.isEmailValid}>
                    Download
                  </button>
                </div>
              </div>
              <div className="p-4 pr-10 opacity-60 hidden lg:block">
                <img src={sign} alt="design" loading="lazy"/>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-col lg:py-28 sm:py-20 py-5 pt-10">
          <div className="flex-col sm:px-7">
            <h1 className="text-[#646464] sm:text-3xl text-2xl font-medium font-poppins text-center">
              TESTIMONIAL
            </h1>
            <Testimonials />
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
                      <img alt="facebook" src={facebook} className="w-4 h-4" loading="lazy" />
                    </a>
                  </li>
                  <li className="flex items-center justify-center">
                    <a
                      className="px-5 py-2  font-bold leading-snug text-gray hover:opacity-75"
                      href="#pablo"
                    >
                      <img alt="linkedin" src={linkedin} className="w-4 h-4" loading="lazy"/>
                    </a>
                  </li>
                  <li className="flex items-center justify-center">
                    <a
                      className="px-3 py-2  font-bold leading-snug text-gray hover:opacity-75"
                      href="#pablo"
                    >
                      <img alt="twitter" src={twitter} className="w-4 h-4" loading="lazy"/>
                    </a>
                  </li>
                  <li className="flex items-center justify-center">
                    <a
                      className="px-3 py-2  font-bold leading-snug text-gray hover:opacity-75"
                      href="#pablo"
                    >
                      <img alt="youtube" src={youtube} className="w-4 h-4" loading="lazy"/>
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

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HomePage));

