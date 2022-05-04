import React, { Component } from "react";
import img1 from "../../assets/images/mentee/1.png";
import calender from "../../assets/images/design/Icons/calender.png";
import profiledesigns from "../../assets/images/design/profiledesigns.png";

export default class Profile extends Component {
  render() {
    return (
      <div className="flex flex-col overflow-hidden pb-10">
        <div>
          <img src={profiledesigns} alt="bg" className="w-full" />
        </div>
        <div className="flex-col justify-left -mt-16 mx-5 sm:mx-10 lg:mx-40 md:mx-16">
          <div className="sm:flex  items-center">
            <img
              src={img1}
              alt="ProfileImage"
              className="rounded-full border-solid border-white w-24 h-24 sm:w-44 sm:h-44 md:w-52 md:h-52 border-8 sm:-mt-5 mt-4"
            />
            <div className="flex-col sm:pt-8 text-left items-center sm:pl-10">
              <p className="text-[32px] font-bold text-[#797979] font-poppins pt-1">
                Anjali Bhati
              </p>
              <p className="font-poppins font-normal text-[#797979] text-[16px[">
                UX Designer at Deloitte
              </p>
            </div>
          </div>
          <div className="flex-col mt-10">
            <h1 className="text-[#5B6BD0] font-semibold font-poppins text-[24px]">
              Overview
            </h1>
            <div className="flex">
              <hr className="bg-[#5B6BD0] mt-3 py-[2px] rounded w-28" />
              <hr className="bg-[#F2F2F2] mt-3 py-[2px] rounded w-full" />
            </div>
            <div className="grid md:grid-cols-2">
              <div className="grid gap-y-3">
                <p className="font-Helvetica font-normal text-[#273150] py-5 lg:text-xl md:text-lg sm:text-md text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi.”
                </p>
                <div className="grid gap-y-2">
                  <h1 className="text-[#565656] font-semibold font-poppins lg:text-xl md:text-lg sm:text-md text-sm">
                    Experience
                  </h1>
                  <div className="flex items-center mt-2">
                    <img
                      src={img1}
                      alt="ProfileImage"
                      className="w-[38px] h-[38px]"
                    />
                    <div className="flex-col text-left items-center px-3">
                      <p className="lg:text-[18px] md:text-lg sm:text-md text-sm font-semibold text-[#565656] font-poppins">
                        UX Analyst
                      </p>
                      <p className="font-poppins font-normal text-[#797979] text-[12px] text-sm">
                        Delhi Governemnt I 2020--2021
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <img
                      src={img1}
                      alt="ProfileImage"
                      className="w-[38px] h-[38px]"
                    />
                    <div className="flex-col text-left items-center px-3">
                      <p className="lg:text-[18px] md:text-lg sm:text-md text-sm font-semibold text-[#565656] font-poppins">
                        UX Analyst
                      </p>
                      <p className="font-poppins font-normal text-[#797979] text-[12px] text-sm">
                        Delhi Governemnt I 2020--2021
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-y-2">
                  <h1 className="text-[#565656] font-semibold font-poppins lg:text-xl md:text-lg sm:text-md text-sm">
                    Education
                  </h1>
                  <div className="flex items-center mt-2">
                    <img
                      src={img1}
                      alt="ProfileImage"
                      className="w-[38px] h-[38px]"
                    />
                    <div className="flex-col text-left items-center px-3">
                      <p className="lg:text-[18px] md:text-lg sm:text-md text-sm font-semibold text-[#565656] font-poppins">
                        UX Analyst
                      </p>
                      <p className="font-poppins font-normal text-[#797979] text-[12px] text-sm">
                        Delhi Governemnt I 2020--2021
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <img
                      src={img1}
                      alt="ProfileImage"
                      className="w-[38px] h-[38px]"
                    />
                    <div className="flex-col text-left items-center px-3">
                      <p className="lg:text-[18px] md:text-lg sm:text-md text-sm font-semibold text-[#565656] font-poppins">
                        UX Analyst
                      </p>
                      <p className="font-poppins font-normal text-[#797979] text-[12px] text-sm">
                        Delhi Governemnt I 2020--2021
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-y-2">
                  <h1 className="text-[#565656] font-semibold font-poppins lg:text-xl md:text-lg sm:text-md text-sm">
                    Expertise
                  </h1>
                  <div className="flex gap-x-3 items-center font-Helvetica font-bold text-[12px]">
                    <span
                      className="text-[#8F6EC5] rounded-md p-1 px-2"
                      style={{ background: "rgba(212, 195, 240, 0.5)" }}
                    >
                      Research
                    </span>
                    <span
                      className="text-[#F4864D] rounded-md p-1 px-2"
                      style={{ background: "rgba(251, 227, 215, 0.5)" }}
                    >
                      Prototyping
                    </span>
                    <span
                      className="text-[#29ACE4] rounded-md p-1 px-2"
                      style={{ background: "rgba(180,229,250, 0.5)" }}
                    >
                      Testing
                    </span>
                  </div>
                </div>
              </div>

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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
