import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function NewHabit() {
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
  const [habitTitle, setHabitTitle] = useState("");

  function handleToggleSelectedWeekDays(weekDayIndex: number) {
    if (selectedWeekDays.includes(weekDayIndex)) {
      setSelectedWeekDays((prevState) => prevState.filter((weekDay) => weekDay !== weekDayIndex));
    } else {
      setSelectedWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!habitTitle.trim() || selectedWeekDays.length === 0) {
        return Alert.alert("New habit", "Input your new habit and add its periodicity.");
      }
      await api.post("habits", { title: habitTitle, weekDays: selectedWeekDays });

      setHabitTitle("");
      setSelectedWeekDays([]);
      Alert.alert("New habit", "Habit successfully created.");
    } catch (error) {
      console.log("Error creating new habit", error);
      console.log(habitTitle, selectedWeekDays);
      Alert.alert("New habit", "Error creating new habit");
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <BackButton />
        <Text className="mt-6 text-white font-space_bold text-3xl">Create habit</Text>
        <Text className="mt-6 text-white font-space_semibold text-base">What will your new habit be?</Text>
        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="Exercise, sleep, etc."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setHabitTitle}
          value={habitTitle}
        />
        <Text className="mt-4 mb-3 text-white font-space_semibold text-base">When?</Text>
        {weekDays.map((weekDay, index) => (
          <Checkbox key={weekDay} title={weekDay} checked={selectedWeekDays.includes(index)} onPress={() => handleToggleSelectedWeekDays(index)} />
        ))}
        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-space_semibold text-base text-white ml-2">Add Habit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
