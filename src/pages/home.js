import React, { Component } from "react";
import profile from "../assets/images/profile/Profil1.png";
import bgcolor from "../assets/images/bgcolor.png";
import Gallery from "../components/sliders/Carousel";
import CarouselDiscover from "../components/sliders/CarouselDiscover";
import ExploreCarousel from "../components/sliders/ExploreCarousel";
import Testimonials from "../components/sliders/Testimonials";

class HomePage extends Component {

  render() {
    return (
      <div className="container">
          <div className="grid lg:grid-cols-2 h-[840px] mx-20">
          <div className="flex flex-col pt-[50%] w-[564px] gap-y-4">
            <div className="flex justify-start leading-none">
            <p className="text-[#8F6EC5] font-bold text-[52px] not-italic font-poppins">Learn and grow from the best in industry</p>
            </div>
            <div className="flex flex-col h-8 leading-7.5 gap-y-4">
                <p className="text-[#262626] font-medium text-[24px] not-italic font-Helvetica">Find the best mentor who can help you ace your next case</p>
                <div className="flex first-letter:my-2">
                    <div className="hidden rounded-l-lg relative md:mr-0 md:block">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-[#797373]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="email-adress-icon" 
                        className="block p-2 pl-10 w-[417px] h-10 text-[#797373] 
                        rounded-l-lg sm:text-sm focus:ring-blue-500 focus:border-blue-500 
                        dark:bg-[#fff] dark:placeholder-[#797373]" 
                        placeholder="Find your mentor" />
                    </div>
                    <button className="bg-[#8F6EC5] text-white font-bold py-2 px-4 rounded-r-lg">
                    Search
                    </button>
                </div>
            </div>
          </div>
          <div className="flex flex-col items-center pt-20">
              <div className="h-[600px]">
              <img src={profile} className="block" alt="profile"/>
              </div>
              <h1 className="text-Helvetica text-xl font-semibold">Pragyan Pandey, Software Engineer</h1>
          </div>
          </div>

          <div className="flex flex-col pt-10 bg-gradient-to-r from-[#E2E3FF] to-[#FFE8EB]" 
          >
              <div className="flex flex-col mx-20">
              <h1 className="text-[#646464] text-2xl font-bold font-poppins">POPULAR CATEGORIES</h1>
              <Gallery />
              </div>
          </div>

          <div className="flex flex-col pt-10" 
          >
              <div className="flex flex-col mx-20">
              <h1 className="text-[#646464] text-2xl font-bold font-poppins">DISCOVER TOP MENTORS</h1>
              <CarouselDiscover />
              </div>
          </div>

          <div className="flex flex-col pt-10 " 
          >
              <div className="flex flex-col mx-20">
              <h1 className="text-[#646464] text-2xl font-bold font-poppins text-center">EXPLORE CONSULTING TYPES</h1>
              <ExploreCarousel />
              </div>
          </div>

          <div className="flex flex-col pt-28">
            <div className="flex justify-center items-center">
                <div className="flex bg-[#A36EBA] w-[1158px] h-[380px] rounded-[28px]">
                    <div className="z-10 flex flex-col p-28">
                      <h1  className="text-5xl text-slate-100 font-bold font-Helvetica">Sign in to our book</h1>
                      <p className="font-normal text-white text-xl font-Helvetica py-6">Craven omni memoria patriae zombieland clairvius<br/> narcisse religionis sunt diri undead historiarum.</p>
                      <div className="flex first-letter:my-2">
                          <div className="hidden rounded-l-lg relative md:mr-0 md:block">
                              <input type="text" id="email-adress-icon" 
                              className="block p-2 pl-10 w-[417px] h-10 text-[#fff] 
                              rounded-l-lg sm:text-sm focus:ring-blue-500 focus:border-blue-500 
                              dark:bg-[#FFACFF] dark:placeholder-[#fff] opacity-20" 
                              placeholder="email address" />
                          </div>
                          <button className="bg-[#FFACFF] font-Helvetica text-white font-bold py-2 px-4 rounded-r-lg">
                          Download
                          </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="flex flex-col py-28">
              <div className="flex flex-col px-20">
              <h1 className="text-[#646464] text-2xl font-bold font-poppins text-center">TESTOMONIALS</h1>
              <Testimonials />
              </div>
          </div>
          
          <div className="flex flex-col p-10 bg-[#F9EFFD]" 
          >
              <div className="flex flex-col mx-36">
              <h1 className="text-[#939EA4] text-[14px] font-medium font-roboto pb-14">Your company</h1>
              <hr style={{backgroundColor: "#CDD1D4",height: "1px"}} />
              <div className="flex">
              <div className={"lg:flex flex-grow justify-start"}>
            <ul className="flex flex-col lg:flex-row list-none lg:mr-auto">
              <li className="nav-item">
                <a
                  className="py-2 flex items-center  font-bold leading-snug text-gray hover:opacity-75"
                  href="#pablo"
                >
                  <span className="font-normal text-[#999FAE] font-Roboto">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-5 py-2 flex items-centerfont-bold leading-snug text-gray hover:opacity-75"
                  href="#pablo"
                >
                  <span className="ml-5 font-normal text-[#999FAE] font-Roboto">About</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center font-bold leading-snug text-gray hover:opacity-75"
                  href="#pablo"
                >
                  <span className="ml-2 font-normal text-[#999FAE] font-Roboto">Contact</span>
                </a>
              </li>
            </ul>
          </div>

          <div
            className={
              "lg:flex flex-grow justify-start"
            }
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="py-2 flex items-center  font-bold leading-snug text-gray hover:opacity-75"
                  href="#pablo"
                >
                  <span className="font-normal text-[#999FAE] font-Roboto">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-5 py-2 flex items-centerfont-bold leading-snug text-gray hover:opacity-75"
                  href="#pablo"
                >
                  <span className="ml-5 font-normal text-[#999FAE] font-Roboto">About</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center font-bold leading-snug text-gray hover:opacity-75"
                  href="#pablo"
                >
                  <span className="ml-2 font-normal text-[#999FAE] font-Roboto">Contact</span>
                </a>
              </li>
            </ul>
          </div>
          </div>
              </div>
          </div>

          <div className="flex flex-col py-10">
              <div className="flex flex-col mx-20">
              <p className="text-slate-400 text-xl font-normal font-helvetica text-center">© 2020. All rights reserved</p>
              </div>
          </div>


      </div>
    );
  }
}


export default HomePage;
