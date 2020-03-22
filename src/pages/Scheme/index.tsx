import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "../../reducers/rootReducer"
import { useParams, Link, useHistory } from "react-router-dom"
import { Button } from "antd"
import Steps from "./Steps"
import { AppDispatch } from "../../store"
import { saveScheme } from "../../reducers/schemesSlice"

/**
 * For a specific Team, will display the list of existing threesholds and allow the user to create or update one
 */
const Scheme: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()
  const { teamId } = useParams()
  const teamScheme = useSelector((state: AppState) => state.schemes)
  const team = useSelector((state: AppState) =>
    state.people.teams?.find(team => team.id === teamId),
  )

  if (!teamId || !team) {
    // Bad team ID passed as params
    history.push("/")
    return <></>
  }

  // Get existing scheme or init a new one if it doesn't exist
  const scheme = teamScheme[teamId] || {
    teamId,
    steps: [],
  }

  // Will save the schemes and persist them to local storage
  const saveTeamScheme = () => {
    dispatch(saveScheme({ teamId }))
  }

  return (
    <div>
      <Button>
        <Link to="/">← Back to teams </Link>
      </Button>
      <h2 className="my-4 text-lg">
        {(scheme && "Approval Scheme of the " + team.name + " team") ||
          "No approval scheme yet for the " + team.name + " team"}
      </h2>
      <Steps scheme={scheme} team={team} />
      <Button className="mt-2" onClick={saveTeamScheme}>
        Save Scheme
      </Button>
    </div>
  )
}

export default Scheme
