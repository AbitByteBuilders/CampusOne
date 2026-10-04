function PageHeader({ role, userId, activePage }) {
  const hour = new Date().getHours();

  let greeting;

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const displayName =
    userId && userId.trim() !== ""
      ? userId
      : role === "student"
        ? "Student"
        : role === "staff"
          ? "Faculty"
          : "Admin";

  return (
    <div className="page-header">
      <div>
        <div className="breadcrumb">CampusOne / {activePage}</div>

        <h1>
          {activePage === "Dashboard"
            ? role === "student"
              ? `${greeting}, ${displayName} 👋`
              : role === "staff"
                ? `${greeting}, ${displayName} 👋`
                : `${greeting}, ${displayName} 👋`
            : activePage}
        </h1>

        <p>
          {role === "student"
            ? "Everything you need for your campus life."
            : role === "staff"
              ? "Manage students, academics and campus operations."
              : "Manage campus facilities, complaints and administration."}
        </p>
      </div>

      {(role === "staff" || role === "admin") && (
        <button className="primary-button">+ Add New</button>
      )}
    </div>
  );
}

export default PageHeader;
