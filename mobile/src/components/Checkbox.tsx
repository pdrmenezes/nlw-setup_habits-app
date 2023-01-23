import { TouchableOpacity, TouchableOpacityProps, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, { RotateInUpLeft, RotateOutDownLeft } from "react-native-reanimated";

interface CheckboxProps extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}

export function Checkbox({ title, checked = false, ...props }: CheckboxProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} className="flex-row mb-2 items-center" {...props}>
      {checked ? (
        <Animated.View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center" entering={RotateInUpLeft} exiting={RotateOutDownLeft}>
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      )}
      <Text className="text-white font-space_semibold text-base ml-3">{title}</Text>
    </TouchableOpacity>
  );
}
