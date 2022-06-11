import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "slick-carousel/slick/slick-theme.css";
import left from "../../assets/images/design/left.png";
import right from "../../assets/images/design/right.png";
import MainService from "../../services/main.service";
import { withRouter } from "../../utils/withRouter";

class CarouselDiscover extends Component {
  constructor() {
    super();
    this.state = {
      mentorDetails: [],
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

  componentDidMount() {
    MainService.discoverTopMentors()
      .then((response) => {
        let tempMentors = [...response.data];
        this.setState((prevState) => ({
          ...prevState,
          mentorDetails: tempMentors,
        }));
      })
      .catch((err) => console.log(err));
  }

  render() {
    const settings = {
      arrows: false,
      swipe: true,
      infinite: true,
      speed: 500,
      loop: true,
      slidesToShow: 4,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            infinite: true,
          },
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            infinite: true,
          },
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            infinite: true,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
      ],
    };
    return (
      <div className="relative pt-5 px-[31px]">
        {(this.state.mentorDetails.length>4 || window.innerWidth < 720) && 
        <div
          className="absolute top-56 left-2 z-10 bg-white rounded-2xl h-[65px] w-[69px] p-3 bg-gray-50 cursor-pointer"
          onClick={this.previous}
        >
          <button className="button">
            <img src={left} alt="left" className="h-6 w-6 mt-2 ml-3" loading="lazy"/>
          </button>
        </div>
        }
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          {this.state.mentorDetails.map((mentor, index) => (
            <div
              className="shadow-lg shadow-slate-500/40 my-5 rounded-b-[20px]"
              key={index}
            >
              <div className="relative">
                <a href={`/profile/${mentor._id}`} className="relative">
                  <div className="flex flex-col">
                    <img
                      src={mentor.profile_picture}
                      loading="lazy"
                      alt="1"
                      className="pb-0 mb-0 rounded-t-[20px]"
                    />
                    <div className="flex-col bg-white rounded-b-[20px]">
                      <div className="flex justify-between px-4 items-center">
                        <p className="text-xl text-[#646464] font-Manrope font-black pt-1">
                          {mentor.name}
                        </p>
                        <span className="text-[#FB89A1] font-semibold font-poppins lg:text-xl text-sm">
                          RS {mentor.session_rate}
                        </span>
                      </div>
                      <div className="flex-col px-4">
                        <p className="text-sm font-medium text-[#0C2054] font-Manrope">
                          {mentor.description}
                        </p>
                        <p className="text-[10px] font-light text-[#0C2054] pb-2 font-poppins">
                          {mentor.colleges[0].name}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </Slider>

        {(this.state.mentorDetails.length>4 || window.innerWidth < 720) && 
        <div
          className="absolute right-1 top-56 bg-gray-50 rounded-2xl"
          onClick={this.next}
        >
          <button className="button rounded-2xl h-[65px] w-[69px] p-4 pl-5">
            <img src={right} alt="left" className="h-6 w-6" loading="lazy"/>
          </button>
        </div>
        }
      </div>
    );
  }
}

export default withRouter(CarouselDiscover);
