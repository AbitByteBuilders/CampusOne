import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import PageHeader from "./components/PageHeader";

import StudentDashboard from "./pages/student/StudentDashboard";
import HostelComplaints from "./pages/student/HostelComplaints";
import Fees from "./pages/student/Fees";
import Notices from "./pages/student/Notices";
import Settings from "./pages/student/Settings";

import Attendance from "./pages/shared/Attendance";
import Timetable from "./pages/shared/Timetable";
import Requests from "./pages/shared/Requests";
import MessMenu from "./pages/shared/MessMenu";

import StaffDashboard from "./pages/staff/StaffDashboard";
import Students from "./pages/staff/Students";
import Complaints from "./pages/staff/Complaints";
import Announcements from "./pages/staff/Announcements";
import FacultyTimetable from "./pages/staff/FacultyTimetable";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminComplaints from "./pages/admin/Complaints";
import Maintenance from "./pages/admin/Maintenance";
import Rooms from "./pages/admin/Rooms";
import Assets from "./pages/admin/Assets";
import Mess from "./pages/admin/Mess";
import Visitors from "./pages/admin/Visitors";
import GateLogs from "./pages/admin/GateLogs";
import Communication from "./pages/admin/Communication";
import StaffWorkload from "./pages/admin/StaffWorkload";
import Reports from "./pages/admin/Reports";

import Login from "./pages/auth/loginn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("student");
  const [userId, setUserId] = useState("");
  const [activePage, setActivePage] = useState("Dashboard");

  // ================= LOGIN =================

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={(selectedRole, enteredUserId) => {
          setRole(selectedRole);
          setUserId(enteredUserId);
          setActivePage("Dashboard");
          setIsLoggedIn(true);
        }}
      />
    );
  }

  // ================= MAIN APP =================

  return (
    <div className="app">
      <Sidebar
        role={role}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main">
        <Topbar
          onLogout={() => {
            setIsLoggedIn(false);
            setUserId("");
            setRole("student");
            setActivePage("Dashboard");
          }}
        />

        <section className="page">
          <PageHeader role={role} activePage={activePage} />

          {/* ================= DASHBOARD ================= */}

          {activePage === "Dashboard" && (
            <>
              {role === "student" ? (
                <StudentDashboard userId={userId} />
              ) : role === "staff" ? (
                <StaffDashboard userId={userId} />
              ) : (
                <AdminDashboard userId={userId} />
              )}
            </>
          )}

          {/* ================= OTHER PAGES ================= */}

          {activePage !== "Dashboard" &&
            (role === "student" ? (
              activePage === "Attendance" ? (
                <Attendance />
              ) : activePage === "Timetable" ? (
                <Timetable />
              ) : activePage === "Requests" ? (
                <Requests />
              ) : activePage === "Hostel" ? (
                <HostelComplaints />
              ) : activePage === "Mess" ? (
                <MessMenu />
              ) : activePage === "Notices" ? (
                <Notices />
              ) : activePage === "Fees" ? (
                <Fees />
              ) : activePage === "Settings" ? (
                <Settings />
              ) : null
            ) : role === "staff" ? (
              activePage === "Students" ? (
                <Students />
              ) : activePage === "Attendance" ? (
                <Attendance />
              ) : activePage === "Timetable" ? (
                <FacultyTimetable />
              ) : activePage === "Requests" ? (
                <Requests />
              ) : activePage === "Complaints" ? (
                <Complaints />
              ) : activePage === "Announcements" ? (
                <Announcements />
              ) : activePage === "Mess" ? (
                <MessMenu />
              ) : null
            ) : activePage === "Complaints" ? (
              <AdminComplaints />
            ) : activePage === "Maintenance" ? (
              <Maintenance />
            ) : activePage === "Rooms" ? (
              <Rooms />
            ) : activePage === "Assets" ? (
              <Assets />
            ) : activePage === "Mess" ? (
              <Mess />
            ) : activePage === "Visitors" ? (
              <Visitors />
            ) : activePage === "Gate Logs" ? (
              <GateLogs />
            ) : activePage === "Communication" ? (
              <Communication />
            ) : activePage === "Staff Workload" ? (
              <StaffWorkload />
            ) : activePage === "Reports" ? (
              <Reports />
            ) : null)}
        </section>
      </main>
    </div>
  );
}

export default App;
