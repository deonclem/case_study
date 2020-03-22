import React from "react"
import { ITeam } from "../../reducers/peopleSlice"
import { Card } from "antd"
import { Link } from "react-router-dom"

/**
 * Displays the details of a Team
 * Limit the display to only the first 3 users
 * @param param0
 */
const TeamCard: React.FC<{ team: ITeam }> = ({ team }) => {
  return (
    <Card
      size="small"
      title={team.name}
      style={{ marginBottom: 10 }}
      extra={<Link to={"/scheme/" + team.id}>See approving scheme</Link>}
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
