"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const config_js_1 = require("./config/config.js");
const myinfo_connector_nodejs_1 = __importDefault(require("myinfo-connector-nodejs"));
const crypto_1 = require("crypto");
const config = require("./config/config.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
const port = process.env.PORT;
// Get the environment variables (app info) from the config
app.get("/getEnv", function (req, res) {
    try {
        if (config_js_1.APP_CONFIG.DEMO_APP_CLIENT_ID == undefined ||
            config_js_1.APP_CONFIG.DEMO_APP_CLIENT_ID == null) {
            res.status(500).send({
                error: "Missing Client ID",
            });
        }
        else {
            res.status(200).send({
                clientId: config_js_1.APP_CONFIG.DEMO_APP_CLIENT_ID,
                redirectUrl: config_js_1.APP_CONFIG.DEMO_APP_CALLBACK_URL,
                attributes: config_js_1.APP_CONFIG.DEMO_APP_SCOPES,
                purpose: config_js_1.APP_CONFIG.DEMO_APP_PURPOSE,
                environment: config_js_1.APP_CONFIG.ENVIRONMENT,
                authApiUrl: config_js_1.APP_CONFIG.MYINFO_API_AUTHORISE,
            });
        }
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).send({
            error: error,
        });
    }
});
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
app.post("/getPersonData", function (req, res, next) {
    try {
        // get variables from frontend
        var authCode = req.body.authCode;
        var state = req.body.state;
        var txnNo = (0, crypto_1.randomBytes)(10).toString("hex");
        let connector = new myinfo_connector_nodejs_1.default(config.MYINFO_CONNECTOR_CONFIG);
        console.log("Calling MyInfo NodeJs Library...");
        connector
            .getMyInfoPersonData(authCode, state, txnNo)
            .then((personData) => {
            let url = "https://supportgowhere.life.gov.sg/eligibility";
            console.log(JSON.stringify(personData)); // log the data for demonstration purpose only
            /*
          P/s: Your logic to handle the person data ...
          */
            url = query(personData);
            console.log("--- Sending Person Data From Your-Server (Backend) to Your-Client (Frontend)---:");
            res.status(200).send(url);
            //console.log(JSON.stringify(personData)); // log the data for demonstration purpose only
            //res.status(200).send(personData); //return personData
        })
            .catch((error) => {
            console.log("---MyInfo NodeJs Library Error---");
            console.log(error);
            res.status(500).send({
                error: error,
            });
        });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).send({
            error: error,
        });
    }
});
const query = (personData) => {
    console.log(personData.dob.value);
    let birthYear = personData.dob.value.substring(0, 4);
    let defaultURL = `https://supportgowhere.life.gov.sg/eligibility/results?affectedByCovid[]=LOST_JOB|REDUCED_INCOME|HOUSEHOLD_CONTRACTED_COVID|HOUSEHOLD_QO_SHN|FDW_QO_SHN&birthYear=${birthYear}&category[]=FINANCIAL|FAMILIES_PARENTING|EDUCATION|HOUSING|WORK|MENTAL_HEALTH|HEALTHCARE|SENIORS|DISABILITY&childCitizenship[]=SG|PR|OTHERS&citizenship=SG&employmentStatus=UNEM_NOT_SEARCHING&hasChildEqualOrBelow21=YES&monthlyHouseholdIncome=2000&monthlyPerCapitaIncome=500&needsAssistanceAsPwd=YES&ownsPropertyOfResidence=YES&typeOfPropertyOfResidence=PUBLIC_1R_2R`;
    return defaultURL;
};
