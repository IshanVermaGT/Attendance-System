const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

router.post('/', async (req, res) => {
  try {
    const { date, records } = req.body;

    const attendanceRecords = [];

    for (const record of records) {
      const student = await Student.findOne({ studentId: record.studentId });

      if (!student) {
        return res.status(404).json({ error: `Student ID ${record.studentId} not found.` });
      }
      
      attendanceRecords.push({
        studentId: student._id, // Use MongoDB _id
        name: student.name,
        date,
        status: record.status,
      });
    }
    console.log("Processed Attendance Records:", attendanceRecords); // ✅ Add this
    await Attendance.insertMany(attendanceRecords);

    res.status(201).json({ message: 'Attendance saved successfully' });
  } catch (err) {
    console.error('Failed to submit attendance:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
