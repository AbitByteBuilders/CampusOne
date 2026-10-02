import { useState, useEffect } from "react";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/attendance")
      .then((response) => response.json())
      .then((data) => {
        setAttendanceData(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching attendance:", error));
  }, []);

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h2>Semester Attendance</h2>
          <p>Minimum 75% required for end-semester exams</p>
        </div>
      </div>

      {loading ? (
        <p>Loading attendance records...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
          {attendanceData.map((record) => (
            <div 
              key={record.id} 
              style={{
                background: "#fafbfe",
                border: "1px solid #eef0f4",
                borderRadius: "8px",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: "15px", display: "block", marginBottom: "4px" }}>
                  {record.subject}
                </strong>
                <p style={{ color: "#667085", fontSize: "12px", margin: 0 }}>
                  Classes Attended: {record.attended_classes} / {record.total_classes}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <span style={{
                    padding: "5px 10px", 
                    borderRadius: "20px", 
                    fontSize: "11px", 
                    fontWeight: "600",
                    background: record.status === "Shortage" ? "#fee2e2" : "#d1fae5",
                    color: record.status === "Shortage" ? "#991b1b" : "#065f46"
                }}>
                  {record.status}
                </span>
                
                <h2 style={{ 
                  margin: 0, 
                  color: record.percentage < 75 ? "#ef4444" : "#172033",
                  minWidth: "70px",
                  textAlign: "right"
                }}>
                  {record.percentage}%
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Attendance;