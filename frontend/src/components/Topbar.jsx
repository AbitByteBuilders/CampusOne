function Topbar({ role, setRole, setActivePage }) {
  return (
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
  );
}

export default Topbar;
