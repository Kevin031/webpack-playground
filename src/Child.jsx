import React from "react";

const withStore = (WrappedComponent) => {
  return (props) => {
    return <WrappedComponent {...props} store={{ value: 20 }} />;
  };
};

@withStore
class Child extends React.Component {
  render() {
    return <div>Child Value: {this.props.store.value}</div>;
  }
}

export default Child;
