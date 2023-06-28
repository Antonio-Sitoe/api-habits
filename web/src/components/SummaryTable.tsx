import { useEffect, useMemo, useState } from "react";
import { generateRangeDaysFromYearsBegin } from "../utils/generateRangeDaysFromYearsBegin";
import { HabitDay } from "./HabitDay";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface SummaryData {
  amount: number;
  completed: number;
  date: string;
  id: string;
}

export function SummaryTable() {
  const summaryDates = useMemo(() => generateRangeDaysFromYearsBegin(), []);
  const minimunSumaryDaysSize = 18 * 7; //18 semanas
  const amountOfDaysTofill = minimunSumaryDaysSize - summaryDates.length;
  const [summaryData, setSummaryData] = useState<SummaryData[]>([]);

  useEffect(() => {
    async function fetchSummaryData() {
      const { data } = await api.get("/summary");
      console.log(data);
      setSummaryData(data);
    }
    fetchSummaryData();
  }, []);
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((item, i) => {
          return (
            <div
              key={item + i}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((habitDay, i) => {
          const dayInSummary = summaryData.find((day) => {
            return dayjs(habitDay).isSame(day.date, "day");
          });
          return (
            <HabitDay
              date={habitDay}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
              key={i}
            />
          );
        })}
        {amountOfDaysTofill > 0 &&
          Array.from({ length: amountOfDaysTofill }).map((_, i) => {
            return (
              <div
                key={i + Math.random()}
                className="w-10 h-10 border-2 bg-zinc-900 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            );
          })}
      </div>
    </div>
  );
}
