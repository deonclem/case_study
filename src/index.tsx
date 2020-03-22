import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom"
import "./tailwind-generated.css"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider, useSelector, useDispatch } from "react-redux"
import { Spin } from "antd"
import store, { AppDispatch } from "./store"
import { fetchPeople } from "./reducers/peopleSlice"
import { AppState } from "./reducers/rootReducer"

// Lazy loading main pages
const Home = lazy(() => import("./pages/Home/index"))
const Scheme = lazy(() => import("./pages/Scheme/index"))

const App: React.FC = () => {
  const teams = useSelector((state: AppState) => state.people.teams)

  const dispatch = useDispatch<AppDispatch>()

  if (!teams) {
    dispatch(fetchPeople())
    return (
      <div className="text-center pt-12">
        <Spin tip="Loading data..."></Spin>
      </div>
    )
  }

  return (
    <div className="max-w-screen-md m-auto pt-12">
      <Router>
        <Suspense
          fallback={
            <div className="text-center">
              <Spin tip="Loading page..."></Spin>
            </div>
          }
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/scheme/:teamId" component={Scheme} />
          </Switch>
        </Suspense>
      </Router>
    </div>
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
