import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

export function NewHabitForm() {
  const [habitTitle, setHabitTitle] = useState("");
  const [habitWeekDays, setHabitWeekDays] = useState<number[]>([]);

  async function handleCreateNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!habitTitle || habitWeekDays.length === 0) {
      return;
    }
    await api.post("habits", {
      title: habitTitle,
      weekDays: habitWeekDays,
    });

    setHabitTitle("");
    setHabitWeekDays([]);
    alert("Hábito criado com sucesso");
  }

  function handleToggleWeekDay(weekDay: number) {
    if (habitWeekDays.includes(weekDay)) {
      const weekDaysWithoutRemovedDay = habitWeekDays.filter((day) => day !== weekDay);
      setHabitWeekDays(weekDaysWithoutRemovedDay);
    } else {
      const weekDaysWithAddedOne = [...habitWeekDays, weekDay];
      setHabitWeekDays(weekDaysWithAddedOne);
    }
  }

  return (
    <form onSubmit={handleCreateNewHabit} className="w-full flex flex-col mt-6 ">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="ex: Exercício, Sono, etc."
        className="p-4 rounded-lg mt-12 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        onChange={(event) => setHabitTitle(event.target.value)}
        value={habitTitle}
      />
      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>
      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className="flex items-center gap-3 focus:outline-none group"
              onCheckedChange={() => handleToggleWeekDay(index)}
              checked={habitWeekDays.includes(index)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900">
                <Checkbox.Indicator>
                  <Check size={20} color="white" />
                </Checkbox.Indicator>
              </div>
              <span className="text-white leading-tight">{weekDay}</span>
            </Checkbox.Root>
          );
        })}
      </div>
      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-800"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
