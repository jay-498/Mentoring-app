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
import { connect } from "react-redux";
import { withRouter } from "../utils/withRouter";
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
      <div className="flex-col mx-auto">
        <div className="flex-col">
          <div className="flex-col lg:mx-10 sm:mx-6 mx-2">
            <CarouselDiscover isSlider="false"/>
            <CarouselDiscover isSlider="false"/>
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

