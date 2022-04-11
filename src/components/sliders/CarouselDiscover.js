import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/mentee/1.png";
import img2 from "../../assets/images/mentee/2.png";
import img3 from "../../assets/images/mentee/3.png";
import img4 from "../../assets/images/mentee/4.png";
import left from "../../assets/images/design/left.png";
import right from "../../assets/images/design/right.png";



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
         },
         {
          image: img4,
          name: "Anjali Bhati",
          qualification: "B.COM | SRCC",
          value: 1200
         }
      ]
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  render() {
    const settings = {
      arrows:false,
      swipe: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            infinite: true,
          }
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="relative px-2">
        <div className="absolute top-56 left-0 z-10 bg-white rounded-2xl h-13 w-13 p-3">
          <button className="button" onClick={this.previous}>
            <img src={left} alt="left" className="h-6 w-6"/>
          </button>
        </div>
        <Slider ref={c => (this.slider = c)} {...settings}>
          {this.state.mentorDetails.map((mentor,index)=>(
              <div className="shadow-lg shadow-slate-500/40 my-5 rounded-b-[20px]" key={index}>
              <div className="relative">
                  <a href="#" className="relative">
                      <div className="flex flex-col">
                          <img src={mentor.image} alt="1" className="pb-0 mb-0 rounded-t-[20px]"/>
                          <div className="flex flex-col bg-white rounded-b-[20px]">
                          <div className="grid grid-cols-2 items-center">
                          <p  className="text-xl text-[#646464] pl-5 font-Avenir font-black pt-1">{mentor.name}</p>
                          <span className="text-[#FB89A1] font-semibold pl-[76px] font-poppins lg:text-xl text-sm">RS {mentor.value}</span>
                          </div>
                          <p  className="text-sm font-medium text-[#0C2054] pl-5 pb-2">{mentor.qualification}</p>
                          </div>
                      </div>
                  </a>
              </div>
            </div>
          ))}
        </Slider>
        <div className="absolute right-0 top-56">
          <button className="button bg-white rounded-2xl h-13 w-13 p-4" onClick={this.next}>
            <img src={right} alt="left" className="h-6 w-6"/>
          </button>
        </div>
      </div>
    );
  }
}
