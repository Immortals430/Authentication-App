const User = require('../models/User');
const randomString = require('randomstring');
const nodeMailer = require('../config/nodemailer')
const bcrypt = require('bcrypt')
const env = require('../config/environment')


// controller for home
module.exports.home = (req, res)=>{
    res.render('home');
}


// controller for signIn Page
module.exports.signInPage = (req, res)=>{
        if(req.isAuthenticated()){
            res.redirect('/');
        }
        res.render('signInPage', {captchasecret: env.captchasecret});
  
    }
    

// controller for signUp Page
module.exports.signUpPage =  (req, res)=>{
    if(req.isAuthenticated()){
        res.redirect('/');
    }
    res.render('signUpPage', {captchasecret: env.captchasecret});
}


// controller for sign In
module.exports.signIn = (req, res)=>{
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}


// controller for creating account
module.exports.signUp = async (req, res)=>{
    try{
        let userList = await User.findOne({email: req.body.email});
        if(userList){
            req.flash('error', 'User Already Exist');
            return res.redirect('back')
        }

        if(!userList && req.body.password == req.body.confirmPassword){
            let hashPassword = await bcrypt.hash(req.body.password, 10)
            let userList = await User.create({
                username: req.body.username.trim(),
                email: req.body.email.trim(),
                password: hashPassword
            });
            req.flash('success', 'Account Created');
            return res.redirect('/signInPage');
            
        }
        req.flash('error', 'Unmatching passwords');
        res.redirect('back');
    }
    catch(err){
        console.log(err);
    }
}


// controller for signOut
module.exports.signOut = (req, res)=>{
    req.logOut((err)=>{
        req.flash('success', 'Successfully Logged Out')
        res.redirect('/signInPage');
    });
}



// controllers for forgot password
module.exports.forgotPassword = async (req, res)=>{
    try{
        const token = randomString.generate();
        userList = await User.updateOne({email: req.body.email}, {$set:{token: token}});
        nodeMailer.sendResetLink(token,  req.body.email);
        req.flash('success', 'Reset Link sent. Check your Email')
        res.redirect('/');
    }
    catch(err){
        console.log(err);
    }
}


module.exports.passUpdatePage = async (req, res)=>{
    try{
        userList = await User.findOne({token: req.params.token});
        if(userList.token == req.params.token){
            res.render('passUpdatePage', {token: userList.token});
        }
        else{
            res.json({
                message: 'link expired'
            });
        }
    }
    catch(err){
        console.log(err)
    } 
}


module.exports.updatePassword = async (req, res)=>{
    try{
        userList = await User.findOne({token: req.body.token});
        if(userList && req.body.password == req.body.confirmPassword){
            let saltRounds = 10;
            userList.password = await bcrypt.hash(req.body.password, saltRounds);
                userList.token = ''
                userList.save();
                req.flash('success', 'Password changed Successfully')
            };
            
        if(!userList){
            res.json({
                message: 'link expired'
            });
        }  
        
        if(req.body.password != req.body.confirmPassword){
            res.json({
                message: 'password mismatch'
            });
        }
        res.redirect('/')
    }   
    catch(err){
        console.log(err)
    }
}
