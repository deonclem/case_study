import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const LOCALE_STORAGE_SCHEMES = "spendesk_schemes"

export type SchemesState = { [teamId: string]: IScheme }

export interface IScheme {
  teamId: string
  steps: Array<ISchemeStep>
}

export interface ISchemeStep {
  from?: number
  to?: number
  approver?: string
}

const initialState: SchemesState = JSON.parse(
  localStorage.getItem(LOCALE_STORAGE_SCHEMES) || "{}",
)

/**
 * Store a dictionnary of Schemes, with a TeamId as key
 * A Scheme is a series of steps, one step is made of a "From" value, a "To" value and the ID of an Approver
 */
const schemesSlice = createSlice({
  name: "schemes",
  initialState,
  reducers: {
    addStep: (
      state: SchemesState,
      action: PayloadAction<{ teamId: string }>,
    ) => {
      if (!state[action.payload.teamId]) {
        state[action.payload.teamId] = {
          teamId: action.payload.teamId,
          steps: [],
        }
      }
      state[action.payload.teamId].steps.push({
        from: undefined,
        to: undefined,
        approver: undefined,
      })
    },
    stepFromChanged: (
      state: SchemesState,
      action: PayloadAction<{
        teamId: string
        stepIndex: number
        newVal: number
      }>,
    ) => {
      state[action.payload.teamId].steps[action.payload.stepIndex].from =
        action.payload.newVal
    },
    stepToChanged: (
      state: SchemesState,
      action: PayloadAction<{
        teamId: string
        stepIndex: number
        newVal: number
      }>,
    ) => {
      state[action.payload.teamId].steps[action.payload.stepIndex].to =
        action.payload.newVal
    },
    stepApproverChanged: (
      state: SchemesState,
      action: PayloadAction<{
        teamId: string
        stepIndex: number
        newVal: string
      }>,
    ) => {
      state[action.payload.teamId].steps[action.payload.stepIndex].approver =
        action.payload.newVal
    },
    saveScheme: (
      state: SchemesState,
      action: PayloadAction<{ teamId: string }>,
    ) => {
      // remove invalid steps and save the whole store to locale storage
      state[action.payload.teamId].steps = state[
        action.payload.teamId
      ].steps.filter(
        step =>
          step.approver !== undefined &&
          step.from !== undefined &&
          step.to !== undefined,
      )

      localStorage.setItem(LOCALE_STORAGE_SCHEMES, JSON.stringify(state))
    },
  },
})

export const {
  addStep,
  stepFromChanged,
  stepToChanged,
  stepApproverChanged,
  saveScheme,
} = schemesSlice.actions

export default schemesSlice
