import React, { Component } from "react";
import { withRouter } from "../../utils/withRouter";
import { UpdateLoginModal } from "../../store/actions/booking";
import { connect } from "react-redux";
import calender from "../../assets/images/design/Icons/calender.png";
import dayjs from 'dayjs';
class Slots extends Component {
  constructor(props){
    super(props);
    this.getMonth = this.getMonth.bind(this);
    this.getDay = this.getDay.bind(this);
    
  }


  getMonth(date){
    return (new Date(date)).toLocaleString('en-us', { month: 'short' });
  }

  getDay(date){
    return (new Date(date)).toLocaleString('en-us', { weekday: 'short' });
  }



  handleLoginModal(){
    if(this.props.event.startDate)
    {
      this.props.updateLoginModal(true);
    }
    else{
      alert("Please book your date")
    }
  }

  render() {
    const {currentStartDateIndex,currentStartTimeIndex,availableDates} = this.props;
    return (
      <div className="flex-col h-[355px] p-5 lg:p-10 lg:m-10 md:m-5 items-center justify-center border border-gray-300 rounded-3xl">
        <div className="flex justify-between">
          <h1 className="font-poppins text-[#565656] font-semibold md:text-[20px] text-md">
            Available Slots
          </h1>
          <img src={calender} alt="calender" title="calender" loading="lazy"/>
        </div>
        <hr className="bg-[#F2F2F2] my-3 py-[0.125rem] rounded w-FULL" />
        <div className="grid grid-cols-5 gap-x-3 mt-5">
          {availableDates.map((eachDate,index)=>(
              <button key={index} onClick={()=>this.props.onChangeEventStartDate(index)} 
              className={`font-semibold ${currentStartDateIndex===index ? "border-2 border-[#8F6EC5]":"border border-[#D5D3D3]"} font-poppins text-center  rounded`}>
              <p className="text-[10px] text-[#B4B4B4]">{this.getDay(this.props.formatDate(eachDate.date))}</p>
              <p className="text-[14px] text-[#565656]">{(new Date(this.props.formatDate(eachDate.date))).getDate()} {this.getMonth(this.props.formatDate(eachDate.date))}</p>
              <p className="text-[#5B6BD0] text-[10px]">{eachDate.times.length} Slots</p>
            </button>
          ))}
        </div>
        <div className="flex-col py-6">
          <div className="flex justify-between">
            <h1 className="font-poppins text-[#565656] font-medium md:text-[20px] text-md">
              Available Slots Time
            </h1>
          </div>
          <div className="grid grid-cols-4 gap-x-5 mt-2">
            {availableDates[currentStartDateIndex] && availableDates[currentStartDateIndex].times.map((eachTime,index)=>(
              <button key={index} onClick={()=>this.props.onChangeEventStartTime(index)} 
              className={`font-semibold ${currentStartTimeIndex===index ? "border-2 border-[#8F6EC5]":"border border-[#D5D3D3]"} font-poppins text-center  rounded`}>
                <p className="text-[10px] p-1 text-[#565656]">{eachTime.start_time}-{eachTime.end_time}</p>
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => this.handleLoginModal()}
          className="bg-[#8F6EC5] rounded-[5px] w-full text-white font-semibold py-2 font-Helvetica md:text-[18px] text-[10px]"
        >
          Book
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginModal: (data) => dispatch(UpdateLoginModal(data)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Slots));
