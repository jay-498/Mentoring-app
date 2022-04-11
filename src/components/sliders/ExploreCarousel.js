import React, { Component } from "react";
import img1 from "../../assets/images/mentee/Group 9546.png";
import img2 from "../../assets/images/mentee/Group 9547.png";
import img3 from "../../assets/images/mentee/Group 9548.png";
import Mentor from "../mentor";


  /**
   * PurgeCSS:
   * bg-[#FD8498]
   * bg-[#3960FE]
   * bg-[#F6C859]

   */

export default class ExploreCarousel extends Component {
  constructor(){
    super();
    this.state = {
      explore : [
        {
          name: "MCKINSKY",
          bg: "#FD8498"
         },
         {
          name: "MCKINSKY",
          bg: "#3960FE"
         },
         {
          name: "MCKINSKY",
          bg: "#F6C859"
         }
      ]
    };
  }
  render() {
    return (
      <div className="grid grid-cols lg:grid-cols-3 grid-cols-1 pt-10 gap-y-2">
        {this.state.explore.map((mentor,index)=>(
          <div className="flex justify-center items-center" key={index}>
            <div className={`flex bg-[${mentor.bg}] w-[350px] h-[205px] rounded-[20px]`}>
                <div className="z-10 flex flex-col items-center justify-center">
                  <img src={img1} alt="1" className="w-30 h-28 px-20" />
                  <h1  className="text-2xl text-slate-100">{mentor.name}</h1>
                </div>
            </div>
          </div>
        ))}



      </div>
    );
  }
}
