import Calendar from "@/components/Calender"

const sampleUserData = [
  { date: '2025-07-22', name: 'Alice' },
  { date: '2025-07-24', name: 'Bob' },
  { date: '2025-07-29', name: 'Charlie' },
]

export default function CalendarPage() {
  return (
    <main className="p-0">
      <Calendar userData={sampleUserData} />
    </main>
  )
}
