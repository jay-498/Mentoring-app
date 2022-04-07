import React, { Component } from "react";
import img1 from "../../assets/images/mentee/Group 9546.png";
import img2 from "../../assets/images/mentee/Group 9547.png";
import img3 from "../../assets/images/mentee/Group 9548.png";


export default class ExploreCarousel extends Component {
  render() {
    return (
      <div className="grid grid-cols lg:grid-cols-3 md:grid-cols-3 pt-10">
          <div className="flex justify-center items-center">
            <div className="flex bg-[#FD8498] w-[350px] h-[205px] rounded-[20px]">
                <div className="z-10 flex flex-col items-center justify-center">
                  <img src={img1} alt="1" className="w-30 h-28 px-20" />
                  <h1  className="text-2xl text-slate-100">MCKINSKY</h1>
                </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex bg-[#3960FE] w-[350px] h-[205px] rounded-[20px]">
                <div className="z-10 flex flex-col items-center justify-center">
                  <img src={img1} alt="1" className="w-30 h-28 px-20"/>
                  <h1  className="text-2xl text-slate-100">MCKINSKY</h1>
                </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex bg-[#F6C859] w-[350px] h-[205px] rounded-[20px]">
                <div className="z-10 flex flex-col items-center justify-center">
                  <img src={img1} alt="1" className="w-30 h-28 px-20"/>
                  <h1  className="text-2xl text-slate-100">MCKINSKY</h1>
                </div>
            </div>
          </div>

      </div>
    );
  }
}
