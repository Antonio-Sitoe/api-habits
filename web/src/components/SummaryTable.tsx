import { useMemo } from "react";
import { generateRangeDaysFromYearsBegin } from "../utils/generateRangeDaysFromYearsBegin";
import { HabitDay } from "./HabitDay";

export function SummaryTable() {
  const summaryDates = useMemo(() => generateRangeDaysFromYearsBegin(), []);
  const minimunSumaryDaysSize = 18 * 7; //18 semanas
  const amountOfDaysTofill = minimunSumaryDaysSize - summaryDates.length;
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((item) => {
          return (
            <div
              key={item}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((habitDay, i) => {
          return <HabitDay key={habitDay.toString()} />;
        })}
        {amountOfDaysTofill > 0 &&
          Array.from({ length: amountOfDaysTofill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 border-2 bg-zinc-900 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            );
          })}
      </div>
    </div>
  );
}
