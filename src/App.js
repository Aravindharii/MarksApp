import { useState } from "react";
import MarksForm from "./components/MarksForm";
import Report from "./components/Report";
import "./styles.css"; // Import common styles

const App = () => {
  const [studentId, setStudentId] = useState("");

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Student Marks System</h1>
      <MarksForm onMarksSubmitted={setStudentId} />
      {/* Pass studentId to Report component */}
      <Report studentId={studentId} />
    </div>
  );
};

export default App;
