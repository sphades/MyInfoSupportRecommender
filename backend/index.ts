import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { APP_CONFIG, MYINFO_CONNECTOR_CONFIG } from "./config/config.js";
import MyInfoConnector from "myinfo-connector-nodejs";
import { randomBytes } from "crypto";
const config = require("./config/config.js");

dotenv.config();

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());
const port = process.env.PORT;

// Get the environment variables (app info) from the config
app.get("/getEnv", function (req, res) {
  try {
    if (
      APP_CONFIG.DEMO_APP_CLIENT_ID == undefined ||
      APP_CONFIG.DEMO_APP_CLIENT_ID == null
    ) {
      res.status(500).send({
        error: "Missing Client ID",
      });
    } else {
      res.status(200).send({
        clientId: APP_CONFIG.DEMO_APP_CLIENT_ID,
        redirectUrl: APP_CONFIG.DEMO_APP_CALLBACK_URL,
        attributes: APP_CONFIG.DEMO_APP_SCOPES,
        purpose: APP_CONFIG.DEMO_APP_PURPOSE,
        environment: APP_CONFIG.ENVIRONMENT,
        authApiUrl: APP_CONFIG.MYINFO_API_AUTHORISE,
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({
      error: error,
    });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

app.post(
  "/getPersonData",
  function (req: { body: { authCode: any; state: any } }, res: any, next: any) {
    try {
      // get variables from frontend
      var authCode = req.body.authCode;
      var state = req.body.state;
      var txnNo = randomBytes(10).toString("hex");

      let connector = new MyInfoConnector(config.MYINFO_CONNECTOR_CONFIG);
      console.log("Calling MyInfo NodeJs Library...");

      connector
        .getMyInfoPersonData(authCode, state, txnNo)
        .then((personData: any) => {
          let url = "https://supportgowhere.life.gov.sg/eligibility";
          console.log(JSON.stringify(personData)); // log the data for demonstration purpose only
          /* 
        P/s: Your logic to handle the person data ...
        */
          url = query(personData);

          console.log(
            "--- Sending Person Data From Your-Server (Backend) to Your-Client (Frontend)---:"
          );

          res.status(200).send(url);
          //console.log(JSON.stringify(personData)); // log the data for demonstration purpose only
          //res.status(200).send(personData); //return personData
        })
        .catch((error: any) => {
          console.log("---MyInfo NodeJs Library Error---");
          console.log(error);
          res.status(500).send({
            error: error,
          });
        });
    } catch (error) {
      console.log("Error", error);
      res.status(500).send({
        error: error,
      });
    }
  }
);

const findEmploymentStatus = (personData: any): string => {
  // TODO: fix buggy code
  const cpfHistory = personData.cpfcontributions.history;
  const pastTime = new Date(cpfHistory[cpfHistory.length - 1].date.value);
  const now = new Date("28/7/22"); //can't use now cos test data is problematic
  const thirtyOneDaysInMs = 31 * 24 * 60 * 60 * 1000;
  const timeDiffInMs = now.getTime() - pastTime.getTime();
  console.log(timeDiffInMs);
  if (!personData.residentialstatus.code || timeDiffInMs <= thirtyOneDaysInMs) {
    return "EMPLOYED"; //foreigners have to be employed
    // people with CPF contribution in the last month should also be employed
  }
  if (!personData.noahistory[0]) {
    return "STUDENT"; //No past history of income
  }
  if (!cpfHistory) {
    console.log(cpfHistory);
    return "UNEM_NOT_SEARCHING"; //only show up to 15 months
  }
  if (personData.noahistory[0]) {
    return "SELF_EMPLOYED"; //No past history of income
  }
  return "UNEM_SEARCHING";
  // super hacky, alot of edge cases unaccounted for. to be revisited
};

const findOwnership = (personData: any): string => {
  if (personData.ownerprivate.value || personData.hdbownership[0]) return "YES";

  return "NO";
};

const findTypeOfProperty = (personData: any): string => {
  if (personData.housingtype.code) return "PRIVATE";
  let hdbtype = personData.hdbtype.code;
  switch (hdbtype) {
    case 111:
      return "PUBLIC_1R_2R";
    case 112:
      return "PUBLIC_1R_2R";
    case 113:
      return "PUBLIC_3R_4R";
    case 114:
      return "PUBLIC_3R_4R";
    default:
      return "PUBLIC_OTHER";
  }
};

const findChildrenAge = (personData: any): string => {
  // Do you have any children age 21 and below
  if (personData.childrenbirthrecords[0]) return "YES";

  return "NO";
};

const calculateHouseholdIncome = (personData: any): string => {
  //rough estimate, cpf is 37% of income and below,
  return "2000";
};

const calculatePerCapitaIncome = (personData: any): string => {
  return "YES";
};

const childCitizenship = (personData: any): string => {
  return "YES";
};

const query = (personData: any): string => {
  let birthYear = personData.dob.value.substring(0, 4);
  let nationality = personData.nationality.code;
  let employmentStatus: string = findEmploymentStatus(personData);
  let ownerOfProperty: string = findOwnership(personData);
  let typeOfProperty: string = findTypeOfProperty(personData);
  let childrenAge = findChildrenAge(personData);

  let defaultURL = `https://supportgowhere.life.gov.sg/eligibility/results?affectedByCovid[]=LOST_JOB|REDUCED_INCOME|HOUSEHOLD_CONTRACTED_COVID|HOUSEHOLD_QO_SHN|FDW_QO_SHN&birthYear=${birthYear}&category[]=FINANCIAL|FAMILIES_PARENTING|EDUCATION|HOUSING|WORK|MENTAL_HEALTH|HEALTHCARE|SENIORS|DISABILITY&childCitizenship[]=SG|PR|OTHERS&citizenship=${nationality}}&employmentStatus=${employmentStatus}&hasChildEqualOrBelow21=${childrenAge}&monthlyHouseholdIncome=2000&monthlyPerCapitaIncome=500&needsAssistanceAsPwd=YES&ownsPropertyOfResidence=${ownerOfProperty}&typeOfPropertyOfResidence=${typeOfProperty}`;

  return defaultURL;
};
