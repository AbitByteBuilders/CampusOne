function Timetable() {
  const timetable = [
    {
      day: "Monday",
      classes: [
        {
          time: "8:15 AM - 9:10 AM",
          subject: "Computer Networks",
          code: "CN",
          faculty: "SNM",
        },
        {
          time: "9:10 AM - 10:05 AM",
          subject: "Operating Systems",
          code: "OS",
          faculty: "SRD",
        },
        {
          time: "10:05 AM - 11:00 AM",
          subject: "Theory of Computation",
          code: "TOC",
          faculty: "CR",
        },
        {
          time: "11:30 AM - 12:25 PM",
          subject: "Artificial Intelligence & Machine Learning",
          code: "AI&ML",
          faculty: "HKS",
        },
        {
          time: "12:25 PM - 1:20 PM",
          subject: "Environmental Engineering",
          code: "EV",
          faculty: "JRD",
        },
        {
          time: "1:20 PM - 2:15 PM",
          subject: "DIRC",
          code: "DIRC",
          faculty: "SP",
        },
      ],
    },

    {
      day: "Tuesday",
      classes: [
        {
          time: "8:15 AM - 9:10 AM",
          subject: "Operating Systems",
          code: "OS",
          faculty: "SRD",
        },
        {
          time: "9:10 AM - 10:05 AM",
          subject: "PPT",
          code: "PPT",
          faculty: "ET",
        },
        {
          time: "10:05 AM - 11:00 AM",
          subject: "Artificial Intelligence & Machine Learning",
          code: "AI&ML",
          faculty: "HKS",
        },
        {
          time: "11:30 AM - 1:20 PM",
          subject: "Seminar on SIRE-I G-II / OS Lab G-I",
          code: "SEMINAR / LAB",
          faculty: "HKS / SRD",
        },
        {
          time: "1:20 PM - 2:15 PM",
          subject: "Professional Ethics",
          code: "PE",
          faculty: "AM",
        },
      ],
    },

    {
      day: "Wednesday",
      classes: [
        {
          time: "8:15 AM - 9:10 AM",
          subject: "Artificial Intelligence & Machine Learning",
          code: "AI&ML",
          faculty: "HKS",
        },
        {
          time: "9:10 AM - 10:05 AM",
          subject: "Theory of Computation",
          code: "TOC",
          faculty: "CR",
        },
        {
          time: "10:05 AM - 11:00 AM",
          subject: "PPT",
          code: "PPT",
          faculty: "ET",
        },
        {
          time: "11:30 AM - 12:25 PM",
          subject: "Computer Networks",
          code: "CN",
          faculty: "SNM",
        },
        {
          time: "12:25 PM - 1:20 PM",
          subject: "Professional Ethics",
          code: "PE",
          faculty: "AM",
        },
        {
          time: "1:20 PM - 2:15 PM",
          subject: "Environmental Engineering",
          code: "EV",
          faculty: "JRD",
        },
      ],
    },

    {
      day: "Thursday",
      classes: [
        {
          time: "8:15 AM - 11:00 AM",
          subject: "CN Lab G-II / TOC Lab G-I",
          code: "LAB",
          faculty: "SNM / CR",
        },
        {
          time: "11:30 AM - 12:25 PM",
          subject: "Operating Systems",
          code: "OS",
          faculty: "SRD",
        },
        {
          time: "12:25 PM - 1:20 PM",
          subject: "Theory of Computation",
          code: "TOC",
          faculty: "CR",
        },
        {
          time: "1:20 PM - 2:15 PM",
          subject: "Professional Ethics",
          code: "PE",
          faculty: "AM",
        },
      ],
    },

    {
      day: "Friday",
      classes: [
        {
          time: "8:15 AM - 9:10 AM",
          subject: "Professional Ethics",
          code: "PE",
          faculty: "AM",
        },
        {
          time: "9:10 AM - 10:05 AM",
          subject: "CAR",
          code: "CAR",
          faculty: "RSB",
        },
        {
          time: "10:05 AM - 11:00 AM",
          subject: "CAR",
          code: "CAR",
          faculty: "RSB",
        },
        {
          time: "11:30 AM - 1:20 PM",
          subject: "TOC Lab G-II / SIRE-I G-I",
          code: "LAB",
          faculty: "CR / HKS",
        },
      ],
    },

    {
      day: "Saturday",
      classes: [
        {
          time: "8:15 AM - 9:10 AM",
          subject: "Environmental Engineering",
          code: "EV",
          faculty: "JRD",
        },
        {
          time: "9:10 AM - 10:05 AM",
          subject: "Computer Networks",
          code: "CN",
          faculty: "SNM",
        },
        {
          time: "10:05 AM - 11:00 AM",
          subject: "Library",
          code: "LIBRARY",
          faculty: "SPS",
        },
        {
          time: "11:30 AM - 1:20 PM",
          subject: "OS Lab G-II / CN Lab G-I",
          code: "LAB",
          faculty: "SRD / SNM",
        },
      ],
    },
  ];

  return (
    <div className="timetable-page">
      <div className="panel timetable-header">
        <div>
          <h2>5th Semester Timetable</h2>
          <p>CSE-A • B.Tech</p>
        </div>

        <div className="semester-badge">5th Semester</div>
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
                      {item.code} • Faculty: {item.faculty}
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

export default Timetable;
