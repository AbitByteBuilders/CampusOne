import { useState, useEffect } from "react";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches notices specifically targeted to students (and campus-wide "all" notices)
    fetch("http://127.0.0.1:5000/api/notices?role=student")
      .then((response) => response.json())
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching notices:", error));
  }, []);

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h2>Campus Notices</h2>
          <p>Important announcements and updates</p>
        </div>
      </div>

      {loading ? (
        <p>Loading latest notices...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {notices.map((notice) => (
            <div 
              key={notice.id} 
              className="notice" 
              style={{ alignItems: "flex-start", padding: "16px 0" }}
            >
              <div className="notice-icon">📢</div>
              <div style={{ flex: 1 }}>
                <strong>{notice.title}</strong>
                <p style={{ color: "#475467", marginTop: "6px", fontSize: "13px", lineHeight: "1.5" }}>
                  {notice.content}
                </p>
                <small style={{ display: "block", color: "#8992a5", marginTop: "8px", fontSize: "11px" }}>
                  Posted on {notice.date}
                </small>
              </div>
            </div>
          ))}
          
          {notices.length === 0 && (
            <div className="page-placeholder" style={{ minHeight: "200px" }}>
              <p>No new notices at this time.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Notices;