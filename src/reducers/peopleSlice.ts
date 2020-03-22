import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface PeopleState {
  teams: Array<ITeam> | undefined
  users: Array<IUser> | undefined
}

export interface ITeam {
  id: string
  name: string
  users: Array<IUser>
}

export interface IUser {
  id: string
  first_name: string
  last_name: string
  email: string
}

const initialState: PeopleState = {
  teams: undefined,
  users: undefined,
}
/**
 * Store Teams and Users
 */
const peopleSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    fetchPeople: () => {},
    fetchPeopleSucceeded: (
      state: PeopleState,
      action: PayloadAction<{ teams: Array<ITeam>; users: Array<IUser> }>,
    ) => {
      state.teams = action.payload.teams
      state.users = action.payload.users
    },
  },
})

export const { fetchPeople, fetchPeopleSucceeded } = peopleSlice.actions

export default peopleSlice
