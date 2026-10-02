function PageHeader({ role, activePage }) {
  return (
    <div className="page-header">
      <div>
        <div className="breadcrumb">CampusOne / {activePage}</div>

        <h1>
          {activePage === "Dashboard"
            ? role === "student"
              ? "Good morning, Pratyusha 👋"
              : role === "staff"
                ? "Faculty Dashboard"
                : "Administration Dashboard"
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
