import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { useState } from "react";
import colors from "tailwindcss/colors";
const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
export default function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToogleWeekday(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(weekDays.filter((weekday) => weekday !== weekDayIndex));
    } else {
      setWeekDays((preview) => {
        return [...preview, weekDayIndex];
      });
    }
  }
  return (
    <View className="flex-1 bg-background text-white px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Habito
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          Qual o seu compromentimento?
        </Text>
        <TextInput
          placeholderTextColor={colors.zinc["400"]}
          placeholder="Exercicios, Dormir bem"
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
        />
        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((weekDay, index) => {
          return (
            <CheckBox
              key={weekDay}
              title={weekDay}
              checked={weekDays.includes(index)}
              onPress={() => handleToogleWeekday(index)}
            />
          );
        })}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {}}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
