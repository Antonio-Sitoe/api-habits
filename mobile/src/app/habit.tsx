import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { useState } from "react";
import clsx from "clsx";

interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[];
}

export default function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>();
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const { date } = useLocalSearchParams();

  const parsedDate = dayjs(String(date));
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");
  const isDateInPast = parsedDate.endOf("day").isBefore(new Date());

  function handleToggleHabit(habitId: string) {}
  return (
    <View className="flex-1 bg-background text-white px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={75} />
        <View
          className={clsx("mt-6", {
            ["opacity-50"]: isDateInPast,
          })}
        >
          {
            dayInfo?.possibleHabits.length > 0
              ? dayInfo?.possibleHabits.map((habit) => (
                  <CheckBox
                    key={habit.id}
                    title={habit.title}
                    disabled={isDateInPast}
                    onPress={() => handleToggleHabit(habit.id)}
                    checked={completedHabits.includes(habit.id)}
                  />
                ))
              : null
            // <HabitsEmpty />
          }
        </View>

        {dayInfo?.possibleHabits.length > 0 && isDateInPast && (
          <Text className="text-white mt-10 text-center">
            Você não pode editar hábitos de uma data passada.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
