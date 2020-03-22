import React from "react"
import {
  ISchemeStep,
  stepFromChanged,
  stepToChanged,
  stepApproverChanged,
} from "../../reducers/schemesSlice"
import { Card, InputNumber, Select } from "antd"
import { IUser, ITeam } from "../../reducers/peopleSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"

const { Option } = Select

interface ISchemeStepProps {
  team: ITeam
  step: Partial<ISchemeStep>
  index: number
  users?: Array<IUser>
}

/**
 * Displays a single threeshold
 */
const SchemeStep: React.FC<ISchemeStepProps> = ({
  team,
  step,
  index,
  users = [],
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const onMinChange = (e: number | undefined) => {
    dispatch(
      stepFromChanged({
        teamId: team.id,
        stepIndex: index,
        newVal: e || 0,
      }),
    )
  }
  const onMaxChange = (e: number | undefined) => {
    dispatch(
      stepToChanged({
        teamId: team.id,
        stepIndex: index,
        newVal: e || 0,
      }),
    )
  }
  const onApproverChange = (e: string) => {
    dispatch(
      stepApproverChanged({
        teamId: team.id,
        stepIndex: index,
        newVal: e,
      }),
    )
  }
  return (
    <Card size="small" title={"Threeshold " + (index + 1)}>
      <div className="mb-2">
        From&nbsp;
        {
          <InputNumber
            min={0}
            defaultValue={step.from}
            onChange={onMinChange}
          />
        }
        &nbsp;To{" "}
        {<InputNumber min={0} defaultValue={step.to} onChange={onMaxChange} />}
      </div>
      <div>
        Approver{" "}
        {
          <Select
            defaultValue={step.approver}
            style={{ width: 250 }}
            onChange={onApproverChange}
          >
            {users.map(user => (
              <Option key={user.id} value={user.id}>
                {user.last_name} {user.first_name}
              </Option>
            ))}
          </Select>
        }
      </div>
    </Card>
  )
}

export default SchemeStep
