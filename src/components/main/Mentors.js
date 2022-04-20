import React, { Component } from "react";
import img1 from "../../assets/images/artwork/at.png";

/**
 * PurgeCSS:
 * bg-[#FD8498]
 * bg-[#3960FE]
 * bg-[#F6C859]

  */

export default class Mentors extends Component {
  constructor() {
    super();
    this.state = {
      explore: [
        {
          img: "MCKINSKY",
          bg: "#FD8498",
        },
        {
          name: "MCKINSKY",
          bg: "#3960FE",
        },
        {
          name: "MCKINSKY",
          bg: "#F6C859",
        },
        {
          name: "MCKINSKY",
          bg: "#F6C859",
        },
      ],
    };
  }
  render() {
    return (
      <div className="grid grid-cols lg:grid-cols-4 grid-cols-1 pt-10 gap-y-2">
        {this.state.explore.map((mentor, index) => (
          <div className="flex flex-col py-2 items-center justify-center">
            <img src={img1} alt="1" className="w-[150px] h-[54px]" />
          </div>
        ))}
      </div>
    );
  }
}
