function Students() {
  const students = [
    {
      name: "Rahul Kumar",
      roll: "CSE202401",
      department: "CSE",
      semester: "5th",
      attendance: "86%",
    },
    {
      name: "Sneha Das",
      roll: "CSE202402",
      department: "CSE",
      semester: "3rd",
      attendance: "91%",
    },
    {
      name: "Aman Mishra",
      roll: "ECE202315",
      department: "ECE",
      semester: "5th",
      attendance: "78%",
    },
    {
      name: "Priya Singh",
      roll: "CSE202406",
      department: "CSE",
      semester: "5th",
      attendance: "88%",
    },
  ];

  return (
    <div className="students-page">
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Students</h2>
            <p>View and manage student information</p>
          </div>

          <button className="primary-button">+ Add Student</button>
        </div>

        <div className="student-search">
          <span>🔍</span>
          <input placeholder="Search students by name or roll number..." />
        </div>

        <div className="students-table">
          <div className="students-table-header">
            <span>Student</span>
            <span>Roll Number</span>
            <span>Department</span>
            <span>Semester</span>
            <span>Attendance</span>
          </div>

          {students.map((student) => (
            <div className="students-table-row" key={student.roll}>
              <div className="student-name">
                <div className="student-avatar">{student.name.charAt(0)}</div>

                <strong>{student.name}</strong>
              </div>

              <span>{student.roll}</span>
              <span>{student.department}</span>
              <span>{student.semester}</span>

              <span className="student-attendance">{student.attendance}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Students;
