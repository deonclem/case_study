import React from "react"
import schemesSlice, {
  addStep,
  stepFromChanged,
  stepToChanged,
  stepApproverChanged,
  saveScheme,
} from "../schemesSlice"
import { AnyAction } from "@reduxjs/toolkit"

const emptyInitState = {}
const nonInitState = {
  "5": {
    teamId: "5",
    steps: [{ from: 0, to: 100, approver: "User1" }],
  },
}

describe("SchemesSlice", () => {
  it("should init the state", () => {
    expect(schemesSlice.reducer(undefined, {} as AnyAction)).toEqual(
      emptyInitState,
    )
  })

  it("should add a step to an empty scheme", () => {
    expect(
      schemesSlice.reducer(emptyInitState, {
        type: addStep.type,
        payload: { teamId: "5" },
      }),
    ).toEqual({
      "5": {
        teamId: "5",
        steps: [{ from: undefined, to: undefined, approver: undefined }],
      },
    })
  })

  it("should add a step to an exixting scheme", () => {
    expect(
      schemesSlice.reducer(nonInitState, {
        type: addStep.type,
        payload: { teamId: "5" },
      }),
    ).toEqual({
      "5": {
        teamId: "5",
        steps: [
          {
            from: 0,
            to: 100,
            approver: "User1",
          },
          { from: undefined, to: undefined, approver: undefined },
        ],
      },
    })
  })

  it("should change the from value of a step", () => {
    expect(
      schemesSlice.reducer(nonInitState, {
        type: stepFromChanged.type,
        payload: { teamId: "5", stepIndex: 0, newVal: 4 },
      }),
    ).toEqual({
      "5": {
        teamId: "5",
        steps: [
          {
            from: 4,
            to: 100,
            approver: "User1",
          },
        ],
      },
    })
  })

  it("should change the to value of a step", () => {
    expect(
      schemesSlice.reducer(nonInitState, {
        type: stepToChanged.type,
        payload: { teamId: "5", stepIndex: 0, newVal: 10 },
      }),
    ).toEqual({
      "5": {
        teamId: "5",
        steps: [
          {
            from: 0,
            to: 10,
            approver: "User1",
          },
        ],
      },
    })
  })

  it("should change the approver of a step", () => {
    expect(
      schemesSlice.reducer(nonInitState, {
        type: stepApproverChanged.type,
        payload: { teamId: "5", stepIndex: 0, newVal: "User2" },
      }),
    ).toEqual({
      "5": {
        teamId: "5",
        steps: [
          {
            from: 0,
            to: 100,
            approver: "User2",
          },
        ],
      },
    })
  })

  it("should clear the non-valid steps when saving", () => {
    expect(
      schemesSlice.reducer(
        {
          "5": {
            teamId: "5",
            steps: [
              { from: 0, to: 100, approver: "User1" },
              { from: undefined, to: undefined, approver: undefined },
            ],
          },
        },
        {
          type: saveScheme.type,
          payload: { teamId: "5" },
        },
      ),
    ).toEqual({
      "5": {
        teamId: "5",
        steps: [
          {
            from: 0,
            to: 100,
            approver: "User1",
          },
        ],
      },
    })
  })
})
