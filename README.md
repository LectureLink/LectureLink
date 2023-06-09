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
_This product is a work in progress. Please refer to the_ [Future Features](#future-features)
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
- [Future Features](#future-features)
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
- XCode - [Install](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

# Preparation

Preparing before the project setup.

## Clone the repository

`git clone https://github.com/LectureLink/LectureLink.git`

> Or download it as a `.zip` file.

# Setup

## Automated setup

*To build the application and run its containers together:*
```docker compose up --build```

*To remove the containers and stop running the application:*
```docker compose down```

**NOTE:**
***This application was designed for the Professor Client to be run in a mobile environment. However, with the docker implementation, this is not possible. The closest substitute is opening expo in the web. However, expo web does not provide the full set of features required for running this application to its full potential. One example is the lack of alerts in expo web that are a crucial aspect of the design for the mobile client. Furthermore, the designs are elongated by their widths due to the differences in window/screen sizes of web and mobile clients. Hence, it is highly recommended you use the manual setup without Docker to get the full application experience.***


## Manual setup

*Backend*
1. Enter the ```/backend``` directory.
2. Run ```npm install``` to install all dependencies.
3. Run ```npx prisma generate``` to start Prisma ORM.
4. Run ```nodemon src/index.ts``` to start the server.

*Professor Client*
1. Enter the ```/frontend/ProfessorClient``` directory.
2. Run ```npm install -g expo-cli``` to install expo.
3. Run ```npm install``` to install all dependencies.
4. Run ```expo start``` to start the expo client.
5. Access the client at ```http://localhost:19006```

*Student Client*
1. Enter the ```/frontend/StudentClient``` directory.
2. Run ```npm install``` to install all dependencies.
3. Run ```npm start``` to start the react client.
4. Access the client at ```http://localhost:3001```

# Usage

**Professor:**
1. Login to your account using your email and password OR Signup for an account using your email and provide a password.

2. Setting up class
   - Add your class by clicking on the "Add class +" button in blue.
   - Type the name of your class in the modal that pops up on your screen.
   
3. Access your class's unique "Class ID" in the "Settings" of your given class. Share that class Id with your students so they can join the class.

4. Start a class session
   - Click the "Enable" and confirm with the popup to start a class session. You will see a "Device View."
   - Inform your students of the unique "Room code" so they can join your class session.

5. Retrieve engagement data
   - When you want to retrieve engagement data, click the "Request Engagement" button in your "Device View."
   - Wait for the timer to expire and view the results of the engagement request.
   - Repeat as many times as desired during the duration of your class.

6. Exiting a session
   - Exit a session using the back arrow.

7. Look at past session averages
   - Open the class settings (click the "Settings" button).
   - Click the "Session History" button. The modal will display the average engagement of entire sessions that you have started and ended in the past.

**Students:**
1. Login to your account using your email and password OR Signup for an account using your email and provide a password.

2. Setting up class
   - Add your class by clicking on the "Add class +" button in blue.
   - Type the class id of your class in the modal that pops up on your screen.

3. Enter a class session
   - Click the "Open" button.
   - Enter the unique "Room code" in the modal to successfully enter your class session.

4. Provide engagement data
   - When your professor requests engagement data, your screen will change.
   - Use the engagmenent prompt and likert scale to communicate your comprehension and engagement.
   - Click "Submit" in a timely manner (within 30 secs) to submit your engagement data to your professor.
   - Wait for your professor to request additional prompts.

5. Exiting a session
   - Exit a session using the back arrow.

[Here is a quick demo video displaying the functionality and UI of the application](https://www.youtube.com/watch?v=EqD8srQgS_U)

# Future Features

*The following is a list of new features that could be added in future releases of the product:*
1. Secure class joining: A Professor should be able to remove a student from a class.
2. Deletion of classes: Students and Professors cannot delete classes after adding them as of now.
3. Improved session management: Use cookies to manage user sessions.
4. Passive check-ins: While the database has been configured to store information regarding passive checkins, the feature is not yet fully implemented by the server.
5. Complete error routes: There exist unused Error components for handling unauthorized or non-existing routes. 
6. Ability to influence presentations through the "Device View". Clicking the "Prev" and "Next" buttons currently do nothing. The addition of this feature would likely involve extensive changes to the current codebase.

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
