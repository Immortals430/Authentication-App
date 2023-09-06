const express = require('express');
const app = express();
const env = require('./config/environment')
const port = env.port;
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const passport = require('./config/passportLocal');
const passportGoogle = require('./config/passportGoogleOauth');
const flash = require('connect-flash');
const customMware = require('./config/middlewares');
const logger = require('morgan');




app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(logger(env.morgan.mode, env.morgan.options))
app.use(expressLayout) ;
app.use(express.urlencoded({ extended: false }));
app.use(express.static(env.asset_path))
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(cookieParser());


app.use(session({
    name: 'Authentication',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 6000000
  },
  store: new MongoStore({
    mongooseConnection: db,
    autoRemove: 'disabled'
  },(err)=>{
    console.log(err ||  'connect-mongodb setup ok');
  })
}))

  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passport.setAuthenticatedUser);

  app.use(flash());
  app.use(customMware.setflash);
  
  
  app.use('/', require('./routes'));
  
  
  app.listen(port, ()=>{
    console.log('connected to port:', port)
  });