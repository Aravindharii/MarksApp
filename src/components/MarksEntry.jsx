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
      const response = await fetch("https://marksapp.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          studentName,
          marks: marks.map(Number),
        }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error saving marks:", error);
    }
  };

  return (
    <div>
      <h2>Enter Student Marks</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        {marks.map((mark, index) => (
          <input
            key={index}
            type="number"
            placeholder={`Subject ${index + 1}`}
            value={mark}
            onChange={(e) => handleMarksChange(index, e.target.value)}
            required
          />
        ))}
        <button type="submit" className="btn btn secondary">Save Marks</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MarksEntry;
