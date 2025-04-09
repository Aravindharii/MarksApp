import { useState } from "react";
import axios from "axios";

const MarksForm = ({ onMarksSubmitted }) => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [marks, setMarks] = useState(["", "", "", ""]); 

  const subjects = ["Maths", "Science", "English", "Hindi"]; 

  const handleMarksChange = (index, value) => {
    const newMarks = [...marks];
    newMarks[index] = value; 
    setMarks(newMarks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId || !studentName) {
      alert("Please enter Student ID and Name.");
      return;
    }

    try {
      const formattedMarks = marks.map((mark) => Number(mark) || 0);
      await axios.post("https://marksapp.onrender.com/marks", {
        studentId,
        studentName,
        marks: formattedMarks,
      });
            onMarksSubmitted(studentId);
      alert("Marks saved successfully!");
    } catch (error) {
      console.error("Error saving marks:", error);
      alert("Failed to save marks.");
    }
  };

  return (
    <div className="container card p-4 shadow mt-3">
      <h3 className="text-center text-dark">Enter Student Marks</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-center">
          <label className="form-label">Student ID:</label>
          <input
            type="text"
            className="form-control text-center"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 text-center">
          <label className="form-label">Student Name:</label>
          <input
            type="text"
            className="form-control text-center"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>

        <div className="row">
          {subjects.map((subject, index) => (
            <div key={index} className="col-md-6 mb-3">
              <label className="form-label">{subject}:</label>
              <input
                type="number"
                className="form-control text-center"
                value={marks[index]}
                onChange={(e) => handleMarksChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit Marks</button>
      </form>
    </div>
  );
};

export default MarksForm;
