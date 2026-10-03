function Settings() {
  return (
    <div className="settings-page">
      <div className="panel settings-header">
        <div className="settings-profile">
          <div className="settings-avatar">P</div>

          <div>
            <h2>Pratyusha</h2>
            <p>Student • CSE • 5th Semester</p>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Account Settings</h2>
            <p>Manage your account and preferences</p>
          </div>
        </div>

        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-icon">👤</div>
            <div>
              <strong>Profile</strong>
              <span>Update your personal information</span>
            </div>
            <button className="small-button">Edit</button>
          </div>

          <div className="settings-item">
            <div className="settings-icon">🔔</div>
            <div>
              <strong>Notifications</strong>
              <span>Manage your notification preferences</span>
            </div>
            <button className="small-button">Manage</button>
          </div>

          <div className="settings-item">
            <div className="settings-icon">🔒</div>
            <div>
              <strong>Change Password</strong>
              <span>Update your account password</span>
            </div>
            <button className="small-button">Change</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
