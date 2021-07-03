import { notification } from "antd";
import router from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import AuthStorage from "./auth-storage";
import { SignInInput, User } from "@/generated/backend";
import { ILogin } from "@/redux/actions/types";
import React from "react";

const fetchApi = async (state: any, cb = (f: any) => f) => {
  const { action, payload } = state;
  try {
    if (process.env.NODE_ENV === "development") {
      console.log("------");
    }

    if (process.env.NODE_ENV === "development") {
      console.log("------");
    }

    // cb(null, {});
    return {};
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.log("Call API Error: ", err);
    }

    if (process.browser) {
      notification.error({
        message: "Oops!",
        description: err.error?.message || err.message || err.toString(),
      });
    }

    if (err.statusCode === 403 || err.statusCode === 401) {
      // AuthStorage.destroy();
      // dispatch({ type: 'LOGOUT_SUCCESS' });
      if (process.browser) {
        router.replace("/forbidden");
      }
    }

    cb(err);
    throw err;
  }
};

export default fetchApi;
