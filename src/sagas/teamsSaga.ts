import { takeEvery, call, put } from "redux-saga/effects"
import backend from "../config/axios"
import {
  ITeam,
  IUser,
  fetchPeopleSucceeded,
  fetchPeople,
} from "../reducers/peopleSlice"

function* runFetchTeams() {
  try {
    let teams = yield call(() => backend.get(`teams`))
    let users = yield call(() => backend.get(`users`))

    // Mapping team users to the full object
    teams = yield mapUsersToTeam(teams, users)

    yield put(fetchPeopleSucceeded({ teams, users }))
  } catch (e) {
    // handle errors
  }
}

function* tasksSaga() {
  yield takeEvery(fetchPeople.type, runFetchTeams)
}

/**
 * Maps the list of userId from a team to the actual User
 * The list of Users is sorted by A-Z order
 * @param teams A list of teams with only User Ids
 * @param users The full list of Users
 */
export function mapUsersToTeam(
  teams: Array<Omit<ITeam, "users"> & { users: string[] }>,
  users: Array<IUser>,
): Array<ITeam> {
  return teams.map(team => ({
    ...team,
    users: (team.users
      .map(userId => users.find(u => u.id === userId))
      .filter(user => user !== undefined) as Array<
      IUser
    >).sort((user1, user2) => user1?.last_name.localeCompare(user2?.last_name)),
  }))
}

export default tasksSaga
