type DataAndLogic<OutputType> = {
  data: any[];
  logic: (params: any[]) => OutputType;
};

class ArgumentsParser {
  separateArgumentsIntoDataAndLogic = <OutputType>(args: string[]) => {
    const argsLength = args.length;
    const maxIndex = argsLength - 1;

    let result: DataAndLogic<OutputType> = {
      data: [],
      logic: null
    };

    const logicToBeApplied = args[maxIndex];

    if (typeof logicToBeApplied !== "function") {
      return result;
    }

    const indexesWithoutMaxIndex = Object.keys(args).filter(
      index => Number(index) !== maxIndex
    );

    const argsAsAny: any = args as any;

    const argsWithoutLogic = indexesWithoutMaxIndex.map(
      index => argsAsAny[index]
    );

    const isThereAnotherFunction =
      argsWithoutLogic.find(arg => typeof arg === "function") !== undefined;

    if (isThereAnotherFunction) {
      return result;
    }

    result.data = argsWithoutLogic;
    result.logic = logicToBeApplied;

    return result;
  };
}

export default ArgumentsParser;
