import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";

/**
 * PurgeCSS:
 * bg-[#FBFAF5]
 * bg-[#0000FF]
 * bg-[#ffdf00]

  */

class ExploreCarousel extends Component {
  constructor() {
    super();
    this.onSearch = this.onSearch.bind(this);
  }

  // componentDidMount() {
  //   MainService.exploreConsultingCompanies()
  //     .then((response) => {
  //       this.setState({ explore: response.data });
  //     })
  //     .catch((err) => console.log(err));
  // }

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
              <div className="z-10 flex flex-col items-center justify-center">
                <img
                  loading="lazy"
                  src={company.image_url}
                  alt="1"
                  className="w-30 h-28 px-20"
                />
                <h1 className="text-2xl text-slate-100 font-Helvetica">
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
