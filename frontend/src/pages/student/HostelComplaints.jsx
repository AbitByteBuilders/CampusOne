function HostelComplaints() {
  const complaints = [
    {
      icon: "🚰",
      title: "Water Leakage",
      category: "Plumbing",
      date: "22 Sep 2026",
      status: "In Progress",
    },
    {
      icon: "💡",
      title: "Room Light Not Working",
      category: "Electrical",
      date: "18 Sep 2026",
      status: "Resolved",
    },
    {
      icon: "🧹",
      title: "Room Cleaning Required",
      category: "Cleanliness",
      date: "15 Sep 2026",
      status: "Resolved",
    },
  ];

  return (
    <div className="hostel-page">
      <div className="panel hostel-info">
        <div>
          <h2>Hostel Details</h2>
          <p>Your current hostel accommodation</p>
        </div>

        <div className="hostel-details">
          <div>
            <span>Hostel</span>
            <strong>Block B</strong>
          </div>

          <div>
            <span>Room</span>
            <strong>B-204</strong>
          </div>

          <div>
            <span>Room Type</span>
            <strong>4 Seater</strong>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>My Complaints</h2>
            <p>Track your hostel maintenance complaints</p>
          </div>

          <button className="primary-button">+ New Complaint</button>
        </div>

        <div className="complaint-list">
          {complaints.map((complaint, index) => (
            <div className="student-complaint" key={index}>
              <div className="student-complaint-icon">{complaint.icon}</div>

              <div className="student-complaint-info">
                <strong>{complaint.title}</strong>

                <span>{complaint.category}</span>

                <small>Submitted on {complaint.date}</small>
              </div>

              <span
                className={`status ${complaint.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {complaint.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HostelComplaints;
