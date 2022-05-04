import React, { Component } from "react";
import calender from "../../assets/images/design/Icons/calender.png";
export default class Slots extends Component {
  render() {
    return (
      <div className="flex-col h-[355px] md:mt-0 mt-5 p-5 lg:p-10 lg:m-10 md:m-5 items-center justify-center border border-gray-300 rounded-3xl">
        <div className="flex justify-between">
          <h1 className="font-poppins text-[#565656] font-semibold md:text-[20px] text-md">
            Available Slots
          </h1>
          <img src={calender} alt="calender" title="calender" />
        </div>
        <hr className="bg-[#F2F2F2] my-3 py-[0.125rem] rounded w-FULL" />
        <div className="grid grid-cols-5 gap-x-3 mt-5">
          <div className="flex-col font-semibold font-poppins text-center border border-[#D5D3D3] rounded">
            <p className="text-[10px] text-[#B4B4B4]">Thur</p>
            <p className="text-[14px] text-[#565656]">28 April</p>
            <p className="text-[#5B6BD0] text-[10px]">2 slots</p>
          </div>
          <div className="flex-col font-semibold font-poppins text-center border border-[#D5D3D3] rounded">
            <p className="text-[10px] text-[#B4B4B4]">Thur</p>
            <p className="text-[14px] text-[#565656]">28 April</p>
            <p className="text-[#5B6BD0] text-[10px]">2 slots</p>
          </div>
          <div className="flex-col font-semibold font-poppins text-center border border-[#D5D3D3] rounded">
            <p className="text-[10px] text-[#B4B4B4]">Thur</p>
            <p className="text-[14px] text-[#565656]">28 April</p>
            <p className="text-[#5B6BD0] text-[10px]">2 slots</p>
          </div>
          <div className="flex-col font-semibold font-poppins text-center border border-[#D5D3D3] rounded">
            <p className="text-[10px] text-[#B4B4B4]">Thur</p>
            <p className="text-[14px] text-[#565656]">28 April</p>
            <p className="text-[#5B6BD0] text-[10px] ">2 slots</p>
          </div>
          <div className="flex-col font-semibold font-poppins text-center border border-[#D5D3D3] rounded">
            <p className="text-[10px] text-[#B4B4B4]">Thur</p>
            <p className="text-[14px] text-[#565656]">28 April</p>
            <p className="text-[#5B6BD0] text-[10px]">2 slots</p>
          </div>
        </div>
        <div className="flex-col py-6">
          <div className="flex justify-between">
            <h1 className="font-poppins text-[#565656] font-medium md:text-[20px] text-md">
              Available Slots Time
            </h1>
          </div>
          <div className="grid grid-cols-5 gap-x-5 mt-2">
            <div className="flex-col font-semibold font-poppins text-center border border-[#D5D3D3] rounded">
              <p className="text-[10px] p-1 text-[#565656]">10 am</p>
            </div>
            <div className="flex-col font-semibold font-poppins text-center border border-[#D5D3D3] rounded">
              <p className="text-[10px] p-1 text-[#565656]">2 pm</p>
            </div>
            <div className="flex-col font-semibold font-poppins text-center border border-[#D5D3D3] rounded">
              <p className="text-[10px] p-1 text-[#565656]">5 pm</p>
            </div>
          </div>
        </div>
        <button className="bg-[#5B6BD0] rounded-[5px] w-full text-white font-semibold py-2 font-Helvetica md:text-[18px] text-[10px]">
          Book
        </button>
      </div>
    );
  }
}
