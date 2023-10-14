import React from "react";
import { useNavigate } from "react-router-dom";

const withStore = (WrappedComponent) => {
  return (props) => {
    return <WrappedComponent {...props} store={{ value: 20 }} />;
  };
};

const Child = function (props) {
  const navigate = useNavigate();

  const jumpToPost = () => {
    navigate("/post");
  };

  return (
    <div>
      Child Value: {props.store.value}
      <button onClick={jumpToPost}>to post</button>
    </div>
  );
};

export default withStore(Child);
