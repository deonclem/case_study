import React from "react"
import { ITeam } from "../../reducers/teamsSlice"
import { Card } from "antd"

const TeamCard: React.FC<{ team: ITeam }> = ({ team }) => {
  return (
    <Card
      size="small"
      title={team.name}
      style={{ marginBottom: 10 }}
      extra={<a href="#">See Approvers</a>}
    >
      <strong>Users:</strong>
      {team.users.slice(0, 3).map((user, i) => (
        <div key={i}>
          {user.last_name}&nbsp;
          {user.first_name}
        </div>
      ))}
      {team.users.length > 3 && <div>(+ {team.users.length - 3} more)</div>}
    </Card>
  )
}

export default TeamCard
