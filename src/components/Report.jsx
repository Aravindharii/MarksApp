import { useState } from "react";

const Report = () => {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAllReports, setShowAllReports] = useState(false);

  // ✅ Replace "localhost" with your live backend URL
  const API_BASE_URL = "https://marksapp.onrender.com";

  const fetchStudent = async () => {
    if (!studentId.trim()) {
      setError("Please enter a Student ID.");
      return;
    }
    setError("");
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await fetch(`${API_BASE_URL}/marks/${studentId}`);
      if (!response.ok) throw new Error("Student not found");
      const data = await response.json();
      setStudent(data);
    } catch (error) {
      setStudent(null);
      setError("Student not found.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const fetchAllStudents = async () => {
    setError("");
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await fetch(`${API_BASE_URL}/marks`);
      const data = await response.json();
      setStudents(data);
      setShowAllReports(true);
    } catch (error) {
      setError("Error fetching student reports.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const toggleReports = () => {
    setShowAllReports(!showAllReports);
  };

  return (
    <div className="container mt-4 text-center">
      <h2>Student Report</h2>

      <div className="d-flex justify-content-center mb-3">
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={fetchStudent} disabled={loading}>
          {loading ? "Loading..." : "Get Report"}
        </button>
      </div>

      <button className="btn btn-success mb-3" onClick={fetchAllStudents} disabled={loading}>
        {loading ? "Loading..." : "Show All Reports"}
      </button>

      {showAllReports && (
        <button className="btn btn-danger mb-3" onClick={toggleReports}>
          Hide All Reports
        </button>
      )}

      {error && <p className="text-danger">{error}</p>}

      {student && (
        <div className="card p-2 mb-3">
          <h3 className="text-success">
            {student.studentName} (ID: {student.studentId})
          </h3>
          <p>
            <strong>Total Marks:</strong> {student.total}
          </p>
          <p>
            <strong>Marks:</strong> {student.marks.join(", ")}
          </p>
        </div>
      )}

      {showAllReports && students.length > 0 && (
        <div className="card p-2">
          <h3>All Student Reports</h3>
          {students.map((s, index) => (
            <div key={index} className="border-bottom pb-2 mb-2">
              <h4 className="text-primary">
                {s.studentName} (ID: {s.studentId})
              </h4>
              <p>
                <strong>Total Marks:</strong> {s.total}
              </p>
              <p>
                <strong>Marks:</strong> {s.marks.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Report;
