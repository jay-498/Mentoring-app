import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "slick-carousel/slick/slick-theme.css";
// import left from "../../assets/images/design/left.png";
import left from "../../assets/images/svgs/arrow-left.png";
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
    if (this.props.isSlider) {
      MainService.discoverTopMentors()
        .then((response) => {
          let tempMentors = [...response.data.data];
          this.setState((prevState) => ({
            ...prevState,
            mentorDetails: tempMentors,
          }));
        })
        .catch((err) => console.log(err));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.mentorDetails &&
      prevProps.mentorDetails.length !== this.props.mentorDetails.length
    ) {
      this.setState((prevState) => ({
        ...prevState,
        mentorDetails: [...this.props.mentorDetails],
      }));
    }
  }

  render() {
    const settings = {
      arrows: false,
      swipe: true,
      infinite: false,
      speed: 500,
      loop: true,
      slidesToShow: 4,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            // infinite: true,
          },
        },
        {
          breakpoint: 820,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            // infinite: true,
          },
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            // infinite: true,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            // infinite: true,
          },
        },
      ],
    };
    return (
      <div className="relative px-[31px]">
        {this.props.isSlider ? (
          <>
            {(this.state.mentorDetails.length > 4 ||
              window.innerWidth < 720) && (
              <div
                className="absolute top-56 left-2 z-10 bg-gray-50 rounded-2xl cursor-pointer"
                onClick={this.previous}
              >
                <button className="button h-[65px] w-[69px] p-4 pl-5">
                  <img
                    src={left}
                    alt="left"
                    className="h-6 w-6"
                    loading="lazy"
                  />
                </button>
              </div>
            )}
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
                          className="pb-0 mb-0 h-[400px] lg:rounded-t-[20px] rounded-t-[15px]"
                        />
                        <div className="flex-col bg-white lg:rounded-b-[20px] rounded-b-[15px]">
                          <div className="flex w-full justify-between lg:px-4 px-3 items-center">
                            <p className="lg:text-xl text-md text-[#646464] font-Manrope font-black pt-1">
                              {mentor.name}
                            </p>
                            <p className="flex inline justify-center items-center text-[#FB89A1] font-semibold font-poppins lg:text-xl text-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                className="w-4 h-4"
                              >
                                <path
                                  fill="#FB89A1"
                                  d="M.0022 64C.0022 46.33 14.33 32 32 32H288C305.7 32 320 46.33 320 64C320 81.67 305.7 96 288 96H231.8C241.4 110.4 248.5 126.6 252.4 144H288C305.7 144 320 158.3 320 176C320 193.7 305.7 208 288 208H252.4C239.2 266.3 190.5 311.2 130.3 318.9L274.6 421.1C288.1 432.2 292.3 452.2 282 466.6C271.8 480.1 251.8 484.3 237.4 474L13.4 314C2.083 305.1-2.716 291.5 1.529 278.2C5.774 264.1 18.09 256 32 256H112C144.8 256 173 236.3 185.3 208H32C14.33 208 .0022 193.7 .0022 176C.0022 158.3 14.33 144 32 144H185.3C173 115.7 144.8 96 112 96H32C14.33 96 .0022 81.67 .0022 64V64z"
                                />
                              </svg>{" "}
                              {mentor.session_rate}
                            </p>
                          </div>
                          <div className="flex-col lg:px-4 px-3 pb-2">
                            <p className="text-sm font-medium text-[#0C2054] font-Manrope">
                              {mentor.companies.length &&
                                mentor.companies[0]?.company.name}
                            </p>
                            {/* <p className="text-[10px] font-light text-[#0C2054] font-poppins">
                              {mentor.colleges[0]?.degree}
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </Slider>

            {(this.state.mentorDetails.length > 4 ||
              window.innerWidth < 720) && (
              <div
                className="absolute right-1 top-56 bg-gray-50 rounded-2xl"
                onClick={this.next}
              >
                <button className="button rounded-2xl h-[65px] w-[69px] p-4 pl-5">
                  <img
                    src={right}
                    alt="left"
                    className="h-6 w-6"
                    loading="lazy"
                  />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {this.state.mentorDetails.map((mentor, index) => (
                <div
                  className=" shadow-lg my-5 shadow-slate-500/40 rounded-b-[20px]"
                  key={index}
                >
                  <div className="relative">
                    <a href={`/profile/${mentor._id}`} className="relative">
                      <div className="flex flex-col">
                        <img
                          src={mentor.profile_picture}
                          loading="lazy"
                          alt="1"
                          className="pb-0 h-[400px] mb-0 rounded-t-[20px]"
                        />
                        <div className="flex-col bg-white rounded-b-[20px]">
                          <div className="flex justify-between px-4 items-center">
                            <p className="text-xl text-[#646464] font-Manrope font-black pt-1">
                              {mentor.name}
                            </p>
                            <p className="flex inline justify-center items-center text-[#FB89A1] font-semibold font-poppins lg:text-xl text-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                className="w-4 h-4"
                              >
                                <path
                                  fill="#FB89A1"
                                  d="M.0022 64C.0022 46.33 14.33 32 32 32H288C305.7 32 320 46.33 320 64C320 81.67 305.7 96 288 96H231.8C241.4 110.4 248.5 126.6 252.4 144H288C305.7 144 320 158.3 320 176C320 193.7 305.7 208 288 208H252.4C239.2 266.3 190.5 311.2 130.3 318.9L274.6 421.1C288.1 432.2 292.3 452.2 282 466.6C271.8 480.1 251.8 484.3 237.4 474L13.4 314C2.083 305.1-2.716 291.5 1.529 278.2C5.774 264.1 18.09 256 32 256H112C144.8 256 173 236.3 185.3 208H32C14.33 208 .0022 193.7 .0022 176C.0022 158.3 14.33 144 32 144H185.3C173 115.7 144.8 96 112 96H32C14.33 96 .0022 81.67 .0022 64V64z"
                                />
                              </svg>{" "}
                              {mentor.session_rate}
                            </p>
                          </div>
                          <div className="flex-col pb-2 px-4">
                            <p className="text-sm font-medium text-[#0C2054] font-Manrope">
                              {mentor.companies.length &&
                                mentor.companies[0]?.company.name}
                            </p>
                            {/* <p className="text-[10px] font-light text-[#0C2054] font-poppins">
                              {mentor.colleges[0].name}
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(CarouselDiscover);
