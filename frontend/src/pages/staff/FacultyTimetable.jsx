function FacultyTimetable() {
  const timetable = [
    {
      day: "Monday",
      classes: [
        {
          time: "8:15 AM - 9:10 AM",
          subject: "Computer Networks",
          className: "CSE-A • 5th Semester",
          room: "Room 302",
        },
        {
          time: "10:05 AM - 11:00 AM",
          subject: "Computer Networks",
          className: "CSE-B • 5th Semester",
          room: "Room 305",
        },
        {
          time: "11:30 AM - 1:20 PM",
          subject: "CN Lab",
          className: "CSE-A • 5th Semester",
          room: "Lab 2",
        },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        {
          time: "9:10 AM - 10:05 AM",
          subject: "Computer Networks",
          className: "CSE-A • 5th Semester",
          room: "Room 302",
        },
        {
          time: "11:30 AM - 1:20 PM",
          subject: "CN Lab",
          className: "CSE-B • 5th Semester",
          room: "Lab 2",
        },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        {
          time: "11:30 AM - 12:25 PM",
          subject: "Computer Networks",
          className: "CSE-A • 5th Semester",
          room: "Room 302",
        },
        {
          time: "2:15 PM - 3:10 PM",
          subject: "Mentoring",
          className: "CSE-A • 5th Semester",
          room: "Faculty Room",
        },
      ],
    },
    {
      day: "Thursday",
      classes: [
        {
          time: "8:15 AM - 11:00 AM",
          subject: "CN Lab",
          className: "CSE-A • 5th Semester",
          room: "Lab 2",
        },
        {
          time: "11:30 AM - 12:25 PM",
          subject: "Computer Networks",
          className: "CSE-B • 5th Semester",
          room: "Room 305",
        },
      ],
    },
    {
      day: "Friday",
      classes: [
        {
          time: "9:10 AM - 10:05 AM",
          subject: "Computer Networks",
          className: "CSE-A • 5th Semester",
          room: "Room 302",
        },
        {
          time: "11:30 AM - 1:20 PM",
          subject: "CN Lab",
          className: "CSE-B • 5th Semester",
          room: "Lab 2",
        },
      ],
    },
  ];

  return (
    <div className="timetable-page">
      <div className="panel timetable-header">
        <div>
          <h2>Faculty Timetable</h2>
          <p>Weekly teaching schedule</p>
        </div>

        <div className="semester-badge">Faculty Schedule</div>
      </div>

      <div className="timetable-days">
        {timetable.map((day) => (
          <div className="panel timetable-day" key={day.day}>
            <div className="timetable-day-title">
              <h2>{day.day}</h2>
              <span>{day.classes.length} Classes</span>
            </div>

            <div className="timetable-list">
              {day.classes.map((item, index) => (
                <div className="timetable-row" key={index}>
                  <div className="timetable-time">{item.time}</div>

                  <div className="timetable-subject">
                    <strong>{item.subject}</strong>
                    <span>
                      {item.className} • {item.room}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyTimetable;
