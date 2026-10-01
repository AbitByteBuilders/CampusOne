function Settings() {
  return (
    <div className="panel page-placeholder">
      <div className="empty-icon">⚙️</div>

      <h2>Settings</h2>

      <p>Manage your profile, notifications and account preferences.</p>

      <div className="admin-actions">
        <button>👤 Profile</button>
        <button>🔔 Notifications</button>
        <button>🔒 Change Password</button>
      </div>
    </div>
  );
}

export default Settings;
