import { cl } from "./color";
import { StartScreenWrapper, TimerWrapper } from "./styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../Button";
import { API_URL } from "../../config/config";
import myInfoButton from "./Primary.png";
import { NONAME } from "dns";

const StartPage = (): JSX.Element => {
  const handleStart = () => {
    callAuthoriseApi();
  };

  const handleContinue = () => {
    window.location.replace("https://supportgowhere.life.gov.sg/eligibility");
  };

  let state = Math.floor(Math.random() * 100000);

  const [allValues, setAllValues] = useState({
    clientId: "",
    redirectUrl: "",
    attributes: "",
    purpose: "",
    environment: "",
    authApiUrl: "",
  });

  useEffect(() => {
    axios
      .get(API_URL + "/getEnv")
      .then((response) => {
        console.log(response);
        for (let res of Object.keys(response.data)) {
          console.log(res, response.data[res]);
          setAllValues((prevValues) => {
            return { ...prevValues, [res]: response.data[res] };
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // ---START---AUTH API---
  const callAuthoriseApi = () => {
    var authoriseUrl =
      allValues.authApiUrl +
      "?client_id=" +
      allValues.clientId +
      "&attributes=" +
      allValues.attributes +
      "&purpose=" +
      allValues.purpose +
      "&state=" +
      encodeURIComponent(state) +
      "&redirect_uri=" +
      allValues.redirectUrl;
    (window as Window).location = authoriseUrl;
  };

  return (
    <StartScreenWrapper>
      <header>
        <i className="fas fa-clipboard-check text-5xl" />
        <h1 className="heading--h3">{"Support Recommender"}</h1>
        <p>
          {
            "Answer a few questions to find schemes and services you may be eligible for."
          }
        </p>
      </header>

      <TimerWrapper>
        <i className="far fa-clock" aria-hidden />
        <span className="visually-hidden">{"2 mins"}</span>
      </TimerWrapper>

      <br />
      <Button
        colorScheme="info"
        style={{ backgroundColor: cl.blue.reg, borderColor: cl.blue.reg }}
        onClick={handleContinue}
      >
        {"Continue"}
      </Button>
      <TimerWrapper>
        <Button
          style={{ border: NONAME, padding: 0, marginTop: 10 }}
          onClick={handleStart}
        >
          <img src={myInfoButton} alt="MyInfo" />
        </Button>
      </TimerWrapper>
    </StartScreenWrapper>
  );
};

export { StartPage as Start };
