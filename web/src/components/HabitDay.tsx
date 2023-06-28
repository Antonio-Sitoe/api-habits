import * as PoppOver from "@radix-ui/react-popover";
import * as CheckBox from "@radix-ui/react-checkbox";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";
import { Check } from "phosphor-react";

interface HabitDayProps {
  completed?: number;
  amount?: number;
  date: Date;
}

export function HabitDay({ amount = 0, completed = 0 }: HabitDayProps) {
  const completePercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;
  return (
    <PoppOver.Root>
      <PoppOver.Trigger
        className={clsx("w-10 h-10 border-2 rounded-lg", {
          "bg-zinc-900 border-zinc-800": completePercentage === 0,
          "bg-violet-900 border-violet-700":
            completePercentage > 0 && completePercentage < 20,
          "bg-violet-800 border-violet-600":
            completePercentage >= 20 && completePercentage < 40,
          "bg-violet-700 border-violet-500":
            completePercentage >= 40 && completePercentage < 60,
          "bg-violet-600 border-violet-500":
            completePercentage >= 60 && completePercentage < 80,
          "bg-violet-500 border-violet-400": completePercentage >= 80,
        })}
      />

      <PoppOver.Portal>
        <PoppOver.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">Segunda-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            16/01
          </span>

          <ProgressBar progress={45} />

          <div className="mt-6 flex flex-col gap-3">
            <CheckBox.Root className="flex items-center gap-3 group:">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <CheckBox.Indicator>
                  <Check size={20} className="text-white" />
                </CheckBox.Indicator>
              </div>
              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Beber 2 Litros de Agua
              </span>
            </CheckBox.Root>
          </div>
          <PoppOver.Arrow height={8} width={16} className="fill-zinc-900" />
        </PoppOver.Content>
      </PoppOver.Portal>
    </PoppOver.Root>
  );
}
