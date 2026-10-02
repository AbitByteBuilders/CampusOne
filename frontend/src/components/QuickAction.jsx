function QuickAction({ icon, title }) {
  return (
    <div className="quick-card">
      <div className="quick-icon">{icon}</div>
      <span>{title}</span>
    </div>
  );
}

export default QuickAction;
