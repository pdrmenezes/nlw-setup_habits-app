import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export function EmptyHabitsList() {
  const { navigate } = useNavigation();
  return (
    <Text className="text-zinc-400 text-base">
      No habits for today.
      {"\n"}
      <Text className="text-violet-400 text-base underline active:text-violet-500" onPress={() => navigate("newHabit")}>
        How about adding one?
      </Text>
    </Text>
  );
}
