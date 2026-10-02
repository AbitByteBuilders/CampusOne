import { useState, useEffect } from "react";
import StudentDashboard from "./pages/student/StudentDashboard";
import HostelComplaints from "./pages/student/HostelComplaints";
import Fees from "./pages/student/Fees";
import Notices from "./pages/student/Notices";
import Settings from "./pages/student/Settings";

import Attendance from "./pages/shared/Attendance";
import Timetable from "./pages/shared/Timetable";
import Requests from "./pages/shared/Requests";
import MessMenu from "./pages/shared/MessMenu";

function App() {
  const [role, setRole] = useState("student");
  const [activePage, setActivePage] = useState("Dashboard");

  const studentMenu = [
    ["🏠", "Dashboard"],
    ["📊", "Attendance"],
    ["📅", "Timetable"],
    ["📄", "Requests"],
    ["🏠", "Hostel"],
    ["🍱", "Mess"],
    ["📢", "Notices"],
    ["💳", "Fees"],
  ];

  const staffMenu = [
    ["📊", "Dashboard"],
    ["👨‍🎓", "Students"],
    ["📊", "Attendance"],
    ["📅", "Timetable"],
    ["📄", "Requests"],
    ["🔧", "Complaints"],
    ["📢", "Announcements"],
    ["🍱", "Mess"],
  ];

  // ⭐ ADMINISTRATION MENU
  const adminMenu = [
    ["🏢", "Dashboard"],
    ["📋", "Complaints"],
    ["🔧", "Maintenance"],
    ["🚪", "Rooms"],
    ["📦", "Assets"],
    ["🍽️", "Mess"],
    ["👥", "Visitors"],
    ["🚧", "Gate Logs"],
    ["📢", "Communication"],
    ["👨‍💼", "Staff Workload"],
    ["📊", "Reports"],
  ];

  // ⭐ CHANGED: supports Student + Faculty + Admin
  const menu =
    role === "student" ? studentMenu : role === "staff" ? staffMenu : adminMenu;

  return (
    <div className="app">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">C</div>

          <div>
            <h2>CampusOne</h2>
            <span>Smart Campus</span>
          </div>
        </div>

        {/* ⭐ CHANGED: ADMINISTRATION LABEL ADDED */}
        <div className="portal-label">
          {role === "student"
            ? "STUDENT PORTAL"
            : role === "staff"
              ? "FACULTY & STAFF"
              : "ADMINISTRATION"}
        </div>

        <nav>
          {menu.map(([icon, name]) => (
            <button
              key={name}
              className={`nav-item ${activePage === name ? "active" : ""}`}
              onClick={() => setActivePage(name)}
            >
              <span>{icon}</span>
              {name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="nav-item"
            onClick={() => setActivePage("Settings")}
          >
            ⚙️ Settings
          </button>

          {/* ⭐ CHANGED: ADMIN USER INFORMATION ADDED */}
          <div className="sidebar-user">
            <div className="avatar">
              {role === "student" ? "P" : role === "staff" ? "F" : "A"}
            </div>

            <div>
              <strong>
                {role === "student"
                  ? "Pratyusha"
                  : role === "staff"
                    ? "Faculty Admin"
                    : "Campus Admin"}
              </strong>

              <small>
                {role === "student"
                  ? "Student"
                  : role === "staff"
                    ? "Faculty"
                    : "Administrator"}
              </small>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="main">
        {/* ================= TOPBAR ================= */}
        <header className="topbar">
          <div className="mobile-brand">CampusOne</div>

          <div className="search-box">
            🔍
            <input placeholder="Search anything..." />
          </div>

          <div className="top-actions">
            <button className="icon-button">
              🔔
              <span className="notification-dot"></span>
            </button>

            {/* ⭐ CHANGED: ADMIN BUTTON ADDED */}
            <div className="role-switch">
              <button
                className={role === "student" ? "selected" : ""}
                onClick={() => {
                  setRole("student");
                  setActivePage("Dashboard");
                }}
              >
                Student
              </button>

              <button
                className={role === "staff" ? "selected" : ""}
                onClick={() => {
                  setRole("staff");
                  setActivePage("Dashboard");
                }}
              >
                Faculty
              </button>

              <button
                className={role === "admin" ? "selected" : ""}
                onClick={() => {
                  setRole("admin");
                  setActivePage("Dashboard");
                }}
              >
                Admin
              </button>
            </div>
          </div>
        </header>

        {/* ================= PAGE ================= */}
        <section className="page">
          {/* ================= PAGE HEADER ================= */}
          <div className="page-header">
            <div>
              <div className="breadcrumb">CampusOne / {activePage}</div>

              {/* ⭐ CHANGED: ADMIN DASHBOARD TITLE ADDED */}
              <h1>
                {activePage === "Dashboard"
                  ? role === "student"
                    ? "Good morning, Pratyusha 👋"
                    : role === "staff"
                      ? "Faculty Dashboard"
                      : "Administration Dashboard"
                  : activePage}
              </h1>

              {/* ⭐ CHANGED: ADMIN DESCRIPTION ADDED */}
              <p>
                {role === "student"
                  ? "Everything you need for your campus life."
                  : role === "staff"
                    ? "Manage students, academics and campus operations."
                    : "Manage campus facilities, complaints and administration."}
              </p>
            </div>

            {/* ⭐ CHANGED: ADMIN CAN ALSO ADD/MODIFY */}
            {(role === "staff" || role === "admin") && (
              <button className="primary-button">+ Add New</button>
            )}
          </div>

          {/* ================= DASHBOARD ================= */}
          {activePage === "Dashboard" && (
            <>
              {role === "student" ? (
                <StudentDashboard />
              ) : role === "staff" ? (
                <StaffDashboard />
              ) : (
                <AdminDashboard />
              )}
            </>
          )}

          {/* ================= OTHER PAGES ================= */}
          {activePage !== "Dashboard" &&
            (role === "student" ? (
              activePage === "Attendance" ? (
                <Attendance />
              ) : activePage === "Timetable" ? (
                <Timetable />
              ) : activePage === "Requests" ? (
                <Requests />
              ) : activePage === "Hostel" ? (
                <HostelComplaints />
              ) : activePage === "Mess" ? (
                <MessMenu />
              ) : activePage === "Notices" ? (
                <Notices />
              ) : activePage === "Fees" ? (
                <Fees />
              ) : activePage === "Settings" ? (
                <Settings />
              ) : null
            ) : (
              <PageContent page={activePage} role={role} />
            ))}
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   STAFF DASHBOARD
========================================================= */

function StaffDashboard() {
  return (
    <>
      <div className="stats-grid">
        <Stat
          icon="👨‍🎓"
          title="Total Students"
          value="2,084"
          extra="Across all departments"
        />

        <Stat
          icon="📄"
          title="Pending Requests"
          value="24"
          extra="8 need attention"
        />

        <Stat
          icon="🔧"
          title="Open Complaints"
          value="12"
          extra="3 aging complaints"
        />

        <Stat
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

          <AdminRequest
            title="Bonafide Certificate"
            student="Rahul Kumar • CSE 5th"
            status="Pending"
          />

          <AdminRequest
            title="Gate Pass"
            student="Sneha Das • CSE 3rd"
            status="Pending"
          />

          <AdminRequest
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

/* =========================================================
   ⭐ ADMINISTRATION DASHBOARD
========================================================= */

/* =========================================================
   ⭐ ADMINISTRATION DASHBOARD
========================================================= */

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
        <Stat icon="📋" title="Pending Complaints" value={complaints.length} extra="Needs attention" />
        <Stat icon="🔧" title="Maintenance" value="8" extra="Active tickets" />
        <Stat icon="👥" title="Visitors Today" value="34" extra="Campus visitors" />
        <Stat icon="📦" title="Assets" value="248" extra="Tracked assets" />
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
                
                <Status status={ticket.sla_color === "Red" ? "Critical" : ticket.sla_color === "Yellow" ? "Warning" : "New"} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

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

function AdminRequest({ title, student, status }) {
  return (
    <div className="admin-request">
      <div>
        <strong>{title}</strong>

        <p>{student}</p>
      </div>

      <div className="request-actions">
        <Status status={status} />

        <button className="edit-button">Review</button>
      </div>
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

/* =========================================================
   PAGE CONTENT
========================================================= */

function PageContent({ page, role }) {
  const descriptions = {
    Attendance: "View and manage student attendance records.",

    Timetable: "View and update class schedules.",

    Requests: "Track certificates, leave requests and gate passes.",

    Hostel: "Manage hostel complaints and maintenance requests.",

    Mess: "View the mess menu and manage feedback.",

    Notices: "Campus announcements and targeted notifications.",

    Fees: "View semester fees and payment information.",

    Students: "View and manage student information.",

    Complaints: "Track, assign and resolve campus complaints.",

    Announcements: "Create targeted announcements and track read status.",

    // ⭐ ADMIN PAGES ADDED
    Maintenance: "Track maintenance requests and monitor their resolution.",

    Rooms: "Manage campus rooms, classrooms and facility availability.",

    Assets: "Track campus equipment, furniture and other assets.",

    Visitors: "Manage visitor records and campus visitor information.",

    "Gate Logs": "View and monitor campus entry and exit records.",

    Communication: "Send targeted communication to students and staff.",

    "Staff Workload": "Monitor staff assignments, workload and pending tasks.",

    Reports: "View administrative reports and campus operation insights.",
  };

  return (
    <div className="panel page-placeholder">
      <div className="empty-icon">
        {role === "student" ? "📚" : role === "staff" ? "⚙️" : "🏢"}
      </div>

      <h2>{page}</h2>

      <p>{descriptions[page] || "Manage this CampusOne section."}</p>

      {/* ⭐ CHANGED: ADMIN CAN ALSO MODIFY */}
      {(role === "staff" || role === "admin") && (
        <button className="primary-button">+ Add / Modify Information</button>
      )}
    </div>
  );
}

export default App;
