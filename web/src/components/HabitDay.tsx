import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";
import dayjs from "dayjs";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { HabitsList } from "./HabitsList";
import { useState } from "react";

interface HabitDayProps {
  date: Date;
  defaultCompletedHabits?: number;
  availableHabits?: number;
}

export function HabitDay({ date, defaultCompletedHabits = 0, availableHabits = 0 }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompletedHabits);

  const progressPercentage = availableHabits > 0 ? generateProgressPercentage(availableHabits, completed) : 0;

  const dayAndMoth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  const today = dayjs().startOf("day").toDate();
  const isToday = dayjs(date).isSame(today);

  function handleChangeInCompletedHabits(completedHabits: number) {
    setCompleted(completedHabits);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-nlw_background",
          {
            "bg-zinc-900 border-zinc-800": progressPercentage === 0,
            "bg-violet-900 border-violet-700": progressPercentage > 0 && progressPercentage < 20,
            "bg-violet-800 border-violet-600": progressPercentage >= 20 && progressPercentage < 40,
            "bg-violet-700 border-violet-500": progressPercentage >= 40 && progressPercentage < 60,
            "bg-violet-600 border-violet-500": progressPercentage >= 60 && progressPercentage < 80,
            "bg-violet-500 border-violet-400": progressPercentage >= 80,
            "border-white border-3": isToday,
          }
        )}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col ">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMoth}</span>
          <ProgressBar progress={progressPercentage} />
          <HabitsList date={date} onChangeInCompletedHabits={handleChangeInCompletedHabits} />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
