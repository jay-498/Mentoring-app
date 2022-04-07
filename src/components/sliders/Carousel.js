import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import img1 from "../../assets/images/1.png";
import img2 from "../../assets/images/2.png";
import img3 from "../../assets/images/3.png";
import img4 from "../../assets/images/4.png";


export default class Gallery extends Component {
  render() {
    const settings = {
      arrows:true,
      swipe: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      initialSlide: 0,
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
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="pt-5">
        <Slider {...settings}>
          <div>
            <div className="relative">
                <a className="absolute inset-0 z-10 text-center flex items-center justify-center">
                  <h1  className="text-2xl text-slate-100">RESEARCH</h1>
                </a>
                <a href="#" className="relative">
                    <div className="flex flex-wrap">
                        <img src={img1} alt="1" />
                    </div>
                </a>
            </div>
          </div>
          <div>
            <div className="relative">
                <a className="absolute inset-0 z-10 text-center flex items-center justify-center">
                  <h1  className="text-2xl text-slate-100">RESEARCH</h1>
                </a>
                <a href="#" className="relative">
                    <div className="flex flex-wrap">
                        <img src={img2} alt="1" />
                    </div>
                </a>
            </div>
          </div>
          <div>
            <div className="relative">
                <a className="absolute inset-0 z-10 text-center flex items-center justify-center">
                  <h1  className="text-2xl text-slate-100">RESEARCH</h1>
                </a>
                <a href="#" className="relative">
                    <div className="flex flex-wrap">
                        <img src={img3} alt="1" />
                    </div>
                </a>
            </div>
          </div>
          <div>
            <div className="relative">
                <a className="absolute inset-0 z-10 text-center flex items-center justify-center">
                  <h1  className="text-2xl text-slate-100">RESEARCH</h1>
                </a>
                <a href="#" className="relative">
                    <div className="flex flex-wrap">
                        <img src={img4} alt="1" />
                    </div>
                </a>
            </div>
          </div>
          <div>
            <div className="relative">
                <a className="absolute inset-0 z-10 text-center flex items-center justify-center">
                  <h1  className="text-2xl text-slate-100">RESEARCH</h1>
                </a>
                <a href="#" className="relative">
                    <div className="flex flex-wrap">
                        <img src={img1} alt="1" />
                    </div>
                </a>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
