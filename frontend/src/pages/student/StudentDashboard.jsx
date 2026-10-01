function Stat({ icon, title, value, extra }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <span>{title}</span>
        <h2>{value}</h2>
        <small>{extra}</small>
      </div>
    </div>
  );
}

function Quick({ icon, title }) {
  return (
    <button className="quick-card">
      <div className="quick-icon">{icon}</div>
      <strong>{title}</strong>
      <span>Open →</span>
    </button>
  );
}

function Request({ title, date, status }) {
  return (
    <div className="request">
      <div className="request-icon">📄</div>

      <div className="request-info">
        <strong>{title}</strong>
        <span>{date}</span>
      </div>

      <Status status={status} />
    </div>
  );
}

function Status({ status }) {
  return (
    <span className={`status ${status.toLowerCase().replace(" ", "-")}`}>
      {status}
    </span>
  );
}

function Notice({ title, date }) {
  return (
    <div className="notice">
      <div className="notice-icon">📢</div>

      <div>
        <strong>{title}</strong>
        <p>{date}</p>
      </div>
    </div>
  );
}
function StudentDashboard() {
  return (
    <>
      <div className="stats-grid">
        <Stat icon="📊" title="Attendance" value="82%" extra="Good standing" />

        <Stat
          icon="📄"
          title="Active Requests"
          value="3"
          extra="1 awaiting approval"
        />

        <Stat icon="🔧" title="Complaints" value="1" extra="Being resolved" />

        <Stat
          icon="💳"
          title="Fees Due"
          value="₹12,500"
          extra="Due this semester"
        />
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Quick Actions</h2>
              <p>Common student services</p>
            </div>
          </div>

          <div className="quick-grid">
            <Quick icon="📄" title="Bonafide Certificate" />

            <Quick icon="🚪" title="Gate Pass" />

            <Quick icon="📝" title="Leave Request" />

            <Quick icon="🔧" title="Hostel Complaint" />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Today's Schedule</h2>
              <p>5th Semester • CSE</p>
            </div>

            <span className="view-link">View all</span>
          </div>

          <div className="schedule-item">
            <div className="time">09:00</div>

            <div>
              <strong>Computer Networks</strong>
              <p>Room 302 • Prof. Sharma</p>
            </div>
          </div>

          <div className="schedule-item">
            <div className="time">11:00</div>

            <div>
              <strong>Operating Systems</strong>
              <p>Lab 2 • Prof. Das</p>
            </div>
          </div>

          <div className="schedule-item">
            <div className="time">02:00</div>

            <div>
              <strong>Web Development</strong>
              <p>Room 205 • Prof. Patnaik</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Recent Requests</h2>
              <p>Track your applications</p>
            </div>

            <span className="view-link">View all</span>
          </div>

          <Request
            title="Bonafide Certificate"
            date="24 Sep 2026"
            status="Pending"
          />

          <Request
            title="Hostel Complaint"
            date="22 Sep 2026"
            status="In Progress"
          />

          <Request title="Leave Request" date="20 Sep 2026" status="Approved" />
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Latest Notices</h2>
              <p>Important campus updates</p>
            </div>
          </div>

          <Notice title="Mid Semester Examination Schedule" date="Today" />

          <Notice title="Fee payment deadline extended" date="Yesterday" />

          <Notice title="Cultural Fest registrations open" date="2 days ago" />
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
