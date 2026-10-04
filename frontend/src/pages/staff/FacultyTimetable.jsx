import { useEffect, useState } from "react";

function FacultyTimetable() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
    <div className="timetable-page">
      {/* HEADER */}
      <div className="panel timetable-header">
        <div>
          <h2>Faculty Timetable</h2>
          <p>Weekly teaching schedule</p>
        </div>

        <div className="semester-badge">Faculty Schedule</div>
      </div>

      {/* DAYS */}
      <div className="timetable-days">
        {days.map((day) => {
          const dayClasses = timetable.filter((item) => item.day === day);

          return (
            <div className="panel timetable-day" key={day}>
              <div className="timetable-day-title">
                <h2>{day}</h2>

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
                  dayClasses.map((item) => (
                    <div className="timetable-row" key={item.id}>
                      {/* TIME */}
                      <div className="timetable-time">{item.time}</div>

                      {/* SUBJECT */}
                      <div className="timetable-subject">
                        <strong>{item.subject}</strong>

                        <span>
                          {item.type} • {item.room}
                        </span>

                        <span>{item.professor}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FacultyTimetable;
