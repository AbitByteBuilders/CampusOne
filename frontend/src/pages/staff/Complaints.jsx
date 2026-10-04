import { useState } from "react";

function Complaints() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  const complaints = [
    {
      id: "CMP-001",
      title: "Projector not working",
      category: "Classroom",
      location: "Room 204",
      priority: "High",
      status: "In Progress",
      date: "04 Oct 2026",
    },
    {
      id: "CMP-002",
      title: "AC not cooling properly",
      category: "Infrastructure",
      location: "Room 205",
      priority: "Medium",
      status: "Pending",
      date: "03 Oct 2026",
    },
    {
      id: "CMP-003",
      title: "Lab computer issue",
      category: "Laboratory",
      location: "Lab 2",
      priority: "High",
      status: "Resolved",
      date: "01 Oct 2026",
    },
  ];

  const filteredComplaints =
    filter === "All"
      ? complaints
      : complaints.filter((item) => item.status === filter);

  return (
    <div className="faculty-complaints-page">
      {/* Header */}
      <div className="panel complaints-header">
        <div>
          <h2>My Complaints</h2>
          <p>Report and track campus issues</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Raise Complaint
        </button>
      </div>

      {/* Complaint Form */}
      {showForm && (
        <div className="panel complaint-form">
          <div className="panel-header">
            <div>
              <h2>Raise a Complaint</h2>
              <p>Submit an issue to campus administration</p>
            </div>
          </div>

          <div className="complaint-form-grid">
            <div className="form-group">
              <label>Complaint Title</label>
              <input type="text" placeholder="Enter complaint title" />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select>
                <option>Classroom</option>
                <option>Laboratory</option>
                <option>Infrastructure</option>
                <option>IT / Network</option>
                <option>Electrical</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location / Room</label>
              <input type="text" placeholder="e.g. Room 204" />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea rows="5" placeholder="Describe the issue..."></textarea>
            </div>
          </div>

          <div className="complaint-form-actions">
            <button
              className="secondary-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button className="primary-button">Submit Complaint</button>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="complaint-stats">
        <div className="complaint-stat-card">
          <span>📋</span>
          <div>
            <strong>3</strong>
            <p>Total Complaints</p>
          </div>
        </div>

        <div className="complaint-stat-card">
          <span>⏳</span>
          <div>
            <strong>1</strong>
            <p>Pending</p>
          </div>
        </div>

        <div className="complaint-stat-card">
          <span>🔧</span>
          <div>
            <strong>1</strong>
            <p>In Progress</p>
          </div>
        </div>

        <div className="complaint-stat-card">
          <span>✅</span>
          <div>
            <strong>1</strong>
            <p>Resolved</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="panel">
        <div className="complaint-filter-bar">
          <div>
            <h2>Complaint History</h2>
            <p>Track your submitted complaints</p>
          </div>

          <div className="complaint-filters">
            {["All", "Pending", "In Progress", "Resolved"].map((status) => (
              <button
                key={status}
                className={
                  filter === status
                    ? "complaint-filter active"
                    : "complaint-filter"
                }
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Complaints */}
        <div className="complaints-list">
          {filteredComplaints.map((complaint) => (
            <div className="complaint-card" key={complaint.id}>
              <div className="complaint-card-top">
                <div>
                  <span className="complaint-id">{complaint.id}</span>

                  <h3>{complaint.title}</h3>
                </div>

                <span
                  className={`complaint-status ${complaint.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {complaint.status}
                </span>
              </div>

              <p className="complaint-description">
                {complaint.category} • {complaint.location}
              </p>

              <div className="complaint-card-bottom">
                <span>📍 {complaint.location}</span>

                <span>📅 {complaint.date}</span>

                <span
                  className={`complaint-priority ${complaint.priority.toLowerCase()}`}
                >
                  {complaint.priority} Priority
                </span>
              </div>
            </div>
          ))}

          {filteredComplaints.length === 0 && (
            <div className="empty-complaints">
              <span>📋</span>
              <h3>No complaints found</h3>
              <p>There are no complaints with this status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Complaints;
