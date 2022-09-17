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
const axios_1 = __importDefault(require("axios"));
const repository_js_1 = require("./model/repository.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
const port = process.env.PORT;
let sandboxData;
// calls for sandbox person data on server start
axios_1.default
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
// Health check to ensure server is running
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
// Make API call to MyInfo server
app.post("/getPersonData", function (req, res, next) {
    try {
        // get variables from frontend
        const authCode = req.body.authCode;
        const state = req.body.state;
        const txnNo = (0, crypto_1.randomBytes)(10).toString("hex");
        const connector = new myinfo_connector_nodejs_1.default(config_js_1.MYINFO_CONNECTOR_CONFIG);
        console.log("Calling MyInfo NodeJs Library...");
        connector
            .getMyInfoPersonData(authCode, state, txnNo)
            .then((personData) => {
            let url = "https://supportgowhere.life.gov.sg/eligibility";
            // console.log(JSON.stringify(personData)); // log the data for demonstration purpose only
            /*
          P/s: Your logic to handle the person data ...
          */
            // Since test/sandbox both doesn't allow you to get any other data than the given scope, i need to use sandbox
            // api to test
            // url = query(personData);
            url = query(sandboxData);
            console.log("--- Sending Person Data From Your-Server (Backend) to Your-Client (Frontend)---:");
            res.status(200).send(url);
            (0, repository_js_1.createTransactionLog)(personData.uinfin.value, config_js_1.APP_CONFIG.DEMO_APP_SCOPES);
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
const findEmploymentStatus = (personData) => {
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
const findOwnership = (personData) => {
    if (personData.ownerprivate.value || personData.hdbownership[0])
        return "YES";
    return "NO";
};
const findTypeOfProperty = (personData) => {
    if (personData.housingtype.code)
        return "PRIVATE";
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
const findChildrenAge = (personData) => {
    // Do you have any children age 21 and below
    if (personData.childrenbirthrecords[0])
        return "YES";
    return "NO";
};
//household income no longer available in myinfo, assumption made
const calculateHouseholdIncome = (personData) => {
    return "2000";
};
//no household income, can't calculate per capita income
const calculatePerCapitaIncome = (personData) => {
    return "500";
};
const childCitizenship = (personData) => {
    return "SG";
};
const query = (personData) => {
    const birthYear = personData.dob.value.substring(0, 4);
    const nationality = personData.nationality.code;
    const employmentStatus = findEmploymentStatus(personData);
    const ownerOfProperty = findOwnership(personData);
    const typeOfProperty = findTypeOfProperty(personData);
    const childrenAge = findChildrenAge(personData);
    const defaultURL = `https://supportgowhere.life.gov.sg/eligibility/results?affectedByCovid[]=LOST_JOB|REDUCED_INCOME|HOUSEHOLD_CONTRACTED_COVID|HOUSEHOLD_QO_SHN|FDW_QO_SHN&birthYear=${birthYear}&category[]=FINANCIAL|FAMILIES_PARENTING|EDUCATION|HOUSING|WORK|MENTAL_HEALTH|HEALTHCARE|SENIORS|DISABILITY&childCitizenship[]=SG|PR|OTHERS&citizenship=${nationality}&employmentStatus=${employmentStatus}&hasChildEqualOrBelow21=${childrenAge}&monthlyHouseholdIncome=2000&monthlyPerCapitaIncome=500&needsAssistanceAsPwd=YES&ownsPropertyOfResidence=${ownerOfProperty}&typeOfPropertyOfResidence=${typeOfProperty}`;
    return defaultURL;
};
