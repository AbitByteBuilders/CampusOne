import { useState, useEffect } from "react";
import StatCard from "../../components/StatCard";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/complaints")
      .then((response) => response.json())
      .then((data) => {
        setComplaints(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching complaints:", error));
  }, []);

  return (
    <>
      <div className="stats-grid">
        <StatCard icon="📋" title="Pending Complaints" value={complaints.length} extra="Needs attention" />
        <StatCard icon="🔧" title="Maintenance" value="8" extra="Active tickets" />
        <StatCard icon="👥" title="Visitors Today" value="34" extra="Campus visitors" />
        <StatCard icon="📦" title="Assets" value="248" extra="Tracked assets" />
      </div>

      <div className="panel admin-overview">
        <h2>Administration & Operations</h2>
        <p>Manage campus facilities, complaints, maintenance, visitors, assets and administrative operations.</p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Active Complaints (SLA Ageing Heatmap)</h2>
            <p>Monitored by AI Deduplication</p>
          </div>
          <button className="primary-button">Manage All</button>
        </div>

        {loading ? (
          <p>Loading live tickets from server...</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
            {complaints.map((ticket) => (
              <div 
                key={ticket.id} 
                className="issue"
                style={{ 
                  borderLeft: `6px solid ${ticket.sla_color === "Red" ? "#ef4444" : ticket.sla_color === "Yellow" ? "#f59e0b" : "#10b981"}`,
                  padding: "12px 15px",
                  background: "white",
                  borderTop: "1px solid #eef0f4",
                  borderRight: `6px solid ${ticket.sla_color === "Red" ? "#ef4444" : ticket.sla_color === "Yellow" ? "#f59e0b" : "#10b981"}`,
                  borderBottom: "1px solid #eef0f4",
                  borderRadius: "6px"
                }} 
              >
                <span style={{ fontSize: "24px" }}>
                  {ticket.category === "Plumbing" ? "🚰" : ticket.category === "Electrical" ? "💡" : "🔧"}
                </span>
                <div style={{ flex: 1 }}>
                  <strong>{ticket.title}</strong>
                  <p style={{ margin: "4px 0 0 0", color: "#666", fontSize: "12px" }}>
                    Room: {ticket.room_number} | Age: {ticket.age_hours} hours
                  </p>
                </div>
                
                {/* Standalone Status Badge */}
                <span style={{
                    padding: "5px 9px", borderRadius: "20px", fontSize: "10px", fontWeight: "600",
                    background: ticket.sla_color === "Red" ? "#fee2e2" : ticket.sla_color === "Yellow" ? "#fef3c7" : "#d1fae5",
                    color: ticket.sla_color === "Red" ? "#991b1b" : ticket.sla_color === "Yellow" ? "#92400e" : "#065f46"
                }}>
                  {ticket.sla_color === "Red" ? "Critical" : ticket.sla_color === "Yellow" ? "Warning" : "New"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;