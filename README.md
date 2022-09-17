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

There is a demand for more robust social security nets that will likely grow in the following years. Applications for such aid programs are expected to increase, along with government digitalization programs. Inspired by the winning paper of [Singapore Undergraduate Policy Conference 2022](https://www.nuspssoc.org/supc2022), the paper called for a common database be forged between MOM, MOH, CPF, MSF and IRAS, providing a one-stop application for multiple family members and schemes.

### Proposed Solution

Fortunately, within MyInfo, theres already a common database among 4 of the recommended Government Organizations. MyInfo Support Recommender aims to demonstrate the possiblities of Government collaboration at solving comtemporary problems, by improving the search process and integration with MyInfo. Currently, [SupportGoWhere](https://supportgowhere.life.gov.sg/eligibility) is a form that requires a great deal of information that can be determined from MyInfo. With a simple Singpass Login, the user can retrieve such information and find all relevant help.

Video Demo: [YouTube](https://youtu.be/kEnZ-08NAec)

[Live Demo](https://master.d3lahcyhpwz9wc.amplifyapp.com/)

\*\*Note: As required by SingPass API, 'http://localhost:3001/callback' is required to be set as the callback URL without certs or API keys issued by Singpass. Hence, the live demo requires backend to be running locally. The full working demo can be viewed in the YouTube Link.

\*\*Note: Due to lack of API Authentication and Certs issued from SingPass, certain scope of data required for this feature is unavailable. For demonstration, Sandbox Environment API will be used for Person Data.

### Technical Architecture

To authenticate users, MyInfo Support Recommender takes advantage of SingPass OAuth2 for user authentication. The user information will then be obtained from MyInfo Server.

#### Client

The frontend is built with React and TypeScript, and is intended to replicate the original [SupportGoWhere](https://supportgowhere.life.gov.sg/eligibility) with an additional Retrieve MyInfo Button.

Frontend is hosted by AWS Amplify.

#### Server

The backend is built express, node and TypeScript. The main purpose of the backend server is to communicate with the MyInfo server as well as return a redirected url to the client.

Backend is hosted by Heroku, which is based on AWS.

#### CI/CD

Prettier and ESlint have been implemented to ensure readable and consistent code.
Backend (Heroku) and Frontend (AWS Amplify) are set to automatic deployment whenever a git commit is pushed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- React
- express
- node.js
- TypeScript
- Hosted on AWS Amplify and Heroku

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

Your Name - tanyieern@gmail.com

Project Link: [https://github.com/sphades/MyInfoSupportRecommender](https://github.com/sphades/MyInfoSupportRecommender)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
