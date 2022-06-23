import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrentMentorDetailsRequested } from "../../store/actions/Mentor";
import { withRouter } from "../../utils/withRouter";
import Profile from "./Profile";

class MentorProfile extends Component {
  componentDidMount() {
    this.props.fetchCurrentMentorDetailsRequested();
  }

  render() {
    return <Profile isEdit={true} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentMentorDetailsRequested: () =>
      dispatch(fetchCurrentMentorDetailsRequested()),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(MentorProfile));
