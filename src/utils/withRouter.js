import { useNavigate, useParams } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    return (
      <Component navigate={useNavigate()} params={useParams()} {...props} />
    );
  };

  return Wrapper;
};
