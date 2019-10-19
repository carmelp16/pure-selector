import { useMemo } from "react";
import { useSelector } from "react-redux";
import isEqual from "lodash/isEqual";
import SelectorRetriever from "./selector-retriever";
import ArgumentsParser from "./arguments-parser";

export type PureSelectorReturn<OutputType> = {
  data: OutputType;
};

function usePureSelector<StateType, OutputType>(
  stateProperties: string[],
  ...restOfArgs: any[]
): PureSelectorReturn<OutputType> {
  const memoizedSelector = useMemo(() => {
    const argumentsParser = new ArgumentsParser();
    const selectorRetriever = new SelectorRetriever();
    const { data, logic } = argumentsParser.separateArgumentsIntoDataAndLogic<
      OutputType
    >(restOfArgs);
    return selectorRetriever.getSelector<StateType, OutputType>(
      stateProperties,
      data,
      logic
    );
  }, [stateProperties, ...restOfArgs]);

  const data: OutputType = useSelector(memoizedSelector, isEqual);

  return {
    data
  };
}

export default usePureSelector;
