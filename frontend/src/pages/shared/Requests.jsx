function Requests() {
  const requests = [
    {
      icon: "📄",
      title: "Bonafide Certificate",
      description: "Certificate request",
      date: "24 Sep 2026",
      status: "Pending",
    },
    {
      icon: "🚪",
      title: "Gate Pass",
      description: "Campus exit request",
      date: "23 Sep 2026",
      status: "Approved",
    },
    {
      icon: "📝",
      title: "Leave Request",
      description: "Leave application",
      date: "20 Sep 2026",
      status: "Approved",
    },
    {
      icon: "🔧",
      title: "Hostel Complaint",
      description: "Hostel maintenance request",
      date: "22 Sep 2026",
      status: "In Progress",
    },
  ];

  return (
    <div className="requests-page">
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>My Requests</h2>
            <p>Track your submitted applications and requests</p>
          </div>

          <button className="primary-button">+ New Request</button>
        </div>

        <div className="request-list">
          {requests.map((request, index) => (
            <div className="student-request" key={index}>
              <div className="student-request-icon">{request.icon}</div>

              <div className="student-request-info">
                <strong>{request.title}</strong>

                <span>{request.description}</span>

                <small>Submitted on {request.date}</small>
              </div>

              <span
                className={`status ${request.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {request.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Requests;
