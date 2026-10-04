import { useEffect, useState } from "react";

function Settings({ userId }) {
  const displayName = userId && userId.trim() !== "" ? userId : "Student";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  const [activeTab, setActiveTab] = useState("Profile");

  const [fullName, setFullName] = useState(displayName);
  const [email, setEmail] = useState("student@campusone.edu");
  const [phone, setPhone] = useState("+91 98765 43210");

  const [emailNotifications, setEmailNotifications] = useState(true);

  const [attendanceAlerts, setAttendanceAlerts] = useState(true);

  const [noticeAlerts, setNoticeAlerts] = useState(true);

  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("campusone-theme") || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);

    localStorage.setItem("campusone-theme", selectedTheme);
  }, [selectedTheme]);

  const saveProfile = () => {
    alert("Profile settings saved successfully.");
  };

  const saveNotifications = () => {
    alert("Notification settings saved successfully.");
  };

  const changePassword = (event) => {
    event.preventDefault();
    alert("Password changed successfully.");
  };

  const tabs = [
    ["👤", "Profile"],
    ["🔔", "Notifications"],
    ["🔒", "Password"],
    ["🎨", "Appearance"],
  ];

  return (
    <div className="student-settings-page">
      <div className="panel settings-hero">
        <div>
          <h2>Settings</h2>
          <p>Manage your profile, notifications and appearance.</p>
        </div>

        <div className="settings-profile-mini">
          <div className="settings-avatar">{avatarLetter}</div>

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
              type="button"
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
                    <p>Update your personal information.</p>
                  </div>

                  <span className="settings-badge">Student</span>
                </div>

                <div className="profile-large">
                  <div className="profile-large-avatar">{avatarLetter}</div>

                  <div>
                    <h3>{displayName}</h3>
                    <p>Student • CampusOne</p>
                  </div>
                </div>

                <div className="settings-form-grid">
                  <div className="settings-field">
                    <label>Full Name</label>

                    <input
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                    />
                  </div>

                  <div className="settings-field">
                    <label>Student ID</label>

                    <input
                      type="text"
                      value={userId || "STUDENT001"}
                      readOnly
                    />
                  </div>

                  <div className="settings-field">
                    <label>Email Address</label>

                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div className="settings-field">
                    <label>Phone Number</label>

                    <input
                      type="text"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>
                </div>

                <button
                  className="primary-button"
                  type="button"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>

              <div className="panel settings-section">
                <div className="settings-section-header">
                  <div>
                    <h2>Academic Information</h2>
                    <p>Your current academic details.</p>
                  </div>
                </div>

                <div className="settings-info-grid">
                  <div>
                    <span>Course</span>
                    <strong>Computer Science & Engineering</strong>
                  </div>

                  <div>
                    <span>Semester</span>
                    <strong>5th Semester</strong>
                  </div>

                  <div>
                    <span>Section</span>
                    <strong>CSE-A</strong>
                  </div>

                  <div>
                    <span>Academic Year</span>
                    <strong>2025–2026</strong>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "Notifications" && (
            <div className="panel settings-section">
              <div className="settings-section-header">
                <div>
                  <h2>Notification Settings</h2>
                  <p>Choose which notifications you want to receive.</p>
                </div>
              </div>

              <div className="settings-options">
                <label className="settings-option">
                  <div>
                    <strong>Email Notifications</strong>

                    <span>Receive important campus updates by email.</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(event) =>
                      setEmailNotifications(event.target.checked)
                    }
                  />
                </label>

                <label className="settings-option">
                  <div>
                    <strong>Attendance Alerts</strong>

                    <span>
                      Get notified when your attendance falls below 75%.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    checked={attendanceAlerts}
                    onChange={(event) =>
                      setAttendanceAlerts(event.target.checked)
                    }
                  />
                </label>

                <label className="settings-option">
                  <div>
                    <strong>Notice Alerts</strong>

                    <span>Receive notifications for new campus notices.</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={noticeAlerts}
                    onChange={(event) => setNoticeAlerts(event.target.checked)}
                  />
                </label>
              </div>

              <button
                className="primary-button"
                type="button"
                onClick={saveNotifications}
              >
                Save Notification Settings
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

              <form className="settings-form-single" onSubmit={changePassword}>
                <div className="settings-field">
                  <label>Current Password</label>

                  <input
                    type="password"
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="settings-field">
                  <label>New Password</label>

                  <input
                    type="password"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="settings-field">
                  <label>Confirm New Password</label>

                  <input
                    type="password"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <button className="primary-button" type="submit">
                  Change Password
                </button>
              </form>
            </div>
          )}

          {activeTab === "Appearance" && (
            <div className="panel settings-section">
              <div className="settings-section-header">
                <div>
                  <h2>Appearance</h2>
                  <p>Choose how CampusOne looks for you.</p>
                </div>
              </div>

              <div className="appearance-options">
                <button
                  type="button"
                  className={`appearance-card ${
                    selectedTheme === "light" ? "active" : ""
                  }`}
                  onClick={() => setSelectedTheme("light")}
                >
                  <span>☀️</span>

                  <div>
                    <strong>Light Mode</strong>

                    <small>Use the bright CampusOne interface.</small>
                  </div>

                  {selectedTheme === "light" && <b>✓</b>}
                </button>

                <button
                  type="button"
                  className={`appearance-card ${
                    selectedTheme === "dark" ? "active" : ""
                  }`}
                  onClick={() => setSelectedTheme("dark")}
                >
                  <span>🌙</span>

                  <div>
                    <strong>Dark Mode</strong>

                    <small>
                      Use a darker interface that is easier on the eyes.
                    </small>
                  </div>

                  {selectedTheme === "dark" && <b>✓</b>}
                </button>
              </div>

              <div className="theme-status">
                <span>Current theme</span>

                <strong>
                  {selectedTheme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
