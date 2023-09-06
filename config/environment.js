const path = require('path');
const fs = require('fs');
const rfs = require('rotating-file-stream');

const LogDir = path.join(__dirname, '../production_logs');
fs.existsSync(LogDir) || fs.mkdirSync(LogDir)

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: LogDir
})


const development = {
    name: 'development',
    asset_path: process.env.ASSETPATH,
    session_cookie_key: process.env.SESSIONCOOKIEKEY,
    connectDB: `mongodb://127.0.0.1/${process.env.DB}`,
    port: process.env.PORT,
    googleOAuth_credentials: {
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET, 
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    domain: 'localhost:8000',
    captchasecret: process.env.CAPTCHASECRET,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    },
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.ASSETPATH,
    session_cookie_key: process.env.SESSIONCOOKIEKEY,
    connectDB: `mongodb+srv://Immortals430:${process.env.ATLAS_PASS}@immortals.mpqexs2.mongodb.net/${process.env.DB}`,
    port: process.env.PORT,
    googleOAuth_credentials: {
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET, 
        callbackURL: `http://${process.env.DOMAIN}/users/auth/google/callback`
    },
    domain: process.env.DOMAIN,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    },
    morgan: {
        mode: 'COMBINE',
        options: {stream: accessLogStream}
    },
    captchasecret: process.env.CAPTCHASECRET
}


module.exports = eval(process.env.ENVIRONMENT) == undefined ? development : eval(process.env.ENVIRONMENT)
