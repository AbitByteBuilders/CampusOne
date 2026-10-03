function Topbar({ onLogout }) {
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

        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;
