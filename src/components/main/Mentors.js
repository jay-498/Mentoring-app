import React, { Component } from "react";
import zen from "../../assets/images/artwork/zendeskcolor.png";
import linkedin from "../../assets/images/artwork/linkedincolor.png";
import reddit from "../../assets/images/artwork/redditcolor.png";
import att from "../../assets/images/artwork/ATTCOLOR.png";

/**
 * PurgeCSS:
 * bg-[#FD8498]
 * bg-[#3960FE]
 * bg-[#F6C859]
 * h-[40px]

  */

export default class Mentors extends Component {
  constructor() {
    super();
    this.state = {
      companies: [
        {
          image: reddit,
          height: 50
        },
        {
          image: att,
          height: 50
        },
        {
          image: linkedin,
          height: 40
        },
        {
          image: zen,
          height: 40
        }
      ],
    };
  }
  render() {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 sm:pt-10 gap-y-2">
        {this.state.companies.map((logo, index) => (
          <div
            className="flex py-2 items-center justify-center"
            key={index}
          >
            <img
              loading="lazy"
              src={logo.image}
              alt="1"
              className={`opacity-50 h-[${logo.height}px] grayscale`}
            />
          </div>
        ))}
      </div>
    );
  }
}
