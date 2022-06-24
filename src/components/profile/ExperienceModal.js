import React, { Component } from "react";

// Store
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { setErrorMessage } from "../../store/actions/Login";
import {
  fetchCompaniesRequested,
  updateMentorExperienceRequested,
} from "../../store/actions/Mentor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditModal.css";
import group from "../../assets/images/svgs/Group.png";

class ExperienceModal extends Component {
  constructor() {
    super();
    this.state = {
      endDate_type: "text",
      startDate_type: "text",
      experience: {
        job_title: "",
        company: "",
        start_date: "",
        end_date: "",
        industry: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchCompaniesRequested();
    if (this.props.isEdit) {
      const { company } = this.props;
      this.setState((prev) => {
        return {
          ...prev,
          experience: {
            job_title: company.job_title,
            start_date: this.dateFormat(company.start_date),
            company: company.company._id,
            end_date: this.dateFormat(company.end_date) || "",
            industry: company?.industry || "",
          },
        };
      });
    }
  }

  dateFormat = (date) => {
    let x = new Date(date);
    return (
      "date",
      ("0" + x.getDate()).slice(-2) +
        " " +
        x.toLocaleString("default", { month: "long" }) +
        " " +
        x.getFullYear()
    );
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    let new_form_data = { ...this.state.experience };
    new_form_data[name] = value;
    this.setState({ experience: new_form_data });
  };

  validate = () => {
    const { company, start_date, job_title } = this.state.experience;
    if (company === "" || start_date === "" || job_title === "") {
      return false;
    }
    return true;
  };

  handleSubmitExperience = () => {
    const { experience } = this.state;
    const { companies } = this.props.mentor;
    //replacing companies with company id
    const modifiedCompanies = companies.map((company) => {
      return { ...company, company: company.company._id };
    });
    if (!this.props.isEdit) {
      if (this.validate()) {
        this.props.updateMentorExperienceRequested({
          companies: [...modifiedCompanies, { ...experience }],
        });
      }
    } else {
      const { company } = this.props;
      //company updated
      const EditedCompany = {
        ...company,
        job_title: experience.job_title,
        company: experience.company,
        start_date: experience.start_date,
        end_date: experience.end_date,
        industry: experience.industry,
      };
      //finding the index of the company to update
      const itemIndex = modifiedCompanies.findIndex(
        (company) => company.company === EditedCompany.company
      );
      //updating the index
      if (itemIndex > -1) {
        modifiedCompanies[itemIndex] = EditedCompany;
      }
      if (this.validate()) {
        this.props.updateMentorExperienceRequested({
          companies: [...modifiedCompanies],
        });
      }
    }
    this.props.handleExperienceModal();
  };

  handleSubmitDeleteExperience = () => {
    const { companies } = this.props.mentor;
    //removing the company
    const modifiedCompanies = companies.filter(
      (company) => company._id !== this.props.company._id
    );
    //replacing the company with company id
    const modified_Companies = modifiedCompanies.map((company) => {
      return { ...company, company: company.company._id };
    });
    this.props.updateMentorExperienceRequested({
      companies: [...modified_Companies],
    });
    this.props.handleExperienceModal();
  };

  render() {
    const { companies } = this.props;
    return (
      <>
        <div
          className={`flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full md:h-full`}
          id="popup-modal"
          style={{ backgroundColor: "rgb(0 ,0 ,0,0.1)" }}
        >
          <div className="flex justify-center items-center p-4 w-full h-full md:h-auto">
            <div className="flex justify-center items-center relative w-full min-w-xs max-w-xl h-full md:h-auto">
              <div className=" relative w-full rounded-lg bg-white shadop-2">
                <div className="flex justify-between items-center w-full p-4">
                  <h1 className="text-center p-1.5 pl-3.5 font-poppins tracking-[0.18px] font-semibold text-[#989898] text-[20px]">
                    Add Experience
                  </h1>
                  <button
                    type="button"
                    onClick={() => this.props.handleExperienceModal()}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="popup-modal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="w-full">
                  <div className="rounded p-5 pt-0 mb-4">
                    <div className="mb-6">
                      <div className="relative">
                        <input
                          className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                          id="job_title"
                          name="job_title"
                          value={this.state.experience.job_title}
                          onChange={(e) => this.handleChange(e)}
                          type="text"
                          placeholder=" "
                        />
                        <label
                          htmlFor="Titlename"
                          className="font-poppins absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] 
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                                peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                        >
                          Position Name
                        </label>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="relative">
                        <select
                          className="block font-poppins appearance-none w-full bg-gray-100 border focus:outline-none focus:ring-0 focus:border-[#8F6EC5] text-gray-700 py-2 px-3 pr-8 rounded leading-tight"
                          id="grid-state"
                          name="company"
                          // defaultValue={}
                          value={this.state.experience.company}
                          onChange={(e) => this.handleChange(e)}
                        >
                          <option>Select Company</option>
                          {companies.map((company, index) => (
                            <option value={company._id} key={index}>
                              {company.name}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* <div className="mb-6">
                      <div className="relative">
                        <input
                          className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                          id="Companyname"
                          name="company_name"
                          value={this.state.fdivlastname}
                          onChange={(e) => this.handleChange(e)}
                          type="text"
                          placeholder=" "
                        />
                        <label
                          htmlFor="Companyname"
                          className="font-poppins absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] 
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                                peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                        >
                          Company Name
                        </label>
                      </div>
                    </div> */}

                    {/* <div className="mb-6">
                                <div className="relative">
                                <input
                                className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                                id="EmploymentType"
                                name="employment_type"
                                value={this.state.fdivlastname}
                                onChange={(e) => this.handleChange(e)}
                                type="text"
                                placeholder=" "
                                />
                                <label htmlFor="EmploymentType" className="font-poppins absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] 
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                                peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Employment Type</label>
                                </div>
                            </div> */}

                    <div className="grid grid-cols-2 gap-x-5 mb-6">
                      <div className="relative">
                        <input
                          className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                          id="StartDate"
                          name="start_date"
                          value={this.state.experience.start_date}
                          onChange={(e) => this.handleChange(e)}
                          type={this.state.startDate_type}
                          placeholder=" "
                          onFocus={(e) =>
                            this.setState({ startDate_type: "date" })
                          }
                          onBlur={(e) =>
                            this.setState({ startDate_type: "text" })
                          }
                        />
                        {this.state.startDate_type === "text" && (
                          <img
                            src={group}
                            alt="date"
                            className="absolute top-3 right-3"
                          />
                        )}
                        <label
                          htmlFor="StartDate"
                          className="font-poppins absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] 
                                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                                  peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                        >
                          Start Date
                        </label>
                      </div>

                      <div className="relative items-center">
                        <input
                          className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                          id="EndDate"
                          name="end_date"
                          value={this.state.experience.end_date}
                          onChange={(e) => this.handleChange(e)}
                          type={this.state.endDate_type}
                          placeholder=" "
                          onFocus={(e) =>
                            this.setState({ endDate_type: "date" })
                          }
                          onBlur={(e) =>
                            this.setState({ endDate_type: "text" })
                          }
                        />
                        {this.state.endDate_type === "text" && (
                          <img
                            src={group}
                            alt="date"
                            className="absolute top-3 right-3"
                          />
                        )}
                        <label
                          htmlFor="EndDate"
                          className="font-poppins absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] 
                                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                                  peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                        >
                          End Date
                        </label>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="relative">
                        <input
                          className="border-2 border-gray-300 block px-2.5 pb-2 pt-3 w-full text-sm  bg-transparent rounded appearance-none focus:outline-none focus:ring-0 focus:border-[#8F6EC5] peer"
                          id="Industry"
                          name="industry"
                          value={this.state.experience.industry}
                          onChange={(e) => this.handleChange(e)}
                          type="text"
                          placeholder=" "
                        />
                        <label
                          htmlFor="Industry"
                          className="font-poppins absolute text-sm text-[#2D333A] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#8F6EC5] 
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
                                peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                        >
                          Industry
                        </label>
                      </div>
                    </div>

                    {/* <div>
                      <div className="relative">
                        <input
                          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label font-poppins font-normal text-[16px] text-[#2d333A] inline-block text-gray-800"
                          htmlFor="flexCheckDefault"
                        >
                          I am currently working here
                        </label>
                      </div>
                    </div> */}

                    <div
                      className={`flex ${
                        this.props.isEdit ? "justify-between" : "justify-end"
                      }  items-center`}
                    >
                      {this.props.isEdit && (
                        <button
                          onClick={this.handleSubmitDeleteExperience}
                          className="bg-[#8F6EC5] rounded-[5px] text-[16px] font-medium text-white font-semibold py-2 px-5 font-Helvetica md:text-[18px] text-[10px]"
                        >
                          Delete
                        </button>
                      )}
                      <button
                        onClick={this.handleSubmitExperience}
                        className="bg-[#8F6EC5] rounded-[5px] text-[16px] font-medium text-white font-semibold py-2 px-5 font-Helvetica md:text-[18px] text-[10px]"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

const mapStateToProps = ({ booking, Mentor }) => {
  return {
    showModal: booking.showLoginModal,
    companies: Mentor.companies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setErrorMessage: (data) => dispatch(setErrorMessage(data)),
    updateMentorExperienceRequested: (data) =>
      dispatch(updateMentorExperienceRequested(data)),
    fetchCompaniesRequested: () => dispatch(fetchCompaniesRequested()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ExperienceModal));
