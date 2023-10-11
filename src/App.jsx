import React from "react";
import { createRoot } from "react-dom/client";
import Child from "./Child";
import banner from "./assets/img/banner.jpeg";

class App extends React.Component {
  state = {
    num: 1,
  };

  render() {
    return (
      <div>
        <h1>react component</h1>
        <div className="bg" />
        <div>当前状态:{this.state.num}</div>
        <button
          onClick={() => {
            this.setState({ num: this.state.num + 1 });
          }}
        >
          +1
        </button>
        {/* <img src={banner} /> */}
        <Child />
      </div>
    );
  }
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);
