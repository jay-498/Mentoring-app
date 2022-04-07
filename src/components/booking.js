import React, { Component } from 'react'
import Mentor from "./mentor";
import Calender from "./calender";
import profile from '../assets/mentor.jpg';

class Booking extends Component {
  render() {
    return (
      <div className="flex bg-grey text-center">
          <div className="py-10 pl-10"><Mentor pic={profile} name={"Jim Cantrell"} bio={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."}/></div>
          <div className="py-12"><Calender pic={profile} /></div>
      </div>
    )
  }
}

export default Booking;
