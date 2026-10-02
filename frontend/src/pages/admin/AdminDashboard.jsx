import StatCard from "../../components/StatCard";

function AdminDashboard() {
  return (
    <>
      <div className="stats-grid">
        <StatCard
          icon="📋"
          title="Pending Complaints"
          value="12"
          extra="Needs attention"
        />

        <StatCard
          icon="🔧"
          title="Maintenance"
          value="8"
          extra="Active tickets"
        />

        <StatCard
          icon="👥"
          title="Visitors Today"
          value="34"
          extra="Campus visitors"
        />

        <StatCard icon="📦" title="Assets" value="248" extra="Tracked assets" />
      </div>

      <div className="panel admin-overview">
        <h2>Administration & Operations</h2>

        <p>
          Manage campus facilities, complaints, maintenance, visitors, assets
          and administrative operations.
        </p>
      </div>

      <div className="cards-grid">
        <div className="panel">
          <h3>Complaint Tracking</h3>

          <p>Track, assign and resolve student and staff complaints.</p>

          <button className="primary-button">Manage Complaints</button>
        </div>

        <div className="panel">
          <h3>Maintenance</h3>

          <p>Monitor maintenance requests and their resolution status.</p>

          <button className="primary-button">View Maintenance</button>
        </div>

        <div className="panel">
          <h3>Facilities</h3>

          <p>Manage rooms, assets, mess facilities and campus resources.</p>

          <button className="primary-button">Manage Facilities</button>
        </div>

        <div className="panel">
          <h3>Visitors & Gate Logs</h3>

          <p>View visitor records and campus entry/exit information.</p>

          <button className="primary-button">View Gate Logs</button>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
