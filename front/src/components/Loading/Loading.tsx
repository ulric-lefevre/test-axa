import ReactLoading from "react-loading";

import "./Loading.scss";

const Loading = () => (
  <div className="loading">
    <ReactLoading type="spinningBubbles" color="#fff" />
    <span>Loading ...</span>
  </div>
);

export default Loading;
