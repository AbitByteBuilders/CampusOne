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

function App() {
  const [role, setRole] = useState("student");
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="app">
      <Sidebar
        role={role}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main">
        <Topbar role={role} setRole={setRole} setActivePage={setActivePage} />

        <section className="page">
          <PageHeader role={role} activePage={activePage} />

          {/* ================= DASHBOARD ================= */}
          {activePage === "Dashboard" && (
            <>
              {role === "student" ? (
                <StudentDashboard />
              ) : role === "staff" ? (
                <StaffDashboard />
              ) : (
                <AdminDashboard />
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
                <Timetable />
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

/* =========================================================
   PAGE CONTENT (Fallback for empty pages)
========================================================= */

function PageContent({ page, role }) {
  const descriptions = {
    Attendance: "View and manage student attendance records.",
    Timetable: "View and update class schedules.",
    Requests: "Track certificates, leave requests and gate passes.",
    Hostel: "Manage hostel complaints and maintenance requests.",
    Mess: "View the mess menu and manage feedback.",
    Notices: "Campus announcements and targeted notifications.",
    Fees: "View semester fees and payment information.",
    Students: "View and manage student information.",
    Complaints: "Track, assign and resolve campus complaints.",
    Announcements: "Create targeted announcements and track read status.",
    Maintenance: "Track maintenance requests and monitor their resolution.",
    Rooms: "Manage campus rooms, classrooms and facility availability.",
    Assets: "Track campus equipment, furniture and other assets.",
    Visitors: "Manage visitor records and campus visitor information.",
    "Gate Logs": "View and monitor campus entry and exit records.",
    Communication: "Send targeted communication to students and staff.",
    "Staff Workload": "Monitor staff assignments, workload and pending tasks.",
    Reports: "View administrative reports and campus operation insights.",
  };

  return (
    <div className="panel page-placeholder">
      <div className="empty-icon">
        {role === "student" ? "📚" : role === "staff" ? "⚙️" : "🏢"}
      </div>
      <h2>{page}</h2>
      <p>{descriptions[page] || "Manage this CampusOne section."}</p>
      {(role === "staff" || role === "admin") && (
        <button className="primary-button">+ Add / Modify Information</button>
      )}
    </div>
  );
}

export default App;