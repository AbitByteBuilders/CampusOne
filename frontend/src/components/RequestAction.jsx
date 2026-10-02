function RequestAction({ title, student, status }) {
  return (
    <div className="admin-request">
      <div className="request-info">
        <strong>{title}</strong>
        <p>{student}</p>
      </div>

      <span className={`status ${status.toLowerCase().replace(" ", "-")}`}>
        {status}
      </span>
    </div>
  );
}

export default RequestAction;
