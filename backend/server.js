require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" Connected to MongoDB (Database: markapp)"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

// Define Schema using Collection "react"
const studentSchema = new mongoose.Schema(
  {
    studentId: String,
    studentName: String,
    marks: [Number],
    total: Number,
  },
  { collection: "react" } // This ensures the collection used is "react"
);

const Student = mongoose.model("Student", studentSchema);

// API to save student marks
app.post("/marks", async (req, res) => {
    try {
      const { studentId, studentName, marks } = req.body;
  
      // Ensure marks exist and are valid
      if (!Array.isArray(marks) || marks.length === 0) {
        return res.status(400).json({ error: "Marks should be a non-empty array" });
      }
  
      //  Convert all marks to numbers before summing
      const total = marks
        .map((val) => Number(val) || 0) // Convert each mark to a number (default to 0 if invalid)
        .reduce((acc, val) => acc + val, 0); // Sum up
  
      const student = new Student({ studentId, studentName, marks, total });
      await student.save();
  
      res.json({ message: "Marks saved successfully!", student });
    } catch (err) {
      res.status(500).json({ error: "Failed to save marks" });
    }
  });
  
// API to fetch a student by ID
app.get("/marks/:studentId", async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
});

// API to fetch all students
app.get("/marks", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
