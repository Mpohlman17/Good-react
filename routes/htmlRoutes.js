// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
// Dependencies
// =============================================================
var path = require('path')

// Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function (app) {
  // Each of the below routes just handles the HTML page that the user gets sent to
  // loads homepage
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })

  // loads about page
  app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/about.html'))
  })

  // loads contact page
  app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/about.html'))
  })

  // loads search page
  app.get('/search', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/search.html'))
  })

  // loads search page
  app.get('/user/:user.id', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/user.html'))
  })

  // loads 404 on any unconnect Url
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/404.html'))
  })

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render('404')
  })
}
