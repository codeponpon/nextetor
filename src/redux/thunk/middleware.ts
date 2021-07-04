import { ActionType } from "../actions/types";

const internalProcess = async (dataApi: any, dispatch: any) => {
  const {
    action,
    payload = {},
    beforeCallType,
    successType,
    errorType,
    next = (f: any) => f,
  } = dataApi;
  console.log("Data API ", dataApi);
  try {
    dispatch({ type: "START_LOADING" });

    if (beforeCallType) {
      dispatch({ type: beforeCallType });
    }

    next(null, payload);

    if (successType) {
      dispatch({ type: successType, payload: payload });
    }

    return payload;
  } catch (error) {
    next(error);
    if (errorType) {
      dispatch({ type: errorType, payload: error });
    }
    throw error;
  }
};

const middleware =
  ({ dispatch }: any) =>
  (next: any) =>
  (action: any) => {
    console.log("Action ", action);
    switch (action.type) {
      case ActionType.INTERNAL_REQUEST:
        return internalProcess(action.payload, dispatch);
      default:
        return next(action);
    }
  };

export default middleware;
