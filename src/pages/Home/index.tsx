import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchTeams } from "../../reducers/teamsSlice"
import { Spin } from "antd"
import { AppDispatch } from "../../store"
import { AppState } from "../../reducers/rootReducer"
import TeamCard from "./TeamCard"

const Home: React.FC = () => {
  const teams = useSelector((state: AppState) => state.teams.teams)

  const dispatch = useDispatch<AppDispatch>()

  if (!teams) {
    dispatch(fetchTeams())
    return (
      <div className="max-w-md m-auto pt-12">
        <Spin tip="Loading..."></Spin>
      </div>
    )
  }

  return (
    <div className="px-8 pt-12 max-w-md m-auto" data-testid="teams-container">
      {teams.map((team, i) => (
        <TeamCard key={i} team={team} />
      ))}
    </div>
  )
}

export default Home
