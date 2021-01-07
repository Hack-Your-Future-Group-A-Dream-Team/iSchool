# Organized for Deployment

A model of how you can set up your project for development, testing & deployment.

### Contents

- [Organized for Deployment](#organized-for-deployment)
    - [Contents](#contents)
  - [General](#general)
    - [Configuration](#configuration)
  - [Development](#development)
    - [Getting started](#getting-started)
      - [Prerequisite](#prerequisite)
      - [Configure Secrets](#configure-secrets)
      - [Install backend dependencies.](#install-backend-dependencies)
      - [Install frontend dependencies](#install-frontend-dependencies)
      - [Database](#database)
    - [API (Backend)](#api-backend)
    - [Client (Frontend)](#client-frontend)
      - [Build](#build)
      - [Run](#run)
    - [Full App](#full-app)
  - [Deployment](#deployment)
    - [Mock](#mock)
    - [Getting started](#getting-started-1)
    - [Manual](#manual)
  - [Testing](#testing)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Continuous integration](#continuous-integration)
  - [Helpful Links](#helpful-links)

## General

### Configuration

This application reads the secrets from a `.env` [file](https://en.wikipedia.org/wiki/Environment_variable) at the root of this project. A secret is something you don't want to commit to a public repository. The password for your database for instance. A node package [dotenv](https://github.com/motdotla/dotenv) is used to read and parse this file and provides an interface we can use.

Create a file called `.env` to the root. 


```
DB_HOST=YOUR_IP_OR_DOMAIN
DB_NAME=YOUR_DATABASE_NAME
DB_USER=YOUR_DATABASE_USER
DB_PASSWORD=YOUR_DATABASE_USER_PASSWORD
JWT_SECRET=A_JWT_SECRET_A_RANDOM_STRING_OF_CHARACTERS
```

`DB_HOST` A domain or IP the host of your database.

`DB_NAME` The name of your database. The application will connect to this database.

`DB_USER` User used to authenticate to the database. Typically a user called `root` is created in MySQL. Although it is not recommend to use that user in production.

`JWT_SECRET` Within the app a standard called [JWT](https://jwt.io/introduction/) is used to manage authorization. This requires a random complicated password like string to sign tokens.

## Development

### Getting started

#### Prerequisite
In order to install the necessary dependencies you'll need:
* Node (v. XXX?) installed on your machine

Once you've installed Node you need:
* Yarn
* Nodemon
* Jest to launch the tests

To install them launch:
```
npm install nodemon -g
```

```
npm install jest -g
```

and

```
npm install yarn -g
```

#### Configure Secrets
Make sure you configure your secrets in line with your development environment. See the [configuration section](#configuration).

#### Install backend dependencies.

```
npm install
```

#### Install frontend dependencies

```
yarn install
```

#### Database

Your application will need to persist data. The interaction with the database is abstracted by an [ORM (Object role modelling)](https://nl.wikipedia.org/wiki/Object_role_modeling) called [Sequalize](https://sequelize.org/) . 

Make sure you configure your secrets in line with your development environment. See the [configuration section](#configuration).
You can create the database and tables by running the `sync.js` script.

```
node api/scripts/sync.js
```

Optionally you can seed the tables with some test data by running:

```
node api/scripts/seed.js
```

### API (Backend)

To develop just the API separately from the frontend run:

```bash
npm run dev-api
```

This will run your api as though it were part of the full live project.  All routes will be have `api/` appended before them and a get request to `/` will return the string `"frontend"`

### Client (Frontend)

#### Build
To be able to run the frontend app you need to build it first:
```bash
npm run-script build
```

#### Run
To run just the frontend separately from the API run:

```bash
npm run dev-client
```

> DISCLAIMER!  this will only work if you have set up a mock-api

### Full App

You can also develop the frontend and API in parallel by running:

```bash
npm run dev
```

This script will run the frontend and backend on separate ports, the backend on `localhost:5000` with [nodemon](https://nodemon.io/). The frontend will be run using [create-react-app's](https://github.com/facebook/create-react-app) `start` script, redirecting all API calls to `localhost:5000`.

[TOP](#organized-for-deployment)

---

## Deployment

The main `index.js` in this directory is for deployment. It provides access to your api behind `/api` and statically serves the client from `/client/build`.  You can copy-paste this file directly, there should be need to modify it for your project.

In order for your project to run on Heroku, the main `package.json` needs a `start` command.  This is already taken care of for you.

### Mock

To mock deployment on your local machine you can run these commands.  The app will build and run the same as it will on Heroku to help you troubleshoot your deployed project locally.

```bash
npm run heroku-postbuild
npm run start
```

### Getting started

Create a [Heroku account](https://signup.heroku.com/) and install the [Heroku cli](https://devcenter.heroku.com/articles/heroku-cli).
Verify the installation with
```bash
heroku status
```

Initialize Heroku inside the project folder by using:

```bash
heroku create
```

> Note it is likely you want to create the app with some options, a useful for the project.

### Manual

You can deploy your project from your local machine by pushing to the Heroku master repository.

```
git push heroku master
```

[TOP](#organized-for-deployment)

---

## Testing
To locally execute your tests, run the following commands

### Frontend

```bash
cd client
npm install
npm run test:watch
```

### Backend

```bash
cd api
npm install
npm run test:watch
```

### Continuous integration

Test run on each commit on the master branch using [Github actions](https://docs.github.com/en/free-pro-team@latest/actions). The configuration can be found in `.github/workflows/node.js.yml`.

[TOP](#organized-for-deployment)

---

## Helpful Links

* [Heroku devhints](https://devhints.io/heroku)
* [Heroku DevCenter: Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
* [Heroku DevCenter: Advanced Automation](https://devcenter.heroku.com/articles/multiple-environments#advanced-linking-local-branches-to-remote-apps)

[TOP](#organized-for-deployment)

---