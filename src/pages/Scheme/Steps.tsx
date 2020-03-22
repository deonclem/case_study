import React from "react"
import { Button } from "antd"
import { IScheme, addStep } from "../../reducers/schemesSlice"
import SchemeStep from "./SchemeStep"
import { ITeam } from "../../reducers/peopleSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"

interface IStepsProps {
  team: ITeam
  scheme: IScheme
}

/**
 * Displays the list of steps for a scheme, with the "Add a threeshold" button
 */
const Steps: React.FC<IStepsProps> = ({ team, scheme }) => {
  const dispatch = useDispatch<AppDispatch>()
  const addNewStep = () => {
    dispatch(addStep({ teamId: team.id }))
  }
  return (
    <div>
      {scheme.steps.map((step, i) => (
        <div className="mb-2" key={i}>
          <SchemeStep index={i} team={team} step={step} users={team.users} />
        </div>
      ))}
      <Button className="mt-2" onClick={() => addNewStep()}>
        + Add a threeshold
      </Button>
    </div>
  )
}

export default Steps
