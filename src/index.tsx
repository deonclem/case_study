import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom"
import "./tailwind-generated.css"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { Spin } from "antd"
import store from "./store"

// Lazy loading main pages
const Home = lazy(() => import("./pages/Home/index"))

const App: React.FC = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="text-center pt-12">
            <Spin></Spin>
          </div>
        }
      >
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Suspense>
    </Router>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
