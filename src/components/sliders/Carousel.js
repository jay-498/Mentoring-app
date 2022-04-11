import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import img1 from "../../assets/images/1.png";
import img2 from "../../assets/images/2.png";
import img3 from "../../assets/images/3.png";
import img4 from "../../assets/images/4.png";
import left from "../../assets/images/design/left.png"
import right from "../../assets/images/design/right.png"


export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories : [
         {
           image: img1,
           tag: "REASEARCH"
         },
         {
          image: img2,
          tag: "REASEARCH"
        },
        {
          image: img3,
          tag: "REASEARCH"
        },
        {
          image: img4,
          tag: "REASEARCH"
        },
        {
          image: img1,
          tag: "REASEARCH"
        },
        {
         image: img2,
         tag: "REASEARCH"
       },
       {
         image: img3,
         tag: "REASEARCH"
       },
       {
         image: img4,
         tag: "RESEARCH"
       },
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
      arrows: false,
      swipe: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
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
      <div className="relative pt-5">
        <div className="absolute top-24 left-3 z-10 bg-white rounded-2xl h-13 w-13 p-3">
          <button className="button" onClick={this.previous}>
            <img src={left} alt="left" className="h-6 w-6"/>
          </button>
        </div>
        <Slider ref={c => (this.slider = c)} {...settings}>
        {this.state.categories.map((mentor,index)=>(
        <div key={index}>
            <div className="relative">
                <a className="absolute inset-0 z-10 text-center flex top-[35%] justify-center">
                  <h1 className="text-2xl text-white font-bold font-poppins tracking-[.13em]" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>{mentor.tag}</h1>
                </a>
                <a href="#" className="relative">
                    <img src={mentor.image} alt="1" />
                </a>
            </div>
        </div>
        ))}
          
        </Slider>

        <div className="absolute right-3 top-24">
          <button className="button bg-white rounded-2xl h-13 w-13 p-4" onClick={this.next}>
            <img src={right} alt="left" className="rounded-3xl h-6 w-6"/>
          </button>
        </div>
      </div>
    );
  }
}
