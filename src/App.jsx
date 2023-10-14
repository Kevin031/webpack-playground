import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import Child from "@/Child";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";

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

  jumpToPost = () => {
    console.log(this.props);
  };

  render() {
    return (
      <BrowserRouter>
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
          <Child />
          <button onClick={() => this.setState({ showLazy: true })}>
            显示lazy child
          </button>
          {this.state.showLazy && (
            <Suspense>
              <LazyChild />
            </Suspense>
          )}
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Posts />} path="/post" />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);
