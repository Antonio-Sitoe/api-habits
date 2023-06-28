import { Check } from "phosphor-react";
import * as CheckBox from "@radix-ui/react-checkbox";
import React, { FormEvent } from "react";

const availableWeekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terca-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sabado",
];

function NewHabitForm() {
  const [title, setTitle] = React.useState("");
  const [weekDays, setWeekDays] = React.useState<number[]>([]);
  function createNewHabit(event: FormEvent) {
    event.preventDefault();
    console.log(title);
    console.log(weekDays);
  }

  function handleCheckedWeekDay(weekIndex: number) {
    if (weekDays.includes(weekIndex)) {
      const weekddaysWithRemovedOne = weekDays.filter(
        (day) => day !== weekIndex
      );
      setWeekDays(weekddaysWithRemovedOne);
    } else {
      setWeekDays([...weekDays, weekIndex]);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label className="font-semibold leading-tight" htmlFor="title">
        Qual e o seu comprementimento
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex: exercicios, dormir bem"
        autoFocus
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
      />
      <label htmlFor="title" className="font-semibold leading-tight mt-4">
        Qual e a recorrencia
      </label>

      <div className="mt-6 flex flex-col gap-3">
        {availableWeekDays.map((check, index) => {
          return (
            <CheckBox.Root
              key={check}
              onCheckedChange={() => handleCheckedWeekDay(index)}
              className="flex items-center gap-3 group"
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <CheckBox.Indicator>
                  <Check size={20} className="text-white" />
                </CheckBox.Indicator>
              </div>
              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                {check}
              </span>
            </CheckBox.Root>
          );
        })}
      </div>

      <button className="flex items-center mt-6 rounded-lg p-4 gap-3 font-semibold bg-green-600 justify-center hover:bg-green-500">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}

export default NewHabitForm;
