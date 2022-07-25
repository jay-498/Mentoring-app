import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
// Images
import ThirdImageBg from "../../assets/images/home_company_3rd.svg"
import SecondImageBg from "../../assets/images/home_company_2nd.svg"
import FirstImageBg from "../../assets/images/home_company_1st.svg"

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
    this.dynamicStyle = this.dynamicStyle.bind(this);
  }

  onSearch(company) {
    this.props.navigate(`/search?mentor=${company}`);
  }

  dynamicStyle(key){
    const styleMapping = {
      "2" : {
        'backgroundSize' : "62%",
        'backgroundRepeat' : "no-repeat",
        'backgroundImage' : `url('${ThirdImageBg}')`
      },
      "1" : {
        'backgroundSize' : "100%",
        'backgroundRepeat' : "no-repeat",
        'backgroundImage' : `url('${SecondImageBg}')`,
        'backgroundPosition' : '0 85px'
      },
      "0" : {
        'backgroundSize' : "100%",
        'backgroundRepeat' : "no-repeat",
        'backgroundImage' : `url('${FirstImageBg}')`,
        'backgroundPosition' : '145px 0'
      }
    }
    return styleMapping[key]
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
              <div style={this.dynamicStyle(index)} className="flex flex-col items-center justify-center w-full">
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
