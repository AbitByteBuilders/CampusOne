import { useState } from "react";

function Settings({ userId }) {
  const [activeTab, setActiveTab] = useState("Profile");
  const [notifications, setNotifications] = useState({
    attendance: true,
    notices: true,
    fees: true,
    requests: true,
  });

  const displayName = userId && userId.trim() !== "" ? userId : "Student";

  const tabs = [
    ["👤", "Profile"],
    ["🔔", "Notifications"],
    ["🔒", "Password"],
    ["🎨", "Appearance"],
  ];

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="student-settings-page">
      {" "}
      <div className="panel settings-hero">
        {" "}
        <div>
          {" "}
          <h2>Student Settings</h2>{" "}
          <p>Manage your profile, notifications and preferences.</p>{" "}
        </div>
        ```
        <div className="settings-profile-mini">
          <div className="settings-avatar">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <strong>{displayName}</strong>
            <span>Student</span>
          </div>
        </div>
      </div>
      <div className="settings-layout">
        <div className="panel settings-sidebar">
          <h3>Settings</h3>

          {tabs.map(([icon, name]) => (
            <button
              key={name}
              className={`settings-tab ${activeTab === name ? "active" : ""}`}
              onClick={() => setActiveTab(name)}
            >
              <span>{icon}</span>
              {name}
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === "Profile" && (
            <>
              <div className="panel settings-section">
                <div className="settings-section-header">
                  <div>
                    <h2>Profile Information</h2>
                    <p>Your basic student information</p>
                  </div>
                  <span className="settings-badge">Student</span>
                </div>

                <div className="profile-large">
                  <div className="profile-large-avatar">
                    {displayName.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3>{displayName}</h3>
                    <p>CampusOne Student</p>
                  </div>
                </div>

                <div className="settings-form-grid">
                  <div className="settings-field">
                    <label>Full Name</label>
                    <input type="text" defaultValue={displayName} />
                  </div>

                  <div className="settings-field">
                    <label>Student ID</label>
                    <input type="text" defaultValue={displayName} readOnly />
                  </div>

                  <div className="settings-field">
                    <label>Email</label>
                    <input type="email" placeholder="student@campusone.edu" />
                  </div>

                  <div className="settings-field">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Enter phone number" />
                  </div>
                </div>

                <button className="primary-button" onClick={handleSave}>
                  Save Profile
                </button>
              </div>

              <div className="panel settings-section">
                <div className="settings-section-header">
                  <div>
                    <h2>Academic Information</h2>
                    <p>Your academic details</p>
                  </div>
                </div>

                <div className="settings-info-grid">
                  <div>
                    <span>Department</span>
                    <strong>Computer Science & Engineering</strong>
                  </div>

                  <div>
                    <span>Program</span>
                    <strong>B.Tech</strong>
                  </div>

                  <div>
                    <span>Semester</span>
                    <strong>5th Semester</strong>
                  </div>

                  <div>
                    <span>Academic Year</span>
                    <strong>2026–27</strong>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "Notifications" && (
            <div className="panel settings-section">
              <div className="settings-section-header">
                <div>
                  <h2>Notification Preferences</h2>
                  <p>Choose which updates you want to receive.</p>
                </div>
              </div>

              <div className="settings-options">
                <label className="settings-option">
                  <div>
                    <strong>Attendance Alerts</strong>
                    <span>Get notified about attendance shortages.</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={notifications.attendance}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        attendance: !notifications.attendance,
                      })
                    }
                  />
                </label>

                <label className="settings-option">
                  <div>
                    <strong>College Notices</strong>
                    <span>Receive important campus announcements.</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={notifications.notices}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        notices: !notifications.notices,
                      })
                    }
                  />
                </label>

                <label className="settings-option">
                  <div>
                    <strong>Fee Reminders</strong>
                    <span>Get reminders about pending fees.</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={notifications.fees}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        fees: !notifications.fees,
                      })
                    }
                  />
                </label>

                <label className="settings-option">
                  <div>
                    <strong>Request Updates</strong>
                    <span>Get updates when your requests change status.</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={notifications.requests}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        requests: !notifications.requests,
                      })
                    }
                  />
                </label>
              </div>

              <button className="primary-button" onClick={handleSave}>
                Save Preferences
              </button>
            </div>
          )}

          {activeTab === "Password" && (
            <div className="panel settings-section">
              <div className="settings-section-header">
                <div>
                  <h2>Change Password</h2>
                  <p>Keep your CampusOne account secure.</p>
                </div>
              </div>

              <div className="settings-form-single">
                <div className="settings-field">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>

                <div className="settings-field">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>

                <div className="settings-field">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>
              </div>

              <button className="primary-button" onClick={handleSave}>
                Update Password
              </button>
            </div>
          )}

          {activeTab === "Appearance" && (
            <div className="panel settings-section">
              <div className="settings-section-header">
                <div>
                  <h2>Appearance</h2>
                  <p>Customize how CampusOne looks for you.</p>
                </div>
              </div>

              <div className="appearance-options">
                <button className="appearance-card active">
                  <span>☀️</span>
                  <div>
                    <strong>Light Mode</strong>
                    <small>Clean and bright interface</small>
                  </div>
                  <b>✓</b>
                </button>

                <button
                  className="appearance-card"
                  onClick={() => alert("Dark mode will be available soon.")}
                >
                  <span>🌙</span>
                  <div>
                    <strong>Dark Mode</strong>
                    <small>Comfortable for low-light use</small>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
