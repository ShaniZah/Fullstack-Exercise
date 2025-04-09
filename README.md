# FullsatckExercise

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

### Pre-requisites 

- [.NET SDK 8.0](https://dotnet.microsoft.com/en-us/download) (or higher)
- [Node.js v22.13.0](https://nodejs.org/en/download)
- Make sure the ports 4200 and 7200 are available 

## How to Run:

- Open a CMD in the root folder and run the following commands:
    1. cd backend/backend
    2. dotnet run --launch-profile https
    3. go to link https://localhost:7200
    4. a warning will show, click 'advanced' -> 'continue to site'

- To run in development mode:
    1. run server as detailed above
    in root folder run the following commands: 
    2. cd frontend
    3. npm install
    4. npm start
    5. go to link http://localhost:4200

## Backend

Below is a diagram of the backend architecture

![architecture_diagram](/frontend/src/assets/architecture_diagram.jpg)

## Security 

A self-signed certificate authority was generated and used to enable HTTPS for secure backend communication. After a successful login, the backend generates a JWT token and stores it inside an HttpOnly Secure cookie.
When a user logs out, the token's session ID is stored in a blacklist to prevent reuse, even if the token hasn't expired yet.