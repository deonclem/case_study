import React from "react"
import { IUser, ITeam } from "../../reducers/peopleSlice"
import { mapUsersToTeam } from "../teamsSaga"

describe("Teams Saga", () => {
  test("map Users to Team", () => {
    const user1 = {
      id: "user1",
      first_name: "bob",
      last_name: "paul",
      email: "bob@john",
    }
    const user2 = {
      id: "user2",
      first_name: "tom",
      last_name: "john",
      email: "tom@paul",
    }
    const users: Array<IUser> = [user1, user2]
    const teams: Array<Omit<ITeam, "users"> & { users: string[] }> = [
      {
        id: "team1",
        users: ["user1", "user2"],
        name: "Team",
      },
    ]
    expect(mapUsersToTeam(teams, users)).toEqual([
      {
        id: "team1",
        users: [user2, user1],
        name: "Team",
      },
    ])
  })
})
