import { useState } from "react";

function FacultyAttendance() {
   const subjects = [
  {
    name: "Computer Networks",
    code: "CS501",
    students: [
      { name: "Rahul Sharma", rollNo: "CSE001", attendance: 82 },
      { name: "Priya Das", rollNo: "CSE002", attendance: 74 },
      { name: "Aman Kumar", rollNo: "CSE003", attendance: 91 },
      { name: "Sneha Patel", rollNo: "CSE004", attendance: 68 },
      { name: "Rohit Singh", rollNo: "CSE005", attendance: 76 },
    ],
  },

  {
    name: "Operating System",
    code: "CS502",
    students: [
      { name: "Rahul Sharma", rollNo: "CSE001", attendance: 88 },
      { name: "Priya Das", rollNo: "CSE002", attendance: 72 },
      { name: "Aman Kumar", rollNo: "CSE003", attendance: 94 },
      { name: "Sneha Patel", rollNo: "CSE004", attendance: 79 },
      { name: "Rohit Singh", rollNo: "CSE005", attendance: 61 },
    ],
  },

  {
    name: "AI/ML",
    code: "CS503",
    students: [
      { name: "Rahul Sharma", rollNo: "CSE001", attendance: 91 },
      { name: "Priya Das", rollNo: "CSE002", attendance: 83 },
      { name: "Aman Kumar", rollNo: "CSE003", attendance: 72 },
      { name: "Sneha Patel", rollNo: "CSE004", attendance: 67 },
      { name: "Rohit Singh", rollNo: "CSE005", attendance: 89 },
    ],
  },

  {
    name: "Theory of Computation",
    code: "CS504",
    students: [
      { name: "Rahul Sharma", rollNo: "CSE001", attendance: 79 },
      { name: "Priya Das", rollNo: "CSE002", attendance: 71 },
      { name: "Aman Kumar", rollNo: "CSE003", attendance: 87 },
      { name: "Sneha Patel", rollNo: "CSE004", attendance: 93 },
      { name: "Rohit Singh", rollNo: "CSE005", attendance: 69 },
    ],
  },

  {
    name: "Professional Ethics",
    code: "HU501",
    students: [
      { name: "Rahul Sharma", rollNo: "CSE001", attendance: 95 },
      { name: "Priya Das", rollNo: "CSE002", attendance: 78 },
      { name: "Aman Kumar", rollNo: "CSE003", attendance: 82 },
      { name: "Sneha Patel", rollNo: "CSE004", attendance: 73 },
      { name: "Rohit Singh", rollNo: "CSE005", attendance: 66 },
    ],
  },

  {
    name: "Environmental Engineering",
    code: "CE501",
    students: [
      { name: "Rahul Sharma", rollNo: "CSE001", attendance: 84 },
      { name: "Priya Das", rollNo: "CSE002", attendance: 69 },
      { name: "Aman Kumar", rollNo: "CSE003", attendance: 90 },
      { name: "Sneha Patel", rollNo: "CSE004", attendance: 76 },
      { name: "Rohit Singh", rollNo: "CSE005", attendance: 62 },
    ],
  },
];
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  const shortageCount = selectedSubject.students.filter(
    (student) => student.attendance < 75,
  ).length;

  const goodCount = selectedSubject.students.filter(
    (student) => student.attendance >= 75,
  ).length;

  return (
    <div className="faculty-attendance-page">
      {/* PAGE HEADER */}
      <div className="panel">
        <div className="faculty-attendance-header">
          <div>
            <h2>Faculty Attendance</h2>
            <p>Select a subject to view student attendance</p>
          </div>
        </div>
      </div>

      {/* SUBJECTS */}
      <div className="faculty-subject-grid">
        {subjects.map((subject) => (
          <button
            className={`panel faculty-subject-card ${
              selectedSubject.code === subject.code ? "selected" : ""
            }`}
            key={subject.code}
            onClick={() => setSelectedSubject(subject)}
          >
            <div className="subject-icon">📚</div>

            <div className="subject-info">
              <h3>{subject.name}</h3>
              <span>{subject.code}</span>
            </div>

            <div className="subject-students">
              {subject.students.length} Students
            </div>

            <div className="view-attendance-button">
              {selectedSubject.code === subject.code
                ? "Selected ✓"
                : "View Attendance →"}
            </div>
          </button>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="faculty-attendance-summary">
        <div className="panel attendance-summary-card">
          <span className="summary-icon">👥</span>

          <div>
            <p>Total Students</p>
            <strong>{selectedSubject.students.length}</strong>
          </div>
        </div>

        <div className="panel attendance-summary-card">
          <span className="summary-icon good-icon">✓</span>

          <div>
            <p>Good Attendance</p>
            <strong>{goodCount}</strong>
          </div>
        </div>

        <div className="panel attendance-summary-card">
          <span className="summary-icon shortage-icon">!</span>

          <div>
            <p>Shortage</p>
            <strong>{shortageCount}</strong>
          </div>
        </div>
      </div>

      {/* STUDENT ATTENDANCE */}
      <div className="panel faculty-attendance-table">
        <div className="attendance-table-header">
          <div>
            <h2>{selectedSubject.name}</h2>
            <p>{selectedSubject.code} • Student Attendance</p>
          </div>

          <div className="attendance-summary">
            <strong>{selectedSubject.students.length}</strong> Students
          </div>
        </div>

        <div className="attendance-table">
          <div className="attendance-row attendance-heading">
            <span>Student</span>
            <span>Roll No.</span>
            <span>Attendance</span>
            <span>Status</span>
          </div>

          {selectedSubject.students.map((student) => {
            const isShortage = student.attendance < 75;

            return (
              <div className="attendance-row" key={student.rollNo}>
                <div className="student-name">
                  <div className="student-avatar">{student.name.charAt(0)}</div>

                  <strong>{student.name}</strong>
                </div>

                <span>{student.rollNo}</span>

                <div className="attendance-percentage">
                  <strong>{student.attendance}%</strong>

                  <div className="attendance-bar">
                    <div
                      className={`attendance-progress ${
                        isShortage ? "shortage" : "good"
                      }`}
                      style={{
                        width: `${student.attendance}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <span
                  className={`attendance-status ${
                    isShortage ? "shortage" : "good"
                  }`}
                >
                  {isShortage ? "Shortage" : "Good"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FacultyAttendance;
