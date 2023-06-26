import { Text, View } from "react-native";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import Header from "../components/Header";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";
import { ScrollView } from "react-native-gesture-handler";

const datesFromYearStart = generateRangeDatesFromYearStart();

export default function Page() {
  return (
    <View className="flex-1 bg-background text-white px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((item, i) => {
          return (
            <Text
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              key={`${item}-${i}`}
              style={{ width: DAY_SIZE }}
            >
              {item}
            </Text>
          );
        })}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => {
            return <HabitDay key={`${String(date)}`} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}
