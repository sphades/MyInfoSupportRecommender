import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { APP_CONFIG, MYINFO_CONNECTOR_CONFIG } from "./config/config.js";
import MyInfoConnector from "myinfo-connector-nodejs";
import { randomBytes } from "crypto";
import axios from "axios";

dotenv.config();

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());
const port = process.env.PORT;

let sandboxData: any;

// calls for sandbox person data on server start
axios
  .get("https://sandbox.api.myinfo.gov.sg/com/v3/person-sample/S9812381D")
  .then((res) => {
    sandboxData = res.data;
  })
  .catch((error) => {
    console.error(error);
  });

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

// Health check to ensure server is running
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

// Make API call to MyInfo server
app.post(
  "/getPersonData",
  function (req: { body: { authCode: any; state: any } }, res: any, next: any) {
    try {
      // get variables from frontend
      const authCode = req.body.authCode;
      const state = req.body.state;
      const txnNo = randomBytes(10).toString("hex");

      const connector = new MyInfoConnector(MYINFO_CONNECTOR_CONFIG);
      console.log("Calling MyInfo NodeJs Library...");

      connector
        .getMyInfoPersonData(authCode, state, txnNo)
        .then((personData: any) => {
          let url = "https://supportgowhere.life.gov.sg/eligibility";
          console.log(JSON.stringify(personData)); // log the data for demonstration purpose only
          /* 
        P/s: Your logic to handle the person data ...
        */
          // Since test/sandbox both doesn't allow you to get any other data than the given scope, i need to use sandbox
          // api to test

          // url = query(personData);

          url = query(sandboxData);

          console.log(
            "--- Sending Person Data From Your-Server (Backend) to Your-Client (Frontend)---:"
          );

          res.status(200).send(url);
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
  const cpfHistory = personData.cpfcontributions.history;
  const pastTime = new Date(cpfHistory[cpfHistory.length - 1].date.value);
  const now = new Date("28/7/22"); //can't use today cos test data is unaccurate
  const thirtyOneDaysInMs = 31 * 24 * 60 * 60 * 1000;
  const timeDiffInMs = now.getTime() - pastTime.getTime();
  console.log(timeDiffInMs);
  if (!personData.residentialstatus.code || timeDiffInMs <= thirtyOneDaysInMs) {
    return "EMPLOYED";
    //foreigners have to be employed
    // people with CPF contribution in the last month should also be employed
  }
  if (!personData.noahistory[0]) {
    return "STUDENT";
    //No past history of income
  }
  if (!cpfHistory) {
    console.log(cpfHistory);
    return "UNEM_NOT_SEARCHING";
    // cpf history only show up to 15 months
  }
  if (personData.noahistory[0]) {
    return "SELF_EMPLOYED";
    //No past history of income
  }
  return "UNEM_SEARCHING";
};

// function checks for ownership of HDB or Private property
const findOwnership = (personData: any): string => {
  if (personData.ownerprivate.value || personData.hdbownership[0]) return "YES";
  return "NO";
};

const findTypeOfProperty = (personData: any): string => {
  if (personData.housingtype.code) return "PRIVATE";
  const hdbtype = personData.hdbtype.code;
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

//household income no longer available in myinfo, assumption made
const calculateHouseholdIncome = (personData: any): string => {
  return "2000";
};

//no household income, can't calculate per capita income
const calculatePerCapitaIncome = (personData: any): string => {
  return "500";
};

const childCitizenship = (personData: any): string => {
  return "SG";
};

const query = (personData: any): string => {
  const birthYear = personData.dob.value.substring(0, 4);
  const nationality = personData.nationality.code;
  const employmentStatus: string = findEmploymentStatus(personData);
  const ownerOfProperty: string = findOwnership(personData);
  const typeOfProperty: string = findTypeOfProperty(personData);
  const childrenAge = findChildrenAge(personData);

  const defaultURL = `https://supportgowhere.life.gov.sg/eligibility/results?affectedByCovid[]=LOST_JOB|REDUCED_INCOME|HOUSEHOLD_CONTRACTED_COVID|HOUSEHOLD_QO_SHN|FDW_QO_SHN&birthYear=${birthYear}&category[]=FINANCIAL|FAMILIES_PARENTING|EDUCATION|HOUSING|WORK|MENTAL_HEALTH|HEALTHCARE|SENIORS|DISABILITY&childCitizenship[]=SG|PR|OTHERS&citizenship=${nationality}&employmentStatus=${employmentStatus}&hasChildEqualOrBelow21=${childrenAge}&monthlyHouseholdIncome=2000&monthlyPerCapitaIncome=500&needsAssistanceAsPwd=YES&ownsPropertyOfResidence=${ownerOfProperty}&typeOfPropertyOfResidence=${typeOfProperty}`;
  return defaultURL;
};
