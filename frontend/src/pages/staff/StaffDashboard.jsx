import StatCard from "../../components/StatCard";
import RequestAction from "../../components/RequestAction";

function StaffDashboard() {
  return (
    <>
      <div className="stats-grid">
        <StatCard
          icon="👨‍🎓"
          title="Total Students"
          value="2,084"
          extra="Across all departments"
        />

        <StatCard
          icon="📄"
          title="Pending Requests"
          value="24"
          extra="8 need attention"
        />

        <StatCard
          icon="🔧"
          title="Open Complaints"
          value="12"
          extra="3 aging complaints"
        />

        <StatCard
          icon="📢"
          title="Active Notices"
          value="8"
          extra="92% read rate"
        />
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Requests Requiring Action</h2>
              <p>Review and update student requests</p>
            </div>

            <button className="small-button">View all</button>
          </div>

          <RequestAction
            title="Bonafide Certificate"
            student="Rahul Kumar • CSE 5th"
            status="Pending"
          />

          <RequestAction
            title="Gate Pass"
            student="Sneha Das • CSE 3rd"
            status="Pending"
          />

          <RequestAction
            title="Leave Request"
            student="Aman Mishra • ECE 5th"
            status="Pending"
          />
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Recurring Issues</h2>
              <p>Problems requiring attention</p>
            </div>
          </div>

          <div className="issue">
            <span>🚰</span>

            <div>
              <strong>Hostel water leakage</strong>
              <p>7 complaints this week</p>
            </div>
          </div>

          <div className="issue">
            <span>💡</span>

            <div>
              <strong>Block B electricity</strong>
              <p>4 complaints this week</p>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Quick Management</h2>
            <p>Frequently used administrative actions</p>
          </div>
        </div>

        <div className="admin-actions">
          <button>➕ Add Student</button>
          <button>📢 Create Announcement</button>
          <button>📅 Update Timetable</button>
          <button>📊 Update Attendance</button>
          <button>🍱 Update Mess Menu</button>
          <button>🔧 Manage Complaints</button>
        </div>
      </div>
    </>
  );
}

export default StaffDashboard;
