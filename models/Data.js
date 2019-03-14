var mongoose = require('mongoose')

// Save a reference to the Schema constructor
var Schema = mongoose.Schema

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var DataSchema = new Schema({
  // `title` must be of type String
  title: String,
  // `description` must be of type String
  description: String,
  // 'url' must be of type String
  url: String
})

// This creates our model from the above schema, using mongoose's model method
var Data = mongoose.model('Data', DataSchema)

// Export the Note model
module.exports = Data
