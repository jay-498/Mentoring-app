import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/mentee/1.png";
import img2 from "../../assets/images/mentee/2.png";
import img3 from "../../assets/images/mentee/3.png";
import img4 from "../../assets/images/mentee/4.png";


export default class CarouselDiscover extends Component {
  constructor(){
    super();
    this.state = {
      mentorDetails : [
        {
          image: img1,
          name: "Anjali Bhati",
          qualification: "B.COM | SRCC",
          value: 1200
         },
         {
          image: img2,
          name: "Anjali Bhati",
          qualification: "B.COM | SRCC",
          value: 1200
         },
         {
          image: img3,
          name: "Anjali Bhati",
          qualification: "B.COM | SRCC",
          value: 1200
         },
         {
          image: img4,
          name: "Anjali Bhati",
          qualification: "B.COM | SRCC",
          value: 1200
         }
      ]
    }
  }

  render() {
    const settings = {
      arrows:true,
      swipe: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };
    return (
      <div className="pt-5">
        <Slider {...settings}>
          {this.state.mentorDetails.map((mentor,index)=>(
              <div className="shadow-lg shadow-slate-500/40 my-5 rounded-2xl" key={index}>
              <div className="relative">
                  <a href="#" className="relative">
                      <div className="flex flex-col">
                          <img src={mentor.image} alt="1" className="pb-0 mb-0"/>
                          <div className="flex flex-wrap">
                          <div className="grid grid-cols-2 items-center">
                          <p  className="text-xl text-slate-800 pl-9 font-Avenir font-bold">{mentor.name}</p>
                          <span className="text-[#FB89A1] font-semibold ml-auto">RS {mentor.value}</span>
                          </div>
                          <p  className="text-xl font-medium text-slate-800 pl-9 p-2">{mentor.qualification}</p>
                          </div>
                      </div>
                  </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
