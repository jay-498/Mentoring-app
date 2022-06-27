import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import img1 from "../../assets/images/1.png";
import img2 from "../../assets/images/2.png";
import img3 from "../../assets/images/3.png";
import img4 from "../../assets/images/4.png";
// import left from "../../assets/images/design/left.png";
import right from "../../assets/images/design/right.png";
import left from "../../assets/images/svgs/arrow-left.png";
import MainService from "../../services/main.service";
import { withRouter } from "../../utils/withRouter";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    MainService.getCategories()
      .then((response) => {
        let tempCategories = [...response.data.data];
        this.setState((prevState) => ({
          ...prevState,
          categories: tempCategories,
        }));
      })
      .catch((err) => console.log(err));
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  onSearch(tag) {
    this.props.navigate(`/search?mentor=${tag}`);
  }

  render() {
    const settings = {
      arrows: false,
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
            infinite: true,
          },
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
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
      <div className="relative pt-5 mx-7">
        {this.state.categories.length > 4 && (
          <div
            className="absolute lg:top-[110px] bg-gray-50 rounded-2xl z-10  sm:top-[110px] md:top-[70px] top-[97px] left-0"
            onClick={this.previous}
          >
            <button className="button  h-15 w-15 p-4">
              <img src={left} alt="left" className="h-6 w-6" loading="lazy" />
            </button>
          </div>
        )}
        <div className="px-4">
          <Slider ref={(c) => (this.slider = c)} {...settings}>
            {this.state.categories.map((mentor, index) => (
              <div key={mentor._id} className="flex rounded-[20px]">
                <div
                  className="relative cursor-pointer"
                  onClick={() => this.onSearch(mentor.name)}
                >
                  <div
                    className="absolute px-5 inset-0 z-10 rounded-[20px] text-center flex items-center justify-center"
                    style={{ background: "rgba(0, 0, 0, 0.35)" }}
                  >
                    <h1 className="lg:text-xl text-lg md:text-xl w-full text-white font-bold font-poppins tracking-[.13em]">
                      {mentor.name}
                    </h1>
                  </div>
                  <div className="max-w-[350px]">
                    <img
                      src={mentor.img_url}
                      alt="1"
                      loading="lazy"
                      className="rounded-[20px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {this.state.categories.length > 4 && (
          <div
            className="absolute right-0 z-10 bg-gray-50 rounded-2xl
             lg:top-[110px] sm:top-[110px] md:top-[70px] top-[97px]"
            onClick={this.next}
          >
            <button className="button  h-15 w-15 p-4">
              <img src={right} alt="right" className="h-6 w-6" loading="lazy" />
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Gallery);
