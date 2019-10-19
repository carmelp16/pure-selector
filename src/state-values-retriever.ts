class StateValuesRetriever {
  getValueFromState: <StateType>(
    state: StateType,
    properties: string[]
  ) => any = (state, properties) => {
    const [firstProperty, ...restOfProperties] = properties;

    let returnedValue: any = (state as any)[firstProperty];

    for (let property of restOfProperties) {
      if (returnedValue === undefined || returnedValue === null) {
        return null;
      }

      returnedValue = returnedValue[property];
    }

    return returnedValue;
  };
}

export default StateValuesRetriever;
