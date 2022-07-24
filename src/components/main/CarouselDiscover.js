import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "slick-carousel/slick/slick-theme.css";
// import left from "../../assets/images/design/left.png";
import left from "../../assets/images/svgs/arrow-left.png";
import right from "../../assets/images/design/right.png";
import MainService from "../../services/main.service";
import MentorCard from "../../components/mentors/mentor-card"
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
      slidesToShow: 5,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            // infinite: true,
          },
        },
        {
          breakpoint: 820,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 3,
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
            {(this.state.mentorDetails.length > 5 ||
              window.innerWidth < 720) && (
              <div
                className="absolute top-36 left-2 z-10 bg-gray-50 rounded-2xl cursor-pointer"
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
                <div className="shadow-lg shadow-slate-500/40 rounded-[15px]" key={index}>
                  <MentorCard mentor={mentor} />
                </div>
              ))}
            </Slider>

            {(this.state.mentorDetails.length > 5 ||
              window.innerWidth < 720) && (
              <div
                className="absolute right-1 top-36 bg-gray-50 rounded-2xl"
                onClick={this.next}
              >
                <button className="button rounded-2xl h-[65px] w-[69px] p-4 pl-5">
                  <img
                    src={right}
                    alt="right"
                    className="h-6 w-6"
                    loading="lazy"
                  />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {this.state.mentorDetails.map((mentor, index) => (
              <div
                className="shadow-lg shadow-slate-500/40 rounded-[15px]"
                key={index}
              >
                <MentorCard mentor={mentor} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(CarouselDiscover);
