function NoticeItem({ title, date }) {
  return (
    <div className="notice">
      <div className="notice-icon">📢</div>

      <div>
        <strong>{title}</strong>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default NoticeItem;
