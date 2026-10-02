function StatCard({ icon, title, value, extra }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <span>{title}</span>
        <h2>{value}</h2>
        <small>{extra}</small>
      </div>
    </div>
  );
}

export default StatCard;
