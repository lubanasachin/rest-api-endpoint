# rest-api-endpoint
NodeJs REST API endpoint

The main purpose of this repository is to show a working Node.js API Server with an api to fetch records from MongoDb collection based on given input filters.

# Table of contents:

- [Getting started](#getting-started)
- [Deploying the app](#deploying-the-app)
- [Project Structure](#project-structure)
- [Building the project](#running-the-build)
- [Testing](#running-tests)
- [ESLint](#running-eslint)
- [Dependencies](#dependencies)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/lubanasachin/rest-api-endpoint
```

- Install dependencies
```
cd rest-api-endpoint
yarn install
```

- Build and run the project
```
yarn clean
yarn build
yarn start
```

Finally, navigate to `http://localhost:3000/api/fetchRecords` using postman to filter the records based on given inputs!

# Deploying the app
The app can be packaged as a docker image and the image can be published to AWS ECR.
The image can be used to run a container in an EC2 instance.

You can run the following command to publish the docker image to ECR

```
yarn buildDocker
yarn tagDocker
yarn pushDocker
```

You need AWS access credentials to make the above command work.

![image](https://github.com/lubanasachin/rest-api-endpoint/blob/main/assets/api-example.png)


# Project Structure

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `yarn build`

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from  TypeScript build. This is the code to be shiped  |
| **node_modules**         | Contains all npm dependencies                                                                 |
| **src**                  | Contains source code that will be compiled to the dist dir                                    |
| **src/controllers**      | Defines functions that respond to the http requests                                           |
| **src/services**         | Defines service implementation to read from repository (mongodb collection)                   |
| **src/models**           | Defines Mongoose schemas that will be used in storing and retrieving data from MongoDB        |
| **src**/server.ts        | Entry point to your express app                                                               |
| **test**                 | Contains tests                                                                                |
| **scripts**              | Contains shell script to build, run and deploy docker images                                  |
| **assets**               | Contains images/documents for application                                                     |
| jest.config.js           | Used to configure Jest running tests written in TypeScript                                    |
| package.json             | File that contains dependencies list as well as scripts                                       |
| tsconfig.json            | Settings for compiling code written in TypeScript                                             |
| .eslintrc                | Settings for ESLint code style checking                                                       |
| .eslintignore            | Settings for paths to exclude from linting                                                    |

# Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Below is a list of all the scripts this template has available:


| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Does the same as 'npm run serve'. Can be invoked with `npm start`                                 |
| `build`                   | Runs ALL build tasks (`build-ts`, `lint`)                                                         |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `test`                    | Runs tests using Jest test runner                                                                 |
| `build-ts`                | Compiles all source `.ts` files to `.js` files in the `dist` folder                               |
| `lint`                    | Runs ESLint on project files                                                                      |

# Running tests
Simply run `yarn test`.
This will also generate a coverage report.

# Running ESLint
To run ESLint you can call the ESLint task.
```
yarn lint    // runs only ESLint
```

# Dependencies
Dependencies are managed through `package.json`.

## `dependencies`

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| bluebird                        | Promise library                                                       |
| body-parser                     | Express 4 middleware.                                                 |
| compression                     | Express 4 middleware.                                                 |
| connect-mongo                   | MongoDB session store for Express.                                    |
| dotenv                          | Loads environment variables from .env file.                            |
| errorhandler                    | Express 4 middleware.                                                 |
| express                         | Node.js web framework.                                                |
| lusca                           | CSRF middleware.                                                      |
| mongoose                        | MongoDB ODM.                                                          |
| winston                         | Logging library                                                       |

## `devDependencies`

| Package                         | Description                                                            |
| ------------------------------- | ---------------------------------------------------------------------- |
| @types                          | Dependencies in this folder are `.d.ts` files used to provide types    |
| jest                            | Testing library for JavaScript.                                        |
| supertest                       | HTTP assertion library.                                                |
| ts-jest                         | A preprocessor with sourcemap support to help use TypeScript with Jest.|
| eslint                          | Linter for JavaScript and TypeScript files                             |
| typescript                      | JavaScript compiler/type checker that boosts JavaScript productivity   |

