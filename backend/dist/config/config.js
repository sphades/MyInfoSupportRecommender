"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MYINFO_CONNECTOR_CONFIG = exports.APP_CONFIG = exports.ORIGIN = void 0;
require("dotenv/config");
exports.ORIGIN = process.env.ORIGIN;
exports.APP_CONFIG = {
    ENVIRONMENT: "TEST",
    DEMO_APP_CLIENT_ID: "STG2-MYINFO-DEMO-APP",
    DEMO_APP_CLIENT_SECRET: "outzuu7n3bxzcvdyrv98y3picshnkydf1r4ybwas",
    DEMO_APP_CLIENT_SECURE_CERT: "./cert/your-sample-app-certificate.p12",
    DEMO_APP_CLIENT_SECURE_CERT_PASSPHRASE: "DemoApp",
    DEMO_APP_CALLBACK_URL: "http://localhost:3001/callback",
    DEMO_APP_PURPOSE: "demonstrating MyInfo APIs",
    DEMO_APP_SCOPES: "uinfin,name,sex,race,nationality,dob,email,mobileno,regadd,housingtype,hdbtype,marital,edulevel,noa-basic,ownerprivate,cpfcontributions,cpfbalances",
    MYINFO_API_AUTHORISE: "https://test.api.myinfo.gov.sg/com/v3/authorise",
    MYINFO_API_TOKEN: "https://test.api.myinfo.gov.sg/com/v3/token",
    MYINFO_API_PERSON: "https://test.api.myinfo.gov.sg/com/v3/person",
};
//Set following configuration for MyInfo library to call token and person API
// IMPORTANT: DO NOT rename the JSON Keys
exports.MYINFO_CONNECTOR_CONFIG = {
    MYINFO_SIGNATURE_CERT_PUBLIC_CERT: "./cert/staging-myinfo-public-cert.pem",
    CLIENT_ID: exports.APP_CONFIG.DEMO_APP_CLIENT_ID,
    CLIENT_SECRET: exports.APP_CONFIG.DEMO_APP_CLIENT_SECRET,
    CLIENT_SECURE_CERT: exports.APP_CONFIG.DEMO_APP_CLIENT_SECURE_CERT,
    CLIENT_SECURE_CERT_PASSPHRASE: exports.APP_CONFIG.DEMO_APP_CLIENT_SECURE_CERT_PASSPHRASE,
    REDIRECT_URL: exports.APP_CONFIG.DEMO_APP_CALLBACK_URL,
    ATTRIBUTES: exports.APP_CONFIG.DEMO_APP_SCOPES,
    /*
    Without Encryption and Signing
    Note: The sandbox environment is used for your testing when developing your prototype
    */
    // 'ENVIRONMENT': 'SANDBOX',
    // 'TOKEN_URL': 'https://sandbox.api.myinfo.gov.sg/com/v3/token',
    // 'PERSON_URL': 'https://sandbox.api.myinfo.gov.sg/com/v3/person',
    /*
    With Encryption and Signing
    Note: The test environment is used for testing your application with the full security measures required in production
    */
    ENVIRONMENT: "TEST",
    TOKEN_URL: "https://test.api.myinfo.gov.sg/com/v3/token",
    PERSON_URL: "https://test.api.myinfo.gov.sg/com/v3/person",
    //Proxy parameters (OPTIONAL)
    USE_PROXY: "N",
    PROXY_TOKEN_URL: "",
    PROXY_PERSON_URL: "",
    /*
    Debug level for library logging. i.e 'error, info, debug' leave empty to turn off logs (OPTIONAL)
     * error - Log out all the errors returned from the library
     * info - log urls called, authorization headers and errors from the library
     * debug - Full logs from the library, i.e (errors, urls, authorization headers, API response)
    
    NOTE: debug mode should never be turned on in production
    */
    DEBUG_LEVEL: "info",
};
