import axios from "axios";
import React, { useEffect } from "react";
import { API_URL } from "../config/config";

const Redirect = () => {
  const params = new URLSearchParams(window.location.search);
  const authCode = params.get("code");
  const state = params.get("state");

  useEffect(() => {
    axios
      .post(API_URL + "/getPersonData", { authCode, state })
      .then((response) => {
        console.log(response);
        window.location.replace(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div style={{ alignItems: "center" }}>Redirecting </div>;
};

export default Redirect;
