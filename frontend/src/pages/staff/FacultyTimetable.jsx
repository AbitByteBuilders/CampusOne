import { useEffect, useMemo, useState } from "react";

function FacultyTimetable() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [qrToken, setQrToken] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(10);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/timetable")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch timetable");
        }

        return response.json();
      })
      .then((data) => {
        setTimetable(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load timetable from server.");
        setLoading(false);
      });
  }, []);

  const generateToken = () => {
    const randomPart = Math.random().toString(36).substring(2, 12);

    const timePart = Date.now();

    return `CAMPUSONE-${timePart}-${randomPart}`;
  };

  const openQrModal = (classItem) => {
    setSelectedClass(classItem);
    setQrToken(generateToken());
    setSecondsLeft(10);
    setShowQrModal(true);
  };

  const closeQrModal = () => {
    setShowQrModal(false);
    setSelectedClass(null);
    setQrToken("");
    setSecondsLeft(10);
  };

  useEffect(() => {
    if (!showQrModal || !selectedClass) {
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          setQrToken(generateToken());
          return 10;
        }

        return currentSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showQrModal, selectedClass]);

  const todayName = useMemo(() => {
    const today = new Date();

    return today.toLocaleDateString("en-US", {
      weekday: "long",
    });
  }, []);

  const parseClassTime = (timeString) => {
    if (!timeString) {
      return null;
    }

    const match = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);

    if (!match) {
      return null;
    }

    let hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (period === "PM" && hour !== 12) {
      hour += 12;
    }

    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return {
      hour,
      minute,
    };
  };

  const isClassCurrentlyRunning = (classItem) => {
    if (classItem.day !== todayName) {
      return false;
    }

    const parsedTime = parseClassTime(classItem.time);

    if (!parsedTime) {
      return false;
    }

    const now = new Date();

    const classStart = new Date();
    classStart.setHours(parsedTime.hour, parsedTime.minute, 0, 0);

    const classEnd = new Date(classStart);
    classEnd.setMinutes(classEnd.getMinutes() + 60);

    return now >= classStart && now < classEnd;
  };

  const getQrUrl = () => {
    if (!qrToken || !selectedClass) {
      return "";
    }

    const attendanceData = JSON.stringify({
      token: qrToken,
      subject: selectedClass.subject,
      classId: selectedClass.id,
      day: selectedClass.day,
      time: selectedClass.time,
    });

    return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
      attendanceData,
    )}`;
  };

  if (loading) {
    return (
      <div className="panel">
        <h2>Faculty Timetable</h2>
        <p>Loading timetable...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel">
        <h2>Faculty Timetable</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="timetable-page">
        <div className="panel timetable-header">
          <div>
            <h2>Faculty Timetable</h2>
            <p>Weekly teaching schedule and attendance management</p>
          </div>

          <div className="semester-badge">Faculty Schedule</div>
        </div>

        <div className="current-class-banner">
          <div className="current-class-icon">📡</div>

          <div>
            <strong>{todayName}</strong>

            <p>
              Classes currently in progress can generate an attendance QR code.
            </p>
          </div>
        </div>

        <div className="timetable-days">
          {days.map((day) => {
            const dayClasses = timetable.filter((item) => item.day === day);

            return (
              <div className="panel timetable-day" key={day}>
                <div className="timetable-day-title">
                  <div>
                    <h2>{day}</h2>

                    {day === todayName && (
                      <span className="today-label">Today</span>
                    )}
                  </div>

                  <span>
                    {dayClasses.length}{" "}
                    {dayClasses.length === 1 ? "Class" : "Classes"}
                  </span>
                </div>

                <div className="timetable-list">
                  {dayClasses.length === 0 ? (
                    <div className="timetable-row">
                      <div className="timetable-subject">
                        <span>No classes scheduled</span>
                      </div>
                    </div>
                  ) : (
                    dayClasses.map((item) => {
                      const classRunning = isClassCurrentlyRunning(item);

                      return (
                        <div
                          className={`timetable-row ${
                            classRunning ? "class-running" : ""
                          }`}
                          key={item.id}
                        >
                          <div className="timetable-time">
                            {item.time}

                            {classRunning && (
                              <span className="live-class-badge">LIVE</span>
                            )}
                          </div>

                          <div className="timetable-subject">
                            <strong>{item.subject}</strong>

                            <span>
                              {item.type} • {item.room}
                            </span>

                            <span>{item.professor}</span>

                            {classRunning && (
                              <button
                                className="generate-qr-button"
                                type="button"
                                onClick={() => openQrModal(item)}
                              >
                                ▣ Generate QR for Attendance
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showQrModal && selectedClass && (
        <div className="qr-modal-overlay" onClick={closeQrModal}>
          <div
            className="qr-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="qr-modal-header">
              <div>
                <span className="qr-live-label">● LIVE ATTENDANCE</span>

                <h2>{selectedClass.subject}</h2>

                <p>
                  {selectedClass.day} • {selectedClass.time} •{" "}
                  {selectedClass.room}
                </p>
              </div>

              <button
                className="qr-close-button"
                type="button"
                onClick={closeQrModal}
              >
                ×
              </button>
            </div>

            <div className="qr-content">
              <div className="qr-instruction">
                Ask students to scan this QR code using the CampusOne attendance
                scanner.
              </div>

              <div className="qr-code-container">
                <img
                  src={getQrUrl()}
                  alt="Attendance QR Code"
                  className="attendance-qr"
                />
              </div>

              <div className="qr-timer">
                <div className="qr-timer-circle">{secondsLeft}</div>

                <div>
                  <strong>QR changes in {secondsLeft} seconds</strong>

                  <p>The previous QR will expire automatically.</p>
                </div>
              </div>

              <div className="qr-security-note">
                🔐 Each QR code is temporary and changes every 10 seconds.
              </div>

              <div className="qr-class-info">
                <div>
                  <span>Subject</span>
                  <strong>{selectedClass.subject}</strong>
                </div>

                <div>
                  <span>Room</span>
                  <strong>{selectedClass.room}</strong>
                </div>

                <div>
                  <span>Time</span>
                  <strong>{selectedClass.time}</strong>
                </div>
              </div>
            </div>

            <div className="qr-modal-footer">
              <button
                className="qr-close-main-button"
                type="button"
                onClick={closeQrModal}
              >
                Close QR
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FacultyTimetable;
