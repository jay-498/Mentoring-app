import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "./Testimonials.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/mentee/1.png";
import img2 from "../../assets/images/mentee/2.png";
import img3 from "../../assets/images/mentee/3.png";
import img4 from "../../assets/images/mentee/4.png";


export default class Testimonials extends Component {
  render() {
    const settings = {
      swipe: true,
      className: "center slider variable-width",
      centerMode: true,
      infinite: true,
      centerPadding: "10px",
      speed: 500,
      variableWidth: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="pt-5 justify-center items-center">
        <Slider {...settings}>
          <div className="justify-center items-center py-5" style={{width:800}}>
            <div className="text-center justify-center shadow-lg shadow-[#DBDEE1] p-8 rounded-3xl">
                <p  className="text-xl text-slate-800 font-helvetica font-regular">“ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.”</p>           
                <div className="flex flex-row items-center pl-10 py-5">
                <img className="w-14 h-14 rounded-full shadow-lg overflow-hidden" src={img1} alt="profile"/>
                <div className="flex flex-col px-4 items-start">
                <h5 className="mb-1 text-xl font-bold font-Helvetica text-gray-900">Janie Adams</h5>
                <span className="text-sm text-gray-500 font-poppins font-normal">Client</span>
                </div>
            </div>
            </div>
          </div>

          <div className="justify-center items-center py-5" style={{width:800}}>
            <div className="text-center justify-center shadow-lg shadow-[#DBDEE1] p-8 rounded-3xl">
                <p  className="text-xl text-slate-800 font-helvetica font-regular">“ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.”</p>           
                <div className="flex flex-row items-center pl-10 py-5">
                <img className="w-14 h-14 rounded-full shadow-lg overflow-hidden" src={img1} alt="profile"/>
                <div className="flex flex-col px-4 items-start">
                <h5 className="mb-1 text-xl font-bold font-Helvetica text-gray-900">Janie Adams</h5>
                <span className="text-sm text-gray-500 font-poppins font-normal">Client</span>
                </div>
            </div>
            </div>
          </div>

          <div className="justify-center items-center py-5" style={{width:800}}>
            <div className="text-center justify-center shadow-lg shadow-[#DBDEE1] p-8 rounded-3xl">
                <p  className="text-xl text-slate-800 font-helvetica font-regular">“ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.”</p>           
                <div className="flex flex-row items-center pl-10 py-5">
                <img className="w-14 h-14 rounded-full shadow-lg overflow-hidden" src={img1} alt="profile"/>
                <div className="flex flex-col px-4 items-start">
                <h5 className="mb-1 text-xl font-bold font-Helvetica text-gray-900">Janie Adams</h5>
                <span className="text-sm text-gray-500 font-poppins font-normal">Client</span>
                </div>
            </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
