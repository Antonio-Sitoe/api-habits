import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import colors from "tailwindcss/colors";
export function BackButton() {
  const { back } = useRouter();
  return (
    <TouchableOpacity onPress={back} activeOpacity={0.7}>
      <Feather name="arrow-left" size={32} color={colors["zinc"]["400"]} />
    </TouchableOpacity>
  );
}
