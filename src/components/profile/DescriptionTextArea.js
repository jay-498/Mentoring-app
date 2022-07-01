import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMentorExperienceRequested } from "../../store/actions/Mentor";
import { withRouter } from "../../utils/withRouter";
import pencil from "../../assets/images/svgs/pencil.png";
import cross from "../../assets/images/svgs/cross.png";
import tick from "../../assets/images/svgs/tick.png";

class DescriptionTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      showTextArea: false,
    };
    this.onChangeDescription = this.onChangeDescription.bind(this);
  }

  componentDidMount() {
    this.setState({
      description: this.props.description,
    });
  }

  onChangeDescription = (e) => {
    this.setState((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };

  handleUpdate = () => {
    const { description } = this.state;
    if (description !== "") {
      this.props.updateMentorExperienceRequested({ description });
      this.setState((prev) => {
        return {
          ...prev,
          showTextArea: false,
        };
      });
    }
  };
  render() {
    const { showTextArea } = this.state;
    return (
      <div>
        <div className="flex w-full justify-between items-start">
          <div className="flex w-full mx-1">
            {showTextArea ? (
              <textarea
                className="w-full font-Helvetica border-2 rounded border-gray-300 px-2 py-2 w-full text-sm focus:outline-none  bg-transparent"
                placeholder=" "
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.onChangeDescription}
                rows={5}
              />
            ) : (
              <p className="font-Helvetica font-normal text-[#273150] sm:pt-3 sm:pb-1 pb-0 lg:text-[20px] md:text-lg sm:text-md text-sm">
                {this.state.description}
              </p>
            )}
          </div>
          {this.props.isEdit && (
            <div className="flex-col">
              <div
                onClick={
                  showTextArea
                    ? this.handleUpdate
                    : () =>
                        this.setState({
                          showTextArea: true,
                        })
                }
                className="flex w-[36px] p-2 my-1 cursor-pointer hover:bg-gray-200 rounded-full items-center justify-center gap-x-5"
              >
                <img
                  src={showTextArea ? tick : pencil}
                  alt="U"
                  title="Update"
                />
              </div>
              {showTextArea && (
                <div
                  onClick={() =>
                    this.setState({
                      showTextArea: false,
                    })
                  }
                  className="flex w-[36px] p-2 cursor-pointer hover:bg-gray-200 rounded-full items-center justify-center gap-x-5"
                >
                  <img
                    src={cross}
                    className="hover:bg-gray-200 p-1 rounded-full"
                    alt="x"
                    title="Cancel"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMentorExperienceRequested: (data) =>
      dispatch(updateMentorExperienceRequested(data)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(DescriptionTextArea));
