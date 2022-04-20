import React from "react";
import { useState } from "react";
import menuopen from "../../assets/svgs/menuopen.svg";
import search from "../../assets/images/design/Search.png";
import menuopen2 from "../../assets/svgs/menuopen3.svg";
import menuclose from "../../assets/svgs/menuclose.svg";
import { useLocation } from "react-router-dom";

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const location = useLocation().pathname;
  return (
    <>
      <nav className="relative flex flex-wrap md:mx-20 mx-10 items-center justify-between py-3">
        <div className="flex flex-row w-full xl:w-0 items-center mr-auto">
          <div className="w-full relative flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start">
            <div>
              <a
                className="text-[28px] font-semibold font-poppins leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  text-gray"
                href="#pablo"
              >
                Company Name
              </a>
            </div>
            <div>
              <button
                className="cursor-pointer text-xl leading-none px-3 py-1 rounded block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <img src={navbarOpen ? menuclose : menuopen2} alt="menuopen" />
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            "lg:flex items-center justify-start xs:flex-col " +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col md:flex-row list-none xl:ml-auto gap-x-8">
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-[18px] leading-snug text-gray"
                href="#pablo"
              >
                <span
                  className={`ml-2 ${
                    location === "/" ? "text-[#A36EBA]" : "text-[#999FAE]"
                  } font-normal font-Helvetica hover:text-[#A36EBA]`}
                >
                  Home
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-[18px] leading-snug text-gray"
                href="#pablo"
              >
                <span
                  className={`ml-2 ${
                    location === "/about" ? "text-[#A36EBA]" : "text-[#999FAE]"
                  } font-normal font-Helvetica hover:text-[#A36EBA]`}
                >
                  About
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-[18px] leading-snug text-gray"
                href="#pablo"
              >
                <span
                  className={`ml-2 ${
                    location === "/pricing"
                      ? "text-[#A36EBA]"
                      : "text-[#999FAE]"
                  } font-normal font-Helvetica hover:text-[#A36EBA]`}
                >
                  Pricing
                </span>
              </a>
            </li>
          </ul>
          <div
            className={
              "lg:flex rounded my-4 pl-10 hidden" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <div className="hidden rounded relative  md:mr-0 md:block">
              <div
                className="flex absolute inset-y-0 left-0 items-center pl-3 pt-1 
              pointer-events-none"
              >
                <img src={search} alt="search" className="w-5 h-5 opacity-40" />
              </div>
              <input
                type="text"
                id="email-adress-icon"
                className="block p-2 pl-10 w-[417px] outline-none h-10 text-[#999FAE] placeholder:font-normal placeholder:text-[16px] 
                    placeholder:text-[#999FAE] rounded-[5px] placeholder:tracking-[-0.04em]"
                placeholder="Search"
                style={{ backgroundColor: "rgba(114, 114, 114,0.1)" }}
              />
            </div>
            <div className="hidden relative lg:ml-6 md:mr-0 md:block">
              <button
                className="bg-[#8F6EC5] text-[18px] h-[40px] text-center font-Helvetica 
              text-white font-bold py-2 w-[112px] rounded-[5px]"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
