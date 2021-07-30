import AuthStorage from "@/utils/auth-storage";
import { useDispatch } from "react-redux";
import { ActionType } from "@/redux/actions/types";
import { Dispatch } from "react";

interface ICreateProjectProps {
  name: string;
  dispatch: Dispatch<any>;
}
interface IProject {
  id: string;
  name: string;
  accountId: string;
  updatedAt: number;
  createdAt: number;
}

const apiUrl = process.env.VERCEL_API_URL;

const headers = {
  method: "GET",
  body: "",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AuthStorage.vercel.token}`,
  },
};

export const VercelCreateProject = async ({
  name,
  dispatch,
}: ICreateProjectProps) => {
  try {
    const option = {
      ...headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        gitRepository: {
          type: process.env.GAME_CLIENT_REPOSITORY_TYPE,
          repo: process.env.GAME_CLIENT_REPOSITORY_NAME,
        },
      }),
    };
    const response = await fetch(apiUrl, option);
    const data = await response.json();
    return data;
  } catch (error) {
    await dispatch({ type: ActionType.REQUEST_ERROR, payload: error });
  }
};
