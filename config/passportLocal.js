const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const users = require('../models/User');
const bcrypt = require('bcrypt');


passport.use(new LocalStrategy({
  usernameField: 'email'
},
    function(email, password, done) {
      users.findOne({ email: email }, function (err, user) {
        if (err) {  return done(err); }
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password, function(err, result) {  //  check orignal pass with hashed pass
          if(user && result){
            return done(null, user);
          }
          else { return done(null, false); }   
        });   
      });
    }
  ));
  

  

  
  passport.serializeUser((user, done) => {  
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => { 
    users.findById(id, (err, user)=>{
        return done(null, user)
    })
  });


  passport.checkAuthentication = (req, res, next)=>{
    if(req.isAuthenticated()){ 
      return next();
    }
    return res.redirect('/signInpage')
  }

  passport.setAuthenticatedUser = (req, res, next)=>{
    if(req.isAuthenticated()){
      res.locals.user = req.user  
    }
    next();
  }



module.exports = passport