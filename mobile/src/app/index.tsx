import { Alert, Button, Text, View } from "react-native";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import Header from "../components/Header";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/axios";
import axios from "axios";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const datesFromYearStart = useMemo(
    () => generateRangeDatesFromYearStart(),
    []
  );

  async function fecthData() {
    // try {
    //   setLoading(true);
    const { data } = await api.get("/cars");

    console.log(data);
    setData(data);
    // } catch (error) {
    //   Alert.alert("Erro", "Nao foi possivel");
    //   console.log(JSON.stringify(error?.message));
    // } finally {
    //   setLoading(false);
    // }
  }
  useEffect(() => {
    fecthData();
  }, []);

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
        <Button title="Send" onPress={fecthData} />
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => {
            return (
              <HabitDay
                href={{
                  pathname: "/habit",
                  params: { date: date.toISOString() },
                }}
                key={`${String(date)}`}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
