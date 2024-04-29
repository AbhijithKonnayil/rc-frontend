import React from 'react';
export class State {
  static initial = "initial";
  static loading = "loading";
  static success = "success";
  static failed = "failed";
}
export function Loading() {
  return (
    <div>Loading</div>
  )
}

export function Failed() {
  return (
    <div>Failed</div>
  )
}

export function StateBuilder({ state, successUi, InitialUi = <div>initial</div>, LoadingUi = <Loading />, FailedUi = <Failed /> }) {
  //console.log(`state : ${state}`)
  switch (state) {
    case State.initial:
      return InitialUi
      break;
    case State.loading:
      return LoadingUi
      break;
    case State.success:
      return successUi
      break;
    case State.failed:
      return FailedUi
      break;
  }
};