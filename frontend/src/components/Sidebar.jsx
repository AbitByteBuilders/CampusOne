function Sidebar({ role, activePage, setActivePage }) {
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

  const menu =
    role === "student" ? studentMenu : role === "staff" ? staffMenu : adminMenu;

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">C</div>

        <div>
          <h2>CampusOne</h2>
          <span>Smart Campus</span>
        </div>
      </div>

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
        <button className="nav-item" onClick={() => setActivePage("Settings")}>
          ⚙️ Settings
        </button>

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
  );
}

export default Sidebar;
