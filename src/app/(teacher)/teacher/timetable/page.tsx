"use client";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const periods = ["08:00-08:45", "08:45-09:30", "09:30-10:00", "10:00-10:45", "10:45-11:30", "11:30-12:00", "12:00-12:45", "12:45-01:30"];
const periodLabels = ["Period 1", "Period 2", "Break", "Period 3", "Period 4", "Lunch", "Period 5", "Period 6"];

type ScheduleEntry = { subject: string; class: string; room: string } | null;

const schedule: Record<string, (ScheduleEntry)[]> = {
  Monday: [
    { subject: "Mathematics", class: "10-A", room: "201" },
    { subject: "Mathematics", class: "9-B", room: "105" },
    null,
    { subject: "Physics", class: "11-A", room: "Lab 3" },
    { subject: "Mathematics", class: "8-C", room: "302" },
    null,
    null,
    null,
  ],
  Tuesday: [
    null,
    { subject: "Mathematics", class: "9-B", room: "105" },
    null,
    { subject: "Physics", class: "11-A", room: "Lab 3" },
    null,
    null,
    { subject: "Physics", class: "12-A", room: "Lab 3" },
    { subject: "Mathematics", class: "10-A", room: "201" },
  ],
  Wednesday: [
    { subject: "Mathematics", class: "10-A", room: "201" },
    null,
    null,
    { subject: "Physics", class: "11-A", room: "Lab 3" },
    { subject: "Mathematics", class: "8-C", room: "302" },
    null,
    null,
    { subject: "Mathematics", class: "9-B", room: "105" },
  ],
  Thursday: [
    null,
    { subject: "Mathematics", class: "9-B", room: "105" },
    null,
    null,
    { subject: "Mathematics", class: "8-C", room: "302" },
    null,
    { subject: "Physics", class: "12-A", room: "Lab 3" },
    { subject: "Mathematics", class: "10-A", room: "201" },
  ],
  Friday: [
    { subject: "Mathematics", class: "10-A", room: "201" },
    null,
    null,
    { subject: "Physics", class: "11-A", room: "Lab 3" },
    null,
    null,
    { subject: "Mathematics", class: "8-C", room: "302" },
    { subject: "Physics", class: "12-A", room: "Lab 3" },
  ],
  Saturday: [
    { subject: "Mathematics", class: "10-A", room: "201" },
    { subject: "Mathematics", class: "9-B", room: "105" },
    null,
    null,
    null,
    null,
    null,
    null,
  ],
};

export default function TeacherTimetablePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Timetable</h1>
        <p className="text-sm text-gray-500">Your weekly teaching schedule</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-3 py-3 text-xs font-medium text-gray-500 w-24">Day</th>
              {periods.map((p, i) => (
                <th key={p} className="text-center px-2 py-3 text-xs font-medium text-gray-500">
                  <div>{periodLabels[i]}</div>
                  <div className="text-gray-400 font-normal">{p}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day} className="border-b border-gray-50 last:border-0">
                <td className="px-3 py-3 text-sm font-medium text-gray-900">{day}</td>
                {schedule[day].map((entry, i) => (
                  <td key={i} className="px-2 py-2 text-center">
                    {periodLabels[i] === "Break" || periodLabels[i] === "Lunch" ? (
                      <div className="bg-gray-50 rounded-lg py-3 text-xs text-gray-400">{periodLabels[i]}</div>
                    ) : entry ? (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2">
                        <div className="text-xs font-medium text-emerald-700">{entry.subject}</div>
                        <div className="text-xs text-emerald-600">{entry.class}</div>
                        <div className="text-xs text-gray-400">{entry.room}</div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-300 py-3">Free</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
