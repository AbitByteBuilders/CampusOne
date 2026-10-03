import { useState } from "react";

function Login({ onLogin }) {
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!userId || !password) {
      alert("Please enter your ID/name and password.");
      return;
    }

    onLogin(role, userId);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-icon">C</div>
          <h1>CampusOne</h1>
          <p>Smart Campus Management</p>
        </div>

        <form onSubmit={handleLogin}>
          <label>Login as</label>

          <div className="login-roles">
            <button
              type="button"
              className={role === "student" ? "selected" : ""}
              onClick={() => setRole("student")}
            >
              👨‍🎓 Student
            </button>

            <button
              type="button"
              className={role === "staff" ? "selected" : ""}
              onClick={() => setRole("staff")}
            >
              👨‍🏫 Faculty
            </button>

            <button
              type="button"
              className={role === "admin" ? "selected" : ""}
              onClick={() => setRole("admin")}
            >
              🏢 Admin
            </button>
          </div>

          <label>Name / ID</label>
          <input
            type="text"
            placeholder="Enter your name or ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
