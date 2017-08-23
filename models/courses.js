let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Example: Week - 4 (The session happens on the fourth week of the training)
// Description is same as Problem Statement
// Duration is in number of days
let Assignment = new Schema({
  Name: {type: String},
  Description: String,
  Week: Number,
  Skills: [String],
  Duration: Number
});

// Example: Day - 4 (The session happens on the fourth day from the commencement of the training)
let Session = new Schema({
  Name: {type: String},
  Description: String,
  Day: Number,
  Skills: [String]
});

// ID: Name_Mode
// Duration is in number of weeks
let courses = new Schema({
  ID: {type: String, unique: true},
  Name: String,
  Mode: String,
  Duration: Number,
  Skills: [String],
  Assignments: [Assignment],
  Schedule: [Session],
  History: {type: String, default: ''},
  Removed: {type: Boolean, default: false}
});

module.exports = mongoose.model('Courses', courses);

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// mode = ['immersive', 'virtual', 'hybrid'];

// const course = new Schema({
//   name: { type: String, required: true, unique: true },
//   shortName: { type: String },
//   mode: { type: String, enum: mode, required: true },
//   description: { type: String, required: true },
//   tech: { type: [String], required: true },
//   programs: [{
//     programName: { type: String, required: true }
//   }], 
//   contentSource: { type: String },
//   history: { type: String, default: '' },
//   removed: { type: Boolean, default: false },
// });

// module.exports = mongoose.model('Course', course);