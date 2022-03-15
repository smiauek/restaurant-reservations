# Restaurant Reservation System  
  
  Full-stack project for Thinkful.  
    
  This app is a reservation system for restaurants. It's meant to be used by restaurant presonnel when customer calls to request a reservation.  
  
  Each, [front-end](/front-end) and [back-end](/back-end), have their own readme files which have more details about their respective portions.  
  
  Deployed app can be found [here](https://reserve-frontend.herokuapp.com/)  
  
  Instructions for this project can be found [here](/instructions.md)  
  
  
## Installation  
To run the app on your local machine:  

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.  

## Running tests  
Test are split up by user story. You can run the tests for a given user story by running:

`npm run test:X` where `X` is the user story number 1-8.

Have a look at the following examples:

- `npm run test:1` runs all the tests for user story 1 (both frontend and backend).
- `npm run test:3:backend` runs only the backend tests for user story 3.
- `npm run test:3:frontend` runs only the frontend tests for user story 3.  

To run all teasts at once, use the following commands:  

- `npm test` runs _all_ tests.
- `npm run test:backend` runs _all_ backend tests.
- `npm run test:frontend` runs _all_ frontend tests.
- `npm run test:e2e` runs only the end-to-end tests.  

  
