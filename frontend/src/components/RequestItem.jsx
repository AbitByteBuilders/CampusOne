function RequestItem({ title, date, status }) {
  return (
    <div className="request">
      <div className="request-icon">📄</div>

      <div className="request-info">
        <strong>{title}</strong>
        <span>{date}</span>
      </div>

      <span className={`status ${status.toLowerCase().replace(" ", "-")}`}>
        {status}
      </span>
    </div>
  );
}

export default RequestItem;
