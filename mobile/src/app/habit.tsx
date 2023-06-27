import { Link } from "expo-router";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Habit() {
  return (
    <View className="flex-1 bg-background text-white px-8 pt-16">
      <Link href="/" asChild>
        <TouchableOpacity className="border flex-row h-11 px-4 border-violet-500 rounded-lg items-center">
          <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
