
# Authentication App

In this project, users can sign up using local strategy and Google OAuth. Users can also reset passwords using the email verification method.

Link to production site: [Authentication App](http://cnprojects.online/)


## Features

- Sign Up Sign In using local strategy
- Sign Up Sign In using Google OAuth 
- Reset password using email verification
- Flash notifications
- Responsive webpage
- Used reCAPTCHA that protects the site from spam and abuse



## Run Locally

Clone the project

```bash
  git clone https://github.com/Immortals430/Authentication-App.git
```

Go to the project directory

```bash
  cd Authentication-App
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon index.js
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ASSETPATH`

`CAPTCHASECRET`

`CLIENTID`

`CLIENTSECRET`

`PORT`

`SESSIONCOOKIEKEY`

`NODEMAILER_USER`

`NODEMAILER_PASS`

`ENVIRONMENT` 

`DOMAIN`

`DB`


  



## Screenshots




<p align="center">
<img src="https://github.com/Immortals430/Authentication-App/assets/124674815/c8173915-526f-4d82-adb3-8d7f9accae35" width="468" height="300" />
</p>

<br><p align="center"> Sign In using Local or Google OAuth </p><br>
  
<p align="center">
<img src="https://github.com/Immortals430/Authentication-App/assets/124674815/7f3fcb3d-9fdc-42fe-a2e9-b7b2ba33e9a7" width="468" height="300" />
</p>

<br><p align="center"> Flash messages to track progress </p><br>

<p align="center">
<img src="https://github.com/Immortals430/Authentication-App/assets/124674815/f36cdc9d-4b62-4373-89fc-1405cc69d5b7" width="468" height="300" />
</p>

<br><p align="center"> Reset Password using email verification method </p><br>

<p align="center">
<img src="https://github.com/Immortals430/Authentication-App/assets/124674815/050f145e-e32e-48d8-9c28-5a86f863da26" width="468" height="300" />
</p>

<br><p align="center"> reCaptcha if website is abused </p><br>





## Lessons Learned

- About various npm packages like mongoose, noty, flash, bcrypt, crypto, nodemailer.

- About Google OAuth strategy.

- How to use reCaptch to protect the website.

- How to deploy the project to the server.



