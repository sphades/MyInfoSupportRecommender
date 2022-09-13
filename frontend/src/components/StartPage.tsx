import { Button } from "./Button";
import { cl } from "./color";
import { StartScreenWrapper, TimerWrapper } from "./StartPage.styles";
import React, { useEffect } from "react";
import axios from "axios";

const Start = (): JSX.Element => {
  const handleStart = () => {
    //wogaa.startTransactionalService("supportgowhere-3933");
    //return nav(Section.Section1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/getEnv")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  // function callAuthoriseApi() {
  //   var authoriseUrl =
  //     authApiUrl +
  //     "?client_id=" +
  //     clientId +
  //     "&attributes=" +
  //     attributes +
  //     "&purpose=" +
  //     purpose +
  //     "&state=" +
  //     encodeURIComponent(state) +
  //     "&redirect_uri=" +
  //     redirectUrl;

  //   window.location = authoriseUrl;
  // }

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
        onClick={handleStart}
      >
        {"Continue"}
      </Button>
    </StartScreenWrapper>
  );
};

export { Start };
