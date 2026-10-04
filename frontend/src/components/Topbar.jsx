import { useEffect, useState } from "react";

function Topbar({ onLogout }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New assignment posted",
      message: "A new Computer Networks assignment has been added.",
      createdAt: Date.now() - 3 * 60 * 60 * 1000,
      read: false,
    },
    {
      id: 2,
      title: "Attendance reminder",
      message: "Your attendance in Operating System is below 75%.",
      createdAt: Date.now() - 15 * 60 * 60 * 1000,
      read: false,
    },
    {
      id: 3,
      title: "Fee payment reminder",
      message: "Please check your fee payment status.",
      createdAt: Date.now() - 30 * 60 * 60 * 1000,
      read: false,
    },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const getAgeInHours = (createdAt) => {
    return (Date.now() - createdAt) / (1000 * 60 * 60);
  };

  const getNotificationStatus = (createdAt) => {
    const age = getAgeInHours(createdAt);

    if (age < 12) {
      return {
        className: "notification-green",
        label: "New",
      };
    }

    if (age < 24) {
      return {
        className: "notification-yellow",
        label: "Recent",
      };
    }

    return {
      className: "notification-red",
      label: "Old",
    };
  };

  const getTimeText = (createdAt) => {
    const age = getAgeInHours(createdAt);

    if (age < 1) {
      const minutes = Math.max(1, Math.floor(age * 60));
      return `${minutes} min ago`;
    }

    if (age < 24) {
      return `${Math.floor(age)} hr ago`;
    }

    const days = Math.floor(age / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const markAsRead = (id) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  return (
    <header className="topbar">
      <div className="mobile-brand">CampusOne</div>

      <div className="search-box">
        🔍
        <input placeholder="Search anything..." />
      </div>

      <div className="top-actions">
        <div className="notification-wrapper">
          <button
            className="icon-button notification-button"
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
            {unreadCount > 0 && (
              <span className="notification-count">{unreadCount}</span>
            )}
            <span className="notification-dot notification-green"></span>
          </button>

          {showNotifications && (
            <div className="notification-panel">
              <div className="notification-header">
                <div>
                  <h3>Notifications</h3>
                  <p>
                    {unreadCount} unread notification
                    {unreadCount !== 1 ? "s" : ""}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    className="mark-all-button"
                    type="button"
                    onClick={markAllAsRead}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="no-notifications">
                    <span>🔕</span>
                    <strong>No notifications</strong>
                    <p>You are all caught up.</p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const status = getNotificationStatus(
                      notification.createdAt,
                    );

                    return (
                      <button
                        className={`notification-item ${
                          notification.read ? "notification-read" : ""
                        }`}
                        key={notification.id}
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div
                          className={`notification-status-dot ${status.className}`}
                        ></div>

                        <div className="notification-content">
                          <div className="notification-title-row">
                            <strong>{notification.title}</strong>

                            {!notification.read && (
                              <span className="unread-label">Unread</span>
                            )}
                          </div>

                          <p>{notification.message}</p>

                          <div className="notification-meta">
                            <span>{getTimeText(notification.createdAt)}</span>

                            <span
                              className={`notification-age-label ${status.className}`}
                            >
                              {status.label}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        <button className="logout-button" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;
