function Sidebar({ role, userId, activePage, setActivePage }) {
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

    ["📊", "Attendance"],
    ["📅", "Timetable"],
    ["📄", "Requests"],
    ["🔧", "Complaints"],
    ["📢", "Announcements"],
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

  // Select menu according to logged-in role
  const menu =
    role === "student" ? studentMenu : role === "staff" ? staffMenu : adminMenu;

  // Show the logged-in user's name/ID
  const displayName =
    userId && userId.trim() !== ""
      ? userId
      : role === "student"
        ? "Student"
        : role === "staff"
          ? "Faculty"
          : "Admin";

  // First letter for avatar
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <aside className="sidebar">
      {/* CampusOne Logo */}
      <div className="brand">
        <div className="brand-icon">C</div>

        <div>
          <h2>CampusOne</h2>
          <span>Smart Campus</span>
        </div>
      </div>

      {/* Portal Name */}
      <div className="portal-label">
        {role === "student"
          ? "STUDENT PORTAL"
          : role === "staff"
            ? "FACULTY & STAFF"
            : "ADMINISTRATION"}
      </div>

      {/* Navigation Menu */}
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

      {/* Bottom Section */}
      <div className="sidebar-bottom">
        {/* Settings */}
        <button className="nav-item" onClick={() => setActivePage("Settings")}>
          ⚙️ Settings
        </button>

        {/* Logged-in User */}
        <div className="sidebar-user">
          <div className="avatar">{avatarLetter}</div>

          <div>
            <strong>{displayName}</strong>

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
