import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMentorDetailsRequested } from "../../store/actions/Mentor";
import { withRouter } from "../../utils/withRouter";
import Profile from "./Profile";

class MentorDetails extends Component {
  componentDidMount() {
    const id = this.props.params.id;
    this.props.fetchMentorDetailsRequested({ id });
  }
  render() {
    return <Profile isEdit={false} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMentorDetailsRequested: (data) =>
      dispatch(fetchMentorDetailsRequested(data)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(MentorDetails));
