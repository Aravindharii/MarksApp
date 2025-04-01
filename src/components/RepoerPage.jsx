import React from "react";
import { useNavigate } from "react-router-dom";

function ReportPage() {
  const navigate = useNavigate();

  // Retrieve marks data from sessionStorage
  const marksData = JSON.parse(sessionStorage.getItem("marksData"));

  if (!marksData) {
    return (
      <div className="container text-center mt-4">
        <h4 className="text-danger">No data available. Please enter marks first.</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const { studentId, studentName, marks, total } = marksData;
  const subjects = ["Maths", "Science", "English", "Hindi", "Malayalam"];

  return (
    <div className="container card p-4 shadow mt-4">
      <h2 className="text-center text-dark">Student Marks Report</h2>
      <h5>Student ID: <span className="text-primary">{studentId}</span></h5>
      <h5>Name: <span className="text-success">{studentName}</span></h5>

      <ul className="list-group mt-3">
        {subjects.map((subject, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            <span>{subject}:</span> <strong>{marks[index]}</strong>
          </li>
        ))}
      </ul>

      <h3 className="mt-3">Total Marks: <span className="text-danger">{total}</span></h3>

      <button className="btn btn-primary w-100 mt-3" onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default ReportPage;
