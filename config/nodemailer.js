const nodemailer = require('nodemailer');
const env = require('./environment')


const transporter = nodemailer.createTransport(env.smtp);


// nodemailer function for account verification (forgot password)

module.exports.sendResetLink = (token, email)=>{

    transporter.sendMail({

        to: email,
        subject: 'Reset Password',
        html: `<h1> Link to Reset Password <a href="http://${env.domain}/passUpdatePage/${token}">here</a> </h1>`
    },(err, info) =>{
        if(err){
            console.log(err)
        }
    });
}



