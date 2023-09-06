const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');
const env = require('./environment')


passport.use(new googleStrategy(env.googleOAuth_credentials,

    function(accessToken, refreshToken, profile, done){

        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log(err); return;}
            if (user){ return done(null, user);
            }else{
                User.create({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log(err); return;}
                    return done(null, user);
                });
            }
        }); 
    }
));





passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });



module.exports = passport;
