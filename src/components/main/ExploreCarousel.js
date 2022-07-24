import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";

/**
 * PurgeCSS:
 * bg-[#FBFAF5]
 * bg-[#0a7d56]
 * bg-[#2867b2]
 * bg-[#0a1f3c]
  */

class ExploreCarousel extends Component {
  constructor() {
    super();
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(company) {
    this.props.navigate(`/search?mentor=${company}`);
  }

  render() {
    return (
      <div className="grid grid-cols lg:grid-cols-3 md:grid-cols-2 pt-10 gap-y-2">
        {this.props.companies.map((company, index) => (
          <div className="flex justify-center items-center" key={index}>
            <div
              onClick={() => this.onSearch(company.name)}
              className={`flex cursor-pointer bg-[${company.template_color}] w-[350px] h-[205px] rounded-[20px]`}
            >
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  loading="lazy"
                  src={company.image_url}
                  alt="1"
                  className="w-30 h-20 px-20"
                />
                <h1 className="text-3xl font-bold text-slate-100 font-Helvetica">
                  {company.name}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ Mentor }) => {
  return {
    companies: Mentor.companies,
  };
};

export default connect(mapStateToProps, null)(withRouter(ExploreCarousel));
