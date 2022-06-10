import React, { Component } from "react";
import img1 from "../../assets/images/mentee/Group 9546.png";
import img2 from "../../assets/images/mentee/Group 9547.png";
import img3 from "../../assets/images/mentee/Group 9548.png";
import Mentor from "../mentor";
import MainService from "../../services/main.service";

/**
 * PurgeCSS:
 * bg-[#FBFAF5]
 * bg-[#0000FF]
 * bg-[#ffdf00]

  */

export default class ExploreCarousel extends Component {
  constructor() {
    super();
    this.state = {
      explore: [],
    };
  }

  componentDidMount() {
    MainService.exploreConsultingCompanies()
      .then((response) => {
        this.setState({ explore: response.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="grid grid-cols lg:grid-cols-3 grid-cols-1 pt-10 gap-y-2">
        {this.state.explore.map((mentor, index) => (
          <div className="flex justify-center items-center" key={index}>
            <div
              className={`flex bg-[${mentor.template_color}] w-[350px] h-[205px] rounded-[20px]`}
            >
              <div className="z-10 flex flex-col items-center justify-center">
                <img
                  loading="lazy"
                  src={mentor.image_url}
                  alt="1"
                  className="w-30 h-28 px-20"
                />
                <h1 className="text-2xl text-slate-100 font-Helvetica">
                  {mentor.name}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
