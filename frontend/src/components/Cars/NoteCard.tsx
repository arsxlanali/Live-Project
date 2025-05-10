import { Badge } from "@/components/ui/badge"
import { CalendarDays, AlertCircle, Wrench } from "lucide-react"

export default function NotesCard() {
  const notes = [
    {
      date: "Monday, 6th April 2020",
      description: "Book for General Service",
      status: "COMPLETED",
      icon: <CalendarDays className="text-gray-500" />,
    },
    {
      date: "Thursday, 24th October 2021",
      description: "Vehicle LV 001 has been marked for recall.",
      tag: "14:07–21/11/2021",
      icon: <AlertCircle className="text-red-500" />,
    },
    {
      date: "Monday, 13th August 2018",
      description: "Maintenance Completed, Collect",
      tag: "14:07–21/11/2021",
      icon: <Wrench className="text-gray-500" />,
    },
  ]

  return (
    <>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Notes</h2>
      <div className="relative space-y-8">
        {notes.map((note, idx) => (
          <div key={idx} className="relative flex gap-4 items-start">
            {/* Vertical Line */}
            {idx !== notes.length - 1 && (
              <span className="absolute top-12 left-5  w-px h-full bg-gray-100" />
            )}

            {/* Icon */}
            <div className="bg-gray-100 p-2 rounded-full flex items-center justify-center">
              {note.icon}
            </div>

            {/* Content */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">{note.date}</p>
              <p className="text-sm text-gray-500">{note.description}</p>

              {note.status && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                  {note.status}
                </Badge>
              )}

              {note.tag && (
                <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mt-1 w-fit">
                  {note.tag}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
