import peopleSlice from "./peopleSlice"
import schemesSlice from "./schemesSlice"
import { combineReducers, PayloadAction } from "@reduxjs/toolkit"

export type PayloadActionWithResolve<T> = {
  onResolve?: (data?: any) => void
} & PayloadAction<T>

const rootReducer = combineReducers({
  people: peopleSlice.reducer,
  schemes: schemesSlice.reducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
