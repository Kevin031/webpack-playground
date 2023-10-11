import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import Child from "@/Child";
import banner from "@/assets/img/banner.jpeg";

const LazyChild = lazy(() =>
  import(
    /* webpackPrefetch: true */
    "./LazyChild"
  )
);

class App extends React.Component {
  state = {
    num: 1,
    showLazy: false,
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
        <button onClick={() => this.setState({ showLazy: true })}>
          显示lazy child
        </button>
        {this.state.showLazy && (
          <Suspense>
            <LazyChild />
          </Suspense>
        )}
      </div>
    );
  }
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);
