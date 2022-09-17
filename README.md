<h3 align="center">MyInfo Support Recommender</h3>

  <p align="center">
    MyInfo integration into SupportGoWhere
    <br />
    <a href="https://github.com/sphades/MyInfoSupportRecommender"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://master.d3lahcyhpwz9wc.amplifyapp.com/">View Demo</a>
    ·
    <a href="https://github.com/sphades/MyInfoSupportRecommender/issues">Report Bug</a>
    ·
    <a href="https://github.com/sphades/MyInfoSupportRecommender/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#problem-statement">Problem Statement</a></li>
        <li><a href="#client">Proposed Solution</a></li>
      </ul>
    </li>
    <li>
      <a href="#technical-architecture">Technical Architecture</a>
      <ul>
        <li><a href="#client">Client</a></li>
        <li><a href="#server">Server</a></li>
        <li><a href="#database">Database</a></li>
        <li><a href="#ci/cd">CI/CD</a></li>
        </ul>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### Problem Statement

There is a demand for more robust social security nets that will likely grow in the following years. Applications for such aid programs are expected to increase, along with government digitalization programs. Inspired by the winning [paper](https://github.com/sphades/MyInfoSupportRecommender/blob/master/%5BSUPC%202022%5D%20Policy%20Proposal%20%3CSG-FI-01%3E.pdf) of [Singapore Undergraduate Policy Conference 2022](https://www.nuspssoc.org/supc2022), it called for a common database be forged between MOM, MOH, CPF, MSF and IRAS, providing a access to one-stop application for multiple family members and schemes.

### Proposed Solution

Fortunately, within MyInfo, theres already a common database among 4 of the recommended Government Organizations. MyInfo Support Recommender aims to demonstrate the possiblities of Government collaboration at solving social problems, by improving the search process and integration with MyInfo. For example, [SupportGoWhere](https://supportgowhere.life.gov.sg/eligibility) has a form that requires a great deal of information that can be determined from MyInfo. With a simple Singpass Login, the user can retrieve such information and find all relevant help.

Video Demo: [YouTube](https://youtu.be/kEnZ-08NAec)

[Live Demo](https://master.d3lahcyhpwz9wc.amplifyapp.com/)

\*\*Note: As required by SingPass API, 'http://localhost:3001/callback' is required to be set as the callback URL without certs or API keys issued by Singpass. As such, the live demo does not function to its full capability. The full working demo can be viewed in the YouTube Link.

\*\*Note: Due to lack of API Authentication and Certs issued from SingPass, certain scope of data required for this feature is unavailable. For demonstration, Sandbox Environment API will be used for Person Data.

### Technical Architecture

![Architecture Diagram](https://github.com/sphades/MyInfoSupportRecommender/blob/master/Architecture.png)

To authenticate users, MyInfo Support Recommender takes advantage of SingPass OAuth2 for user authentication. The user information will then be obtained from MyInfo Server.

#### Client

The frontend is built with React and TypeScript, and is intended to replicate the original [SupportGoWhere](https://supportgowhere.life.gov.sg/eligibility) with an additional Retrieve MyInfo Button.

Frontend is hosted by AWS Amplify.

#### Server

The backend is built express, node and TypeScript. The main purpose of the backend server is to communicate with the MyInfo server as well as return a redirected url to the client.

Backend is hosted by Heroku, which is based on AWS.

#### Database

MongoDB Atlas, a cloud NoSQL database was used to capture transaction logs, as required by SingPass MyInfo. Transaction logs are recorded whenever a redirected API is sent to the client. The transactions logs are kept to dispute potential issues involving misuse of personal data, as well as being part of the technical requirements for implementing MyInfo into any application.

Each TransactionLog stores:

1. uinfin
2. Scope of the transaction
3. Timestamp

#### CI/CD

Prettier and ESlint have been implemented to ensure readable and consistent code.
Backend (Heroku) and Frontend (AWS Amplify) are set to automatic deployment whenever a git commit is pushed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- node
- yarn
- git

### Installation

### 1. Clone the repo

```sh
git clone https://github.com/sphades/MyInfoSupportRecommender.git
```

### 2. Install NPM packages

```sh
cd frontend
yarn
```

```sh
cd backend
yarn
```

### 3. Run locally

```sh
// Change API_URL in frontend/src/config/config.ts to '//localhost:8000'

cd frontend
yarn start
```

```sh
cd backend
yarn dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

<!-- CONTACT -->

## Contact

Nicholas Tan - tanyieern@gmail.com

Project Link: [https://github.com/sphades/MyInfoSupportRecommender](https://github.com/sphades/MyInfoSupportRecommender)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
