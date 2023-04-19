# LectureLink

![Node.js](https://img.shields.io/badge/Node.js-v19-brightgreen)
![Prisma](https://img.shields.io/badge/Prisma-v4-brightgreen)
![React](https://img.shields.io/badge/React-v18-brightgreen)
![ReactNative](https://img.shields.io/badge/ReactNative-v0.71-brightgreen)
![Expo](https://img.shields.io/badge/Expo-v48-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-v5-brightgreen)
![Docker](https://img.shields.io/badge/Docker-v20-brightgreen)

Revolutionize classroom engagement with LectureLink - the ultimate presentation clicker with integrated polling system for instant student feedback.

## Introduction

LectureLink is a presentation clicker with an integrated polling system, designed to help professors measure their students' engagement
and participation during lectures. With just a click, professors can send a prompt that asks for level of understanding to students' devices,
allowing them to give real-time feedback. This interactive approach to teaching and learning not only enhances comprehension but also
encourages participation and collaboration in the classroom. LectureLink is the ultimate tool for professors who want to create an engaging
classroom environment that facilitates valuable learning experiences for their students.
_This product is a work in progress. Please refer to the_ [Future Features](#futurefeatures)
_section to learn about features to come in future releases._

# Contents

- [Structure](#structure)
  - [Backend](#backend)
  - [Frontend](#frontend)
    - [Professor Client](#professor-client)
    - [Student Client](#student-client)
- [Prerequisites](#prerequisites)
- [Preparation](#preparation)
  - [Clone the repository](#clone-the-repository)
- [Setup](#setup)
  - [Automated setup](#automated-setup)
  - [Manual setup](#manual-setup)
- [Developing](#developing)
  - [Summary](#summary)
  - [Structure](#structure)
  - [Routing](#routing)
  - [Dependency list](#dependency-list)
- [License](#license)

# Structure

## Backend

- **Node v18**
- **TypeScript**
- Express framework
- Prisma ORM
- SQLite
- **Socket.IO** for real-time connection
- **Clean, consistent code** using Prettier
- Using ES6 features

## Frontend

### Professor Client

- **ReactNative v0.71**
- **Expo v48**
- **JavaScript**
- Using **Hooks**
- Built-in routing (react-navigation)
- **Clean, consistent code** using Prettier
- Using ES6 features

### Student Client

- **React v18**
- **JavaScript**
- Using **Hooks**
- Built-in routing (react-router)
- **Socket.IO** for real-time connection
- **Clean, consistent code** using Prettier
- Using ES6 features

# Prerequisites

- Docker (optional) - [Install](https://docs.docker.com/get-docker)
- Node.js v18 - [Install](https://nodejs.org/en/download) / [NVM](https://nodejs.org/en/download/package-manager/#nvm)
- Expo Go - [Install](https://apps.apple.com/us/app/expo-go/id982107779)

# Preparation

Preparing before the project setup.

## Clone the repository

`git clone https://github.com/LectureLink/LectureLink.git`

> Or download it as a `.zip` file.

# Setup

## Automated setup

Run `./scripts/setup.sh` from the root folder and follow the instructions.

Jump to the [usage section](#usage)!

## Manual setup

1.  Install dependencies
2.  Add SSL files
3.  Add JWT files
4.  Set env variables

### Install dependencies

Run `yarn install` inside the backend folder.

Run `yarn install` inside the frontend folder.

> Run `yarn install` inside the root folder.

### Add SSL files

Put your `cert.pem` and `key.pem` files inside the `./backend/.ssl/` folder.

If you don't have these files, you can generate a self-signed SSL certificate, check the [SSL setup](#ssl-setup) section.

### Add JWT files

Put your `jwt.secret.pem` and `jwt.public.pem` files inside the `./backend/.jwt/` folder.

If you don't have these files, check the [JWT setup](#jwt-setup) section to generate them.

### Set env variables

#### Backend

Create `.env.development` and `.env.production` files inside the `./backend/.env/` folder.

Use port 3001 in development and port 8080 in production.
On the frontend use ports 3000 and 8080.

Example for development (include all):

```
HOST=0.0.0.0
PORT=3001
FRONTEND_HOST=localhost
FRONTEND_PORT=3000
SSL_KEY=[SSL_KEY_FILE_NAME]
SSL_CRT=[SSL_CRT_FILE_NAME]
JWT_SECRET=[JWT_SECRET_KEY_FILE_NAME]
JWT_PUBLIC=[JWT_PUBLIC_KEY_FILE_NAME]
COOKIE_SECRET=[COOKIE_SECRET_KEY]
DATABASE_URL=[MONGOLAB_DB_URL]
EMAIL_USER=[EMAIL_USER]
EMAIL_PASS=[EMAIL_PASSWORD]
EMAIL_FROM=[EMAIL_FROM]
```

Located at `./backend/.env/.env.development`.

> If you change the ports, change them in the other env files too (root, frontend, cypress).

#### Frontend

Create `.env.development` and `.env.production` files inside the `./frontend/` folder.

Use port 3000 in development and port 8080 in production.
On the backend use ports 3001 and 8080.

Example (include all):

```
REACT_APP_HOST=0.0.0.0
REACT_APP_PORT=3000
REACT_APP_BACKEND_HOST=localhost
REACT_APP_BACKEND_PORT=3001
SKIP_PREFLIGHT_CHECK=true
CHOKIDAR_USEPOLLING=true
```

Located at `./frontend/.env.development`.

> If you change the ports, change them in the other env files too (root, backend, cypress).

#### Docker

Create `.env` file inside the root folder.

Use ports 3000/3001 for development and port 8080 for production.

Example (include all):

```
DEVELOPMENT_BACKEND_PORT=3001
DEVELOPMENT_FRONTEND_PORT=3000
PRODUCTION_PORT=8080
```

Located at `./.env`.

> If you change the ports, change them in the other env files too (backend, frontend, cypress).

# Developing

## Summary

### Backend

The most important files of are in the `./src/core/` folder, the server won't work without them. There are optional files in the `./src/common/` and `./src/features/` folders, these are not necessary to run the server.

The `./src/index.ts` is the main file, where the server's listen function will load the configuration and start the database connection, the routes, the server, and the Socket.IO server.

### Frontend

Similarly to the backend, find the important files in the `./src/core/` folder, while the optional files are in the `./src/common/` and `./src/features/` folders.

Based on the create-react-app using the Redux Toolkit, TypeScript template. Loads the routing and other common components wrapped by Redux in the `./src/index.tsx` and `./src/app.tsx` files.

## Structure

| Content              | Path          |
| :------------------- | :------------ |
| Backend code         | `./backend/`  |
| Frontend code        | `./frontend/` |
| Production build     | `./build/`    |
| Bash scripts         | `./scripts/`  |
| Docker env file      | `./.env`      |
| Docker compose files | `./`          |
| Configuration files  | `./`          |

### Backend structure

| Content               | Path              |
| :-------------------- | :---------------- |
| Environment variables | `./.env/`         |
| SSL files             | `./.ssl/`         |
| JWT files             | `./.jwt/`         |
| Public files          | `./public/`       |
| Main logic            | `./src/`          |
| Core functions        | `./src/core/`     |
| Features              | `./src/features/` |
| Common components     | `./src/common/`   |
| Docker files          | `./`              |
| Configuration files   | `./`              |

#### Structure of a feature

| Content               | Example                                 |
| :-------------------- | :-------------------------------------- |
| Entry point           | `./src/features/feat/index.ts`          |
| Main functions        | `./src/features/feat/feat.ts`           |
| Routes                | `./src/features/feat/feat.routes.ts`    |
| Database model        | `./src/features/feat/feat.model.ts`     |
| Interface             | `./src/features/feat/feat.interface.ts` |
| Integration tests     | `./src/features/feat/feat.test.ts`      |
| Swagger documentation | `./src/features/feat/feat.docs.yaml`    |
| Components            | `./src/features/feat/components/`       |
| Email templates       | `./src/features/feat/templates/`        |

#### Details of the ./src/ folder

| Content            | Path                     |
| :----------------- | :----------------------- |
| Configuration      | `./src/core/config/`     |
| Server declaration | `./src/core/server/`     |
| Authentication     | `./src/features/auth/`   |
| Documentation      | `./src/features/docs/`   |
| Home functions     | `./src/features/home/`   |
| Socket functions   | `./src/features/socket/` |
| User functions     | `./src/features/user/`   |
| Common components  | `./src/common/`          |

### Frontend structure

| Content                       | Path               |
| :---------------------------- | :----------------- |
| Environment variables         | `./.env.*`         |
| Public files                  | `./public/`        |
| Main logic                    | `./src/`           |
| Core functions                | `./src/core/`      |
| Features                      | `./src/features/`  |
| Common components             | `./src/common/`    |
| Images to use in tsx files    | `./public/images/` |
| (Images to use in scss files) | `./src/images/`    |
| Docker files                  | `./`               |
| Configuration files           | `./`               |

#### Structure of a feature

| Content           | Example                                  |
| :---------------- | :--------------------------------------- |
| Entry point       | `./src/features/feat/index.ts`           |
| Main functions    | `./src/features/feat/feat.tsx`           |
| Interface         | `./src/features/feat/feat.interface.ts`  |
| Integration tests | `./src/features/feat/feat.test.tsx`      |
| Redux slice       | `./src/features/feat/feat.slice.ts`      |
| Redux slice tests | `./src/features/feat/feat.slice.test.ts` |
| Components        | `./src/features/feat/components/`        |

#### Details of the ./src/ folder

| Content                | Path                              |
| :--------------------- | :-------------------------------- |
| Routing component      | `./src/core/routing/`             |
| Main hooks             | `./src/core/hooks/`               |
| Redux store            | `./src/core/store/`               |
| Color themes           | `./src/core/themes/`              |
| Auth definitions       | `./src/features/auth/auth/`       |
| Activation page        | `./src/features/auth/activation/` |
| Join page              | `./src/features/auth/join/`       |
| Login page             | `./src/features/auth/login/`      |
| Recovery page          | `./src/features/auth/recovery/`   |
| Reset page             | `./src/features/auth/reset/`      |
| Error page             | `./src/features/error/`           |
| Home page              | `./src/features/home/`            |
| Profile page           | `./src/features/user/profile/`    |
| Background component   | `./src/common/background/`        |
| Kofi component         | `./src/common/kofi/`              |
| Navigation component   | `./src/common/navigation/`        |
| Notification component | `./src/common/notification/`      |

### Production build structure

| Content               | Path                |
| :-------------------- | :------------------ |
| Environment variables | `./build/.env/`     |
| SSL files             | `./build/.ssl/`     |
| JWT files             | `./build/.jwt/`     |
| Backend               | `./build/index.js`  |
| Frontend              | `./build/frontend/` |
| Build logs            | `./build/log/`      |
| Configuration files   | `./build/`          |

## Routing

### Backend

The main routing handler for the backend:

```
app.use('/', homeRoute)
app.use('/api/auth', authRoute)
app.use('/api/docs', docsRoute)
app.use('*', error.routing)
app.use(error.internal)
```

Source: `./src/core/server/server.routing.ts`

#### Routes

| Description   | Method | Route                      |
| :------------ | :----- | -------------------------- |
| Home          | GET    | `/`                        |
| Documentation | GET    | `/api/docs`                |
| Auth check    | GET    | `/api/auth/local/check`    |
| Join          | PUT    | `/api/auth/local/join`     |
| Resend        | POST   | `/api/auth/local/resend`   |
| Activate      | POST   | `/api/auth/local/activate` |
| Login         | POST   | `/api/auth/local/login`    |
| Logout        | GET    | `/api/auth/local/logout`   |
| Recover       | POST   | `/api/auth/local/recover`  |
| Reset         | POST   | `/api/auth/local/reset`    |
| User profile  | POST   | `/api/user/profile/check`  |
| User remove   | POST   | `/api/user/profile/remove` |

### Frontend

The main routing handler for the frontend:

```
<Route path="/" element={<Home />} />
<Route path="/auth/login" element={<Login />} />
<Route path="/auth/join" element={<Join />} />
<Route path="/auth/activation/:id" element={<Activation />} />
<Route path="/auth/activation/:id/:code" element={<Activation />} />
<Route path="/auth/recovery" element={<Recovery />} />
<Route path="/auth/reset/:id" element={<Reset />} />
<Route path="/auth/reset/:id/:code" element={<Reset />} />
<Route path="/user/profile" element={<Profile />} />
<Route
  path="/error/unauthorized"
  element={<Error status={401} message="Unauthorized request" />}
/>
<Route
  path="/error/notfound"
  element={<Error status={404} message="Page not found" />}
/>
<Route path="*" element={<Navigate to="/error/notfound" replace />} />
```

Source: `./src/core/routing/routing.tsx`

## Dependency list

### Root

Find it inside the `./package.json` file.

### Backend

Find it inside the `./backend/package.json` file.

### Frontend

Find it inside the `./frontend/package.json` file.

# License

**LectureLink**  
Copyright (c) 2023 LectureLink of ENTR 3330 at Northeastern University

_LectureLink Team_

- Program Manager: Cole
- Marketing and Finance: Aaryan
- Competitive Research: Kwabena
- Customer Research: Julianne
- Solution Design: Remi
- Design Consultant: Dafne of Massachussetts College of Arts and Design
- Software Engineer: Evan Cook of Khoury College of Computer Science

**THIS PROJECT WAS MADE FOR ENTR 3330 OF NORTHEASTERN UNIVERSITY IN COLLABORATION WITH THE MASSACHUSSETTS COLLEGE OF ARTS AND DESIGN AND KHOURY COLLEGE OF COMPUTER SCIENCES. IT IS NOT INTENDED TO BE USED FOR COMMERCIAL PURPOSES.**
