import React from "react";
import {
  Text,
  View,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function CheckBox({ title, checked = false, ...props }: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...props}
    >
      {checked ? (
        <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
          <Feather name="check" size={20} color={colors["white"]} />
        </View>
      ) : (
        <View className="h-8 w-8 bg-zinc-700 rounded-lg items-center justify-center" />
      )}
      <Text className="ml-3 text-white text-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
