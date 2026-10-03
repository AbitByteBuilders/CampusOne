function Fees() {
  const feeDetails = [
    {
      title: "Tuition Fee",
      amount: "₹45,000",
      status: "Paid",
    },
    {
      title: "Hostel Fee",
      amount: "₹25,000",
      status: "Paid",
    },
    {
      title: "Examination Fee",
      amount: "₹2,500",
      status: "Pending",
    },
    {
      title: "Library & Other Fees",
      amount: "₹5,000",
      status: "Paid",
    },
  ];

  return (
    <div className="fees-page">
      <div className="panel fees-summary">
        <div>
          <h2>Semester Fees</h2>
          <p>5th Semester • B.Tech CSE</p>
        </div>

        <div className="fees-total">
          <span>Total Fees</span>
          <strong>₹77,500</strong>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Fee Details</h2>
            <p>View your semester fee breakdown</p>
          </div>
        </div>

        <div className="fee-list">
          {feeDetails.map((fee) => (
            <div className="fee-item" key={fee.title}>
              <div className="fee-icon">💳</div>

              <div className="fee-info">
                <strong>{fee.title}</strong>
                <span>Semester fee</span>
              </div>

              <strong className="fee-amount">{fee.amount}</strong>

              <span className={`status ${fee.status.toLowerCase()}`}>
                {fee.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Fees;
