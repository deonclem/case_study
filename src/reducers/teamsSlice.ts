import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TeamsState {
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

const initialState: TeamsState = {
  teams: undefined,
  users: undefined,
}

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    fetchTeams: () => {},
    fetchTeamsSucceeded: (
      state: TeamsState,
      action: PayloadAction<Array<ITeam>>,
    ) => {
      state.teams = action.payload
    },
  },
})

export const { fetchTeams, fetchTeamsSucceeded } = teamsSlice.actions

export default teamsSlice
