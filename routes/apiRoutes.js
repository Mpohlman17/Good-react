var db = require('../models')
// var passport = require("../config/passport");

module.exports = function (app) {
  // Get all examples
  app.get('/api/data/:id', function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Data.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function (dbData) {
      res.json(dbData)
    })
  })

  // POST route for saving a new post
  app.post('/api/Data', function (req, res) {
    db.Data.create(req.body).then(function (dbData) {
      res.json(dbData)
    })
  })

  // DELETE route for deleting posts
  app.delete('/api/posts/:id', function (req, res) {
    db.Data.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbData) {
      res.json(dbData)
    })
  })

  // PUT route for updating posts
  app.put('/api/posts', function (req, res) {
    db.Data.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (dbData) {
      res.json(dbData)
    })
  })
}
