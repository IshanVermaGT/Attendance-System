// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Student', studentSchema);
