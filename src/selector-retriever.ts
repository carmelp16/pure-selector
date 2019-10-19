import { createSelector, Selector } from "reselect";
import StateValuesRetriever from "./state-values-retriever";

class SelectorRetriever {
  private stateValuesRetriever: StateValuesRetriever;

  constructor() {
    this.stateValuesRetriever = new StateValuesRetriever();
  }

  getSelector: <StateType, OutputType>(
    stateProperties: string[],
    additionalArgs: any[],
    appliedLogic: (...args: any[]) => OutputType
  ) => Selector<StateType, OutputType> = (
    stateProperties,
    additionalArgs,
    appliedLogic
  ) => {
    return createSelector(
      state =>
        this.stateValuesRetriever.getValueFromState(state, stateProperties),
      () => additionalArgs,
      appliedLogic
    );
  };
}

export default SelectorRetriever;
