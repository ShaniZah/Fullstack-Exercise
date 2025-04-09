# FullsatckExercise

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

# Project Structure 

Frontend folder
Backend folder
README.md

Frontend folder
    |---source code
Backend folder
    |---wwwroot
        |--- index.html
        |--- chunks

### Pre-requisites 

- [.NET SDK 8.0](https://dotnet.microsoft.com/en-us/download) (or higher)
- [Node.js v22.13.0](https://nodejs.org/en/download)
- Make sure the ports 7200 and 4200 are available 

### Backend (C#)

- Open a CMD in the root folder and run the following commands:
    1. cd backend
    2. dotnet run --launch-profile https

### Frontend (Angular)

- Open a CMD in the root folder and run the following commands:
    1. cd frontend 
    2. npm run start-app

## Frontend



## Backend

![architecture_diagram](/frontend/src/assets/architecture_diagram.jpg)

## Security 

All client-server communication is done over HTTPS, using a self-signed TLS certificate.
After a successful login, the backend generates a JWT token and stores it inside an HttpOnly Secure cookie.
When a user logs out, the token's session ID is stored in a blacklist to prevent reuse, even if the token hasn't expired yet.