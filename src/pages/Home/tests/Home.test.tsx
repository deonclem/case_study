import React from "react"
import { render } from "@testing-library/react"
import Home from ".."
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { AppState } from "../../../reducers/rootReducer"
import { IUser, ITeam } from "../../../reducers/peopleSlice"
import { BrowserRouter as Router } from "react-router-dom"

describe("Home component", () => {
  test("renders 1 team", () => {
    const user: IUser = {
      id: "user",
      first_name: "first",
      last_name: "last",
      email: "email",
    }

    const team: ITeam = {
      id: "team",
      name: "Team name",
      users: [user],
    }
    // mocking store for component
    const initialState: Partial<AppState> = {
      people: { teams: [team], users: [user] },
    }
    const mockStore = configureStore()
    const store = mockStore(initialState)

    const { getByText, getByTestId } = render(
      <Router>
        <Provider store={store}>
          <Home />
        </Provider>
      </Router>,
    )
    expect(getByTestId("teams-container")).toBeTruthy()
    expect(getByText(/team name/i)).toBeInTheDocument()
  })
})
