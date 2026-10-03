import StatCard from "../../components/StatCard";
import QuickAction from "../../components/QuickAction";
import RequestItem from "../../components/RequestItem";
import NoticeItem from "../../components/NoticeItem";

function StudentDashboard({ userId }) {
  return (
    <>
      <div className="stats-grid">
        <StatCard
          icon="📊"
          title="Attendance"
          value="82%"
          extra="Good standing"
        />

        <StatCard
          icon="📄"
          title="My Requests"
          value="3"
          extra="1 awaiting approval"
        />

        <StatCard
          icon="🔧"
          title="Open Complaints"
          value="1"
          extra="Being resolved"
        />

        <StatCard
          icon="💳"
          title="Pending Fees"
          value="₹12,500"
          extra="Due this semester"
        />
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Student Services</h2>
              <p>Frequently used campus services</p>
            </div>
          </div>

          <div className="quick-grid">
            <QuickAction icon="📄" title="Bonafide Certificate" />
            <QuickAction icon="🚪" title="Gate Pass" />
            <QuickAction icon="📝" title="Leave Request" />
            <QuickAction icon="🔧" title="Hostel Complaint" />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Today's Classes</h2>
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
              <h2>Recent Applications</h2>
              <p>Track your submitted requests</p>
            </div>

            <span className="view-link">View all</span>
          </div>

          <RequestItem
            title="Bonafide Certificate"
            date="24 Sep 2026"
            status="Pending"
          />

          <RequestItem
            title="Hostel Complaint"
            date="22 Sep 2026"
            status="In Progress"
          />

          <RequestItem
            title="Leave Request"
            date="20 Sep 2026"
            status="Approved"
          />
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Campus Updates</h2>
              <p>Latest important announcements</p>
            </div>
          </div>

          <NoticeItem title="Mid Semester Examination Schedule" date="Today" />

          <NoticeItem title="Fee payment deadline extended" date="Yesterday" />

          <NoticeItem
            title="Cultural Fest registrations open"
            date="2 days ago"
          />
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
