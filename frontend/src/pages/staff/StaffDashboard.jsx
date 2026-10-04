import StatCard from "../../components/StatCard";
import RequestAction from "../../components/RequestAction";

function StaffDashboard({ userId }) {
  const facultyName = userId && userId.trim() !== "" ? userId : "Faculty";

  return (
    <>
      {/* Welcome message */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Welcome, {facultyName} 👋</h2>
            <p>Here is your faculty dashboard overview.</p>
          </div>
        </div>
      </div>

      {/* Faculty Statistics */}
      <div className="stats-grid">
        <StatCard
          icon="📚"
          title="My Subjects"
          value="6"
          extra="Subjects assigned"
        />

        <StatCard
          icon="👨‍🎓"
          title="Students"
          value="120"
          extra="Across my classes"
        />

        <StatCard
          icon="⚠️"
          title="Attendance Shortage"
          value="18"
          extra="Students below 75%"
        />

        <StatCard
          icon="📅"
          title="Today's Classes"
          value="4"
          extra="2 classes remaining"
        />
      </div>

      {/* Today's Classes + Attendance Alerts */}
      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Today's Classes</h2>
              <p>Your scheduled classes for today</p>
            </div>

            <button className="small-button">View timetable</button>
          </div>

          <div className="issue">
            <span>🕘</span>
            <div>
              <strong>Computer Networks</strong>
              <p>09:00 AM • CSE 3rd Year • Room 204</p>
            </div>
          </div>

          <div className="issue">
            <span>🕚</span>
            <div>
              <strong>Operating System</strong>
              <p>11:00 AM • CSE 3rd Year • Room 205</p>
            </div>
          </div>

          <div className="issue">
            <span>🕑</span>
            <div>
              <strong>AI/ML</strong>
              <p>02:00 PM • CSE 5th Semester • Lab 2</p>
            </div>
          </div>

          <div className="issue">
            <span>🕓</span>
            <div>
              <strong>Theory of Computation</strong>
              <p>04:00 PM • CSE 5th Semester • Room 301</p>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Attendance Alerts</h2>
              <p>Students below 75% attendance</p>
            </div>

            <button className="small-button">View attendance</button>
          </div>

          <RequestAction
            title="Priya Das"
            student="CSE002 • Computer Networks"
            status="74%"
          />

          <RequestAction
            title="Rohit Singh"
            student="CSE005 • Operating System"
            status="61%"
          />

          <RequestAction
            title="Sneha Patel"
            student="CSE004 • AI/ML"
            status="67%"
          />

          <RequestAction
            title="Aman Kumar"
            student="CSE003 • AI/ML"
            status="72%"
          />
        </div>
      </div>

      {/* Subjects */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>My Subjects</h2>
            <p>Subjects currently assigned to you</p>
          </div>
        </div>

        <div className="admin-actions">
          <button>📚 Computer Networks</button>
          <button>💻 Operating System</button>
          <button>🤖 AI/ML</button>
          <button>🔤 Theory of Computation</button>
          <button>⚖️ Professional Ethics</button>
          <button>🌱 Environmental Engineering</button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Quick Actions</h2>
            <p>Frequently used faculty actions</p>
          </div>
        </div>

        <div className="admin-actions">
          <button>📊 Mark Attendance</button>
          <button>📅 View Timetable</button>
          <button>👨‍🎓 View Students</button>
          <button>📢 Create Announcement</button>
          <button>📄 Review Requests</button>
          <button>🔧 View Complaints</button>
        </div>
      </div>
    </>
  );
}

export default StaffDashboard;
