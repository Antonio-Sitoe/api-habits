import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import Logo from "../assets/logo.svg";
import colors from "tailwindcss/colors";

export default function Header() {
  return (
    <View className="w-full  flex-row items-center justify-between">
      <Logo fontSize={24} />
      <Link href="/new" asChild>
        <TouchableOpacity className="border flex-row h-11 px-4 border-violet-500 rounded-lg items-center">
          <Feather name="plus" size={20} color={colors["violet"]["500"]} />
          <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
