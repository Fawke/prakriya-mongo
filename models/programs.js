const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mode = ['Immersive', 'Online', 'Hybrid'];

const program = new Schema({
    name: { type: String, required: true, unique: true },
    mode: { type: String, enum: mode, required: true},
    description: { type: String, required: true },
    organizationName: { type: String, required: true },
    // courses: [{
    //     courseName: { type: String, required: true },
    //     courseStartDate: { type: Date },
    //     courseEndDate: { type: Date }
    // }]
    courses: { type: [String], required: true}
});

module.exports = mongoose.model('Program', program);