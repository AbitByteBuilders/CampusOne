import { useState, useEffect } from "react";

function Announcements() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetRole, setTargetRole] = useState("all");
  const [status, setStatus] = useState("idle");

  // Fetch function separated so we can call it again after a successful POST
  const fetchNotices = () => {
    fetch("http://127.0.0.1:5000/api/notices")
      .then((response) => response.json())
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching notices:", error));
  };

  // Load notices on initial mount
  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle the POST request
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    const newAnnouncement = {
      title: title,
      content: content,
      target_role: targetRole,
    };

    fetch("http://127.0.0.1:5000/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAnnouncement),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to post data");
        return response.json();
      })
      .then(() => {
        setStatus("success");
        // Clear form
        setTitle("");
        setContent("");
        setTargetRole("all");
        // Refresh the notice list instantly
        fetchNotices();
        // Hide success message after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      })
      .catch(() => setStatus("error"));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* ================= POST FORM PANEL ================= */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Create Announcement</h2>
            <p>Publish a new notice to the campus board</p>
          </div>
        </div>

        {status === "success" && (
          <div style={{ padding: "12px", background: "#d1fae5", color: "#065f46", borderRadius: "8px", marginBottom: "15px", fontSize: "13px", fontWeight: "600" }}>
            ✅ Announcement published successfully!
          </div>
        )}
        
        {status === "error" && (
          <div style={{ padding: "12px", background: "#fee2e2", color: "#991b1b", borderRadius: "8px", marginBottom: "15px", fontSize: "13px", fontWeight: "600" }}>
            ❌ Failed to publish announcement. Please check the server connection.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            <input
              type="text"
              placeholder="Announcement Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ flex: 2, padding: "12px 15px", borderRadius: "8px", border: "1px solid #e7eaf0", outline: "none", background: "#f5f7fb", fontSize: "14px" }}
            />
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              style={{ flex: 1, padding: "12px 15px", borderRadius: "8px", border: "1px solid #e7eaf0", outline: "none", background: "#f5f7fb", fontSize: "14px", cursor: "pointer" }}
            >
              <option value="all">Broadcast: Everyone</option>
              <option value="student">Target: Students Only</option>
              <option value="staff">Target: Staff Only</option>
            </select>
          </div>

          <textarea
            placeholder="Write the full announcement details here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="4"
            style={{ padding: "12px 15px", borderRadius: "8px", border: "1px solid #e7eaf0", outline: "none", background: "#f5f7fb", fontSize: "14px", resize: "vertical" }}
          />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="primary-button" disabled={status === "submitting"}>
              {status === "submitting" ? "Publishing..." : "Publish Announcement"}
            </button>
          </div>
        </form>
      </div>

      {/* ================= RECENT NOTICES PANEL (GET) ================= */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Recent Announcements</h2>
            <p>History of published campus notices</p>
          </div>
        </div>

        {loading ? (
          <p>Loading history...</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {notices.map((notice) => (
              <div key={notice.id} className="notice" style={{ alignItems: "flex-start", padding: "12px 0" }}>
                <div className="notice-icon">📢</div>
                <div style={{ flex: 1 }}>
                  <strong>{notice.title}</strong>
                  <p style={{ margin: "4px 0", color: "#667085", fontSize: "12px" }}>{notice.content}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    padding: "4px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: "600",
                    background: notice.target_role === "all" ? "#eef3ff" : "#fff5d8",
                    color: notice.target_role === "all" ? "#3868e8" : "#b77900"
                  }}>
                    {notice.target_role === "all" ? "Broadcast" : notice.target_role.charAt(0).toUpperCase() + notice.target_role.slice(1)}
                  </span>
                  <small style={{ display: "block", color: "#8992a5", marginTop: "6px", fontSize: "10px" }}>
                    {notice.date}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Announcements;