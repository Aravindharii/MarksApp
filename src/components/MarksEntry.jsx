import { useState } from "react";

const MarksEntry = () => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [marks, setMarks] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState("");

  const handleMarksChange = (index, value) => {
    const newMarks = [...marks];
    newMarks[index] = value;
    setMarks(newMarks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://marksapp.onrender.com/marks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          studentName,
          marks: marks.map(Number),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Marks saved successfully!");

        // ✅ Reset form only on success
        setStudentId("");
        setStudentName("");
        setMarks(["", "", "", "", ""]);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to save marks.");
      }

      // ⏳ Clear message after 3s
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving marks:", error);
      setMessage("Failed to save marks. Server error.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="container card p-4 shadow mt-4">
      <h2 className="text-center mb-3">Enter Student Marks</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        {marks.map((mark, index) => (
          <input
            key={index}
            type="number"
            className="form-control mb-2"
            placeholder={`Subject ${index + 1}`}
            value={mark}
            onChange={(e) => handleMarksChange(index, e.target.value)}
            required
          />
        ))}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Save Marks
        </button>
      </form>
      {message && <p className="text-center mt-3 text-info">{message}</p>}
    </div>
  );
};

export default MarksEntry;
