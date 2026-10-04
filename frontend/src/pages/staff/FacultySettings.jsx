import { useEffect, useState } from "react";

function FacultySettings({ userId }) {
  const displayName = userId && userId.trim() !== "" ? userId : "Faculty";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  const [activeTab, setActiveTab] = useState("Profile");

  const [fullName, setFullName] = useState(displayName);
  const [email, setEmail] = useState("faculty@campusone.edu");
  const [phone, setPhone] = useState("+91 98765 43210");

  const [emailNotifications, setEmailNotifications] = useState(true);

  const [attendanceAlerts, setAttendanceAlerts] = useState(true);

  const [requestAlerts, setRequestAlerts] = useState(true);

  const [complaintAlerts, setComplaintAlerts] = useState(true);

  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("campusone-theme") || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);

    localStorage.setItem("campusone-theme", selectedTheme);
  }, [selectedTheme]);

  const saveProfile = () => {
    alert("Faculty profile saved successfully.");
  };

  const saveNotifications = () => {
    alert("Notification settings saved successfully.");
  };

  const changePassword = (event) => {
    event.preventDefault();

    const newPassword = event.target.newPassword.value;

    const confirmPassword = event.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    alert("Password changed successfully.");
    event.target.reset();
  };

  const tabs = [
    ["👤", "Profile"],
    ["🔔", "Notifications"],
    ["🔒", "Password"],
    ["🎨", "Appearance"],
  ];

  return (
    <div className="faculty-settings-page">
      <div className="panel faculty-settings-hero">
        <div>
          <h2>Faculty Settings</h2>

          <p>
            Manage your faculty profile, notifications, security and appearance.
          </p>
        </div>

        <div className="faculty-settings-profile-mini">
          <div className="faculty-settings-avatar">{avatarLetter}</div>

          <div>
            <strong>{displayName}</strong>
            <span>Faculty</span>
          </div>
        </div>
      </div>

      <div className="faculty-settings-layout">
        <div className="panel faculty-settings-sidebar">
          <h3>Settings</h3>

          {tabs.map(([icon, name]) => (
            <button
              key={name}
              type="button"
              className={`faculty-settings-tab ${
                activeTab === name ? "active" : ""
              }`}
              onClick={() => setActiveTab(name)}
            >
              <span>{icon}</span>
              {name}
            </button>
          ))}
        </div>

        <div className="faculty-settings-content">
          {activeTab === "Profile" && (
            <>
              <div className="panel faculty-settings-section">
                <div className="faculty-settings-section-header">
                  <div>
                    <h2>Faculty Profile</h2>

                    <p>Update your personal and contact information.</p>
                  </div>

                  <span className="faculty-settings-badge">Faculty</span>
                </div>

                <div className="faculty-profile-large">
                  <div className="faculty-profile-large-avatar">
                    {avatarLetter}
                  </div>

                  <div>
                    <h3>{displayName}</h3>

                    <p>Faculty & Staff • CampusOne</p>
                  </div>
                </div>

                <div className="faculty-settings-form-grid">
                  <div className="faculty-settings-field">
                    <label>Full Name</label>

                    <input
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                    />
                  </div>

                  <div className="faculty-settings-field">
                    <label>Faculty ID</label>

                    <input type="text" value={userId || "FAC001"} readOnly />
                  </div>

                  <div className="faculty-settings-field">
                    <label>Email Address</label>

                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div className="faculty-settings-field">
                    <label>Phone Number</label>

                    <input
                      type="text"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>

                  <div className="faculty-settings-field">
                    <label>Department</label>

                    <input
                      type="text"
                      value="Computer Science & Engineering"
                      readOnly
                    />
                  </div>

                  <div className="faculty-settings-field">
                    <label>Designation</label>

                    <input type="text" value="Assistant Professor" readOnly />
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

              <div className="panel faculty-settings-section">
                <div className="faculty-settings-section-header">
                  <div>
                    <h2>Teaching Information</h2>

                    <p>Your current academic responsibilities.</p>
                  </div>
                </div>

                <div className="faculty-settings-info-grid">
                  <div>
                    <span>Department</span>
                    <strong>Computer Science & Engineering</strong>
                  </div>

                  <div>
                    <span>Subjects Assigned</span>
                    <strong>6 Subjects</strong>
                  </div>

                  <div>
                    <span>Current Semester</span>
                    <strong>5th Semester</strong>
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
            <div className="panel faculty-settings-section">
              <div className="faculty-settings-section-header">
                <div>
                  <h2>Notification Settings</h2>

                  <p>Choose which faculty notifications you want to receive.</p>
                </div>
              </div>

              <div className="faculty-settings-options">
                <label className="faculty-settings-option">
                  <div>
                    <strong>Email Notifications</strong>

                    <span>
                      Receive important campus and academic updates by email.
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(event) =>
                      setEmailNotifications(event.target.checked)
                    }
                  />
                </label>

                <label className="faculty-settings-option">
                  <div>
                    <strong>Attendance Alerts</strong>

                    <span>
                      Receive alerts about student attendance shortages.
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

                <label className="faculty-settings-option">
                  <div>
                    <strong>Student Request Alerts</strong>

                    <span>Get notified when students submit new requests.</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={requestAlerts}
                    onChange={(event) => setRequestAlerts(event.target.checked)}
                  />
                </label>

                <label className="faculty-settings-option">
                  <div>
                    <strong>Complaint Alerts</strong>

                    <span>Receive updates about faculty complaints.</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={complaintAlerts}
                    onChange={(event) =>
                      setComplaintAlerts(event.target.checked)
                    }
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
            <div className="panel faculty-settings-section">
              <div className="faculty-settings-section-header">
                <div>
                  <h2>Change Password</h2>

                  <p>Keep your faculty CampusOne account secure.</p>
                </div>
              </div>

              <form
                className="faculty-settings-form-single"
                onSubmit={changePassword}
              >
                <div className="faculty-settings-field">
                  <label>Current Password</label>

                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="faculty-settings-field">
                  <label>New Password</label>

                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="faculty-settings-field">
                  <label>Confirm New Password</label>

                  <input
                    type="password"
                    name="confirmPassword"
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
            <div className="panel faculty-settings-section">
              <div className="faculty-settings-section-header">
                <div>
                  <h2>Appearance</h2>

                  <p>Choose how the CampusOne faculty portal looks.</p>
                </div>
              </div>

              <div className="faculty-appearance-options">
                <button
                  type="button"
                  className={`faculty-appearance-card ${
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
                  className={`faculty-appearance-card ${
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

              <div className="faculty-theme-status">
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

export default FacultySettings;
