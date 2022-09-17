import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config/config";

const Redirect = () => {
  const params = new URLSearchParams(window.location.search);
  const authCode = params.get("code");
  const state = params.get("state");
  //   const [personData,setPersonData] = useState();
  // frontend only wants a url to redirect towards
  useEffect(() => {
    axios
      .post(API_URL + "/getPersonData", { authCode, state })
      .then((response) => {
        console.log(response);
        window.location.replace(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return null;
};

export default Redirect;
