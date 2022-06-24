import React, { Component } from "react";
import { connect } from "react-redux";
import avatar from "../../assets/images/mentee/1.png";
import cross from "../../assets/images/svgs/cross.png";
import downarrow from "../../assets/images/svgs/downarrow.png";
import {
  fetchMentorEventRequested,
  updateBookingModal,
} from "../../store/actions/booking";
import { withRouter } from "../../utils/withRouter";

class RoundedUser extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.roundref = React.createRef();
    this.bookingref = React.createRef();
    this.viewref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.props.fetchMentorEventRequested({ type: "A" });
    this.props.fetchMentorEventRequested({ type: "U" });
    this.props.fetchMentorEventRequested({ type: "P" });
    window.addEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.roundref.current &&
      !this.roundref.current.contains(event.target)
    ) {
      if (!this.ref.current.classList.contains("hidden")) {
        this.handleDropDown();
      }
    }
  };

  logout() {
    this.props.logOut();
    this.interval = setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  handleDropDown = () => {
    this.ref.current.classList.toggle("hidden");
  };

  handleBookingDropdown = () => {
    this.bookingref.current.classList.toggle("hidden");
    this.viewref.current.classList.toggle("hidden");
  };

  render() {
    const { logOut } = this.props;
    return (
      <>
        <div
          className="flex items-center md:order-2"
          style={{ position: "relative" }}
        >
          <button
            type="button"
            // ref={this.roundref}
            className="flex rounded-full"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
            onClick={this.handleDropDown}
          >
            <img
              className="w-[42px] h-[42px] rounded-full"
              src={`https://ui-avatars.com/api/?name=mentor&bold=true&rounded=true&background=8f6ec5`}
              title="Profile"
              alt=""
            />
          </button>
          <div
            ref={this.ref}
            className="hidden z-50 md:w-[300px] w-[260px] my-4 text-base list-none px-4 bg-white rounded-md shadow"
            id="dropdown"
            style={{ position: "absolute", right: "0px", top: "40%" }}
          >
            <div className="flex justify-between items-center py-3">
              <div>
                <img
                  src={`https://ui-avatars.com/api/?name=mentor&bold=true&rounded=true&background=8f6ec5`}
                  className="w-[42px] h-[42px] rounded-full"
                  alt="Avatar"
                />
              </div>
              <div className="flex justify-center items-center gap-x-3">
                <img src={cross} alt="close" onClick={this.handleDropDown} />
              </div>
            </div>
            <div className="flex-col divide-y">
              <div className="pb-2">
                <p className="text-[20px]  font-roboto font-medium">
                  {this.props.userName}
                </p>
                {this.props.userType === "M" && (
                  <a
                    className="text-[14px] pt-2 font-poppins  font-medium"
                    href={`/me`}
                  >
                    My Profile
                  </a>
                )}
              </div>
              <div className="flex-col relative w-full inline-block text-left px-2">
                <div
                  className="flex w-full justify-between items-center"
                  onClick={this.handleBookingDropdown}
                >
                  <p className="text-[14px] font-medium py-1">My Bookings</p>
                  <img src={downarrow} alt="arrow" />
                </div>
                <div
                  ref={this.viewref}
                  className="flex text-[14px] font-medium text-[#b8b8b8] py-2"
                >
                  <p>View & manage your booking</p>
                </div>
                <div
                  ref={this.bookingref}
                  className="hidden flex text-base list-none px-4"
                  id="dropdown"
                >
                  <div className="bg-gray-300 h-[84px] w-[1px]"></div>
                  <div className="flex-col justify-between items-center py-1 text-[14px] font-medium">
                    <div className="flex items-center justify-start py-1">
                      <div className="bg-gray-300 h-[1px] w-[10px] mr-3"></div>
                      <p onClick={() => this.props.updateBookingModal(1)}>
                        All
                      </p>
                    </div>
                    <div className="flex items-center justify-center py-1">
                      <div className="bg-gray-300 h-[1px] w-[10px] mr-3"></div>
                      <p onClick={() => this.props.updateBookingModal(2)}>
                        Upcoming
                      </p>
                    </div>
                    <div className="flex items-center justify-start py-1">
                      <div className="bg-gray-300 h-[1px] w-[10px] mr-3"></div>
                      <p onClick={() => this.props.updateBookingModal(3)}>
                        Past
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full justify-between items-center"
                  onClick={() => this.logout()}
                >
                  <p className="text-[14px] font-medium pb-2">Logout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ booking, Login }) => {
  return {
    userName: Login.userName,
    userType: Login.userType,
    bookingModal: booking.bookingModal,
    AllEvents: booking.AllEvents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBookingModal: (data) => dispatch(updateBookingModal(data)),
    fetchMentorEventRequested: (data) =>
      dispatch(fetchMentorEventRequested(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RoundedUser));
