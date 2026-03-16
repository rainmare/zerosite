"use client";

type TimeSlotsProps = {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  bookedTimes: string[];
  date: string | null;
};

const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export function TimeSlots({
  selectedTime,
  onSelectTime,
  bookedTimes,
  date,
}: TimeSlotsProps) {
  if (!date) {
    return (
      <div className="bg-surface border border-border/50 rounded-xl p-6">
        <h3 className="font-heading text-lg mb-4">Select a Time</h3>
        <p className="text-text-dim text-sm">Please select a date first.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border/50 rounded-xl p-6">
      <h3 className="font-heading text-lg mb-4">Select a Time</h3>
      <div className="grid grid-cols-2 gap-2">
        {TIME_SLOTS.map((time) => {
          const isBooked = bookedTimes.includes(time);
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => !isBooked && onSelectTime(time)}
              disabled={isBooked}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? "bg-primary text-white"
                  : isBooked
                    ? "bg-surface-hover text-text-dim/40 cursor-not-allowed line-through"
                    : "border border-border hover:border-primary text-text-muted hover:text-text cursor-pointer"
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
