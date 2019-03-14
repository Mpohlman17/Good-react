require('dotenv').config()

var express = require('express')
var session = require('express-session')
var passport = require('./config/passport')
var mongoose = require('mongoose')

var db = require('./models')

var app = express()
var PORT = process.env.PORT || 3000

// Middleware
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(express.json())
app.use(express.static('public'))
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

// Sessions to keep track of user's login status
// eslint-disable-next-line prettier/prettier
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
)
app.use(passport.initialize())
app.use(passport.session())

// connection to mongoDB
mongoose.connect(
  'mongodb://localhost/charitytestdb',
  { useNewUrlParser: true }
)

// Routes
require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)


// var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "development") {
//   syncOptions.force = true;



  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });


module.exports = app;