import { notification } from "antd";
import { AnyAction } from "redux";
import { ActionType } from "@/redux/actions/types";

interface IProps {
  sending: boolean;
}

export const initialState: IProps = {
  sending: false,
};

const reducer = (state: IProps = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.TOGGLE_LOADING:
      return { sending: !state.sending };
    case ActionType.START_LOADING:
      return { sending: true };
    case ActionType.STOP_LOADING:
      return { sending: false };
    case ActionType.REQUEST_ERROR:
      if (process.browser) {
        notification.error({
          message: "Oops!",
          description:
            typeof action?.payload === "string"
              ? action?.payload
              : action?.payload?.message || "Something went wrong!!",
        });
      }
      return { sending: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
