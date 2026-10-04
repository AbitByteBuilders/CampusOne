import { useState } from "react";

function FacultySettings({ userId }) {
  const [activeSection, setActiveSection] = useState("profile");

  const [profile, setProfile] = useState({
    name: userId || "Faculty",
    email: "faculty@campusone.edu",
    phone: "+91 98765 43210",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor",
    employeeId: "FAC-001",
  });

  const [notifications, setNotifications] = useState({
    announcements: true,
    attendance: true,
    complaints: true,
    requests: false,
    email: true,
  });

  const [appearance, setAppearance] = useState("light");

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = () => {
    alert("Profile changes saved successfully.");
  };

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.newPassword || !passwords.confirm) {
      alert("Please fill in all password fields.");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      alert("New password and confirm password do not match.");
      return;
    }

    alert("Password changed successfully.");

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });
  };

  const sections = [
    ["👤", "Profile", "profile"],
    ["🔔", "Notifications", "notifications"],
    ["🔐", "Password", "password"],
    ["🎨", "Appearance", "appearance"],
  ];

  return (
    <div className="faculty-settings-page">
      {/* Header */}
      <div className="faculty-settings-header">
        <div>
          <h2>Faculty Settings</h2>
          <p>Manage your faculty profile and preferences</p>
        </div>
      </div>

      <div className="faculty-settings-layout">
        {/* Settings Navigation */}
        <div className="faculty-settings-sidebar">
          {sections.map(([icon, label, section]) => (
            <button
              key={section}
              className={
                activeSection === section
                  ? "faculty-settings-nav active"
                  : "faculty-settings-nav"
              }
              onClick={() => setActiveSection(section)}
            >
              <span>{icon}</span>
              <div>
                <strong>{label}</strong>
                <small>
                  {section === "profile"
                    ? "Personal information"
                    : section === "notifications"
                      ? "Alerts and updates"
                      : section === "password"
                        ? "Security settings"
                        : "Display preferences"}
                </small>
              </div>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="faculty-settings-content">
          {/* PROFILE */}
          {activeSection === "profile" && (
            <div className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Faculty Profile</h2>
                  <p>Update your professional information</p>
                </div>
              </div>

              {/* Profile Avatar */}
              <div className="faculty-profile-preview">
                <div className="faculty-profile-avatar">
                  {profile.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3>{profile.name}</h3>
                  <p>{profile.designation}</p>
                  <span>{profile.department}</span>
                </div>
              </div>

              <div className="settings-form-grid">
                <div className="settings-form-group">
                  <label>Full Name</label>
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="settings-form-group">
                  <label>Employee ID</label>
                  <input value={profile.employeeId} disabled />
                </div>

                <div className="settings-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="settings-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="settings-form-group">
                  <label>Department</label>
                  <input
                    name="department"
                    value={profile.department}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="settings-form-group">
                  <label>Designation</label>
                  <input
                    name="designation"
                    value={profile.designation}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>

              <div className="settings-actions">
                <button className="primary-button" onClick={handleSaveProfile}>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === "notifications" && (
            <div className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Notification Preferences</h2>
                  <p>Choose which notifications you want to receive</p>
                </div>
              </div>

              <div className="settings-toggle-list">
                <div className="settings-toggle">
                  <div>
                    <strong>📢 Announcements</strong>
                    <p>Receive important campus announcements</p>
                  </div>

                  <input
                    type="checkbox"
                    checked={notifications.announcements}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        announcements: !notifications.announcements,
                      })
                    }
                  />
                </div>

                <div className="settings-toggle">
                  <div>
                    <strong>📊 Attendance Alerts</strong>
                    <p>Receive notifications about attendance issues</p>
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
                </div>

                <div className="settings-toggle">
                  <div>
                    <strong>🔧 Complaint Updates</strong>
                    <p>Get updates when complaints change status</p>
                  </div>

                  <input
                    type="checkbox"
                    checked={notifications.complaints}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        complaints: !notifications.complaints,
                      })
                    }
                  />
                </div>

                <div className="settings-toggle">
                  <div>
                    <strong>📄 Student Requests</strong>
                    <p>Receive notifications for student requests</p>
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
                </div>

                <div className="settings-toggle">
                  <div>
                    <strong>📧 Email Notifications</strong>
                    <p>Receive important updates by email</p>
                  </div>

                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        email: !notifications.email,
                      })
                    }
                  />
                </div>
              </div>

              <div className="settings-actions">
                <button
                  className="primary-button"
                  onClick={() => alert("Notification preferences saved.")}
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* PASSWORD */}
          {activeSection === "password" && (
            <div className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Change Password</h2>
                  <p>Keep your faculty account secure</p>
                </div>
              </div>

              <div className="security-message">
                🔐 Use a strong password containing letters, numbers and special
                characters.
              </div>

              <div className="settings-password-form">
                <div className="settings-form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="settings-form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="settings-form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="settings-actions">
                <button
                  className="primary-button"
                  onClick={handleChangePassword}
                >
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* APPEARANCE */}
          {activeSection === "appearance" && (
            <div className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h2>Appearance</h2>
                  <p>Customize how CampusOne looks</p>
                </div>
              </div>

              <div className="appearance-options">
                <button
                  className={
                    appearance === "light"
                      ? "appearance-option active"
                      : "appearance-option"
                  }
                  onClick={() => setAppearance("light")}
                >
                  <div className="appearance-preview light-preview">☀️</div>

                  <div>
                    <strong>Light Mode</strong>
                    <p>Clean and bright interface</p>
                  </div>
                </button>

                <button
                  className={
                    appearance === "dark"
                      ? "appearance-option active"
                      : "appearance-option"
                  }
                  onClick={() => setAppearance("dark")}
                >
                  <div className="appearance-preview dark-preview">🌙</div>

                  <div>
                    <strong>Dark Mode</strong>
                    <p>Comfortable interface for low light</p>
                  </div>
                </button>
              </div>

              <div className="settings-actions">
                <button
                  className="primary-button"
                  onClick={() => alert(`${appearance} mode selected.`)}
                >
                  Save Appearance
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacultySettings;
