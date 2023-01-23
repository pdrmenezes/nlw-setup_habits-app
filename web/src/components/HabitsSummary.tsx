import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-dates-from-year-start";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateRangeDatesFromYearStart();

const MINIMUM_WEEKS = 18;
const DAYS_PER_WEEK = 7;
const minimumSummaryDatesSize = MINIMUM_WEEKS * DAYS_PER_WEEK;
const daysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  available: number;
  completed: number;
}[];

export function HabitsSummary() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("summary").then((response) => setSummary(response.data));
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, i) => {
          return (
            <div key={`${weekDay}-${i}`} className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center">
              {weekDay}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((day) => {
            const dayInSummary = summary.find((dates) => {
              return dayjs(day).isSame(dates.date, "day");
            });

            return (
              <HabitDay key={day.toString()} date={day} availableHabits={dayInSummary?.available} defaultCompletedHabits={dayInSummary?.completed} />
            );
          })}
        {daysToFill > 0 &&
          Array.from({ length: daysToFill }).map((_, i) => {
            return <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>;
          })}
      </div>
    </div>
  );
}
