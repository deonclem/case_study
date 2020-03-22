import React from "react"
import { useSelector } from "react-redux"
import { AppState } from "../../reducers/rootReducer"
import TeamCard from "./TeamCard"

/**
 * Displays the list of Teams
 * Clicking on a Team will send the user to the Approval Scheme of that team
 */
const Home: React.FC = () => {
  const teams = useSelector((state: AppState) => state.people.teams)

  return (
    <div data-testid="teams-container">
      {teams?.map((team, i) => (
        <TeamCard key={i} team={team} />
      ))}
    </div>
  )
}

export default Home
