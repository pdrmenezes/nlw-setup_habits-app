import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

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
        return Alert.alert("Novo hábito", "Informe o nome do hábito e escolha a recorrência.");
      }
      await api.post("habits", { title: habitTitle, weekDays: selectedWeekDays });

      setHabitTitle("");
      setSelectedWeekDays([]);
      Alert.alert("Novo hábito", "Hábito criado com sucesso.");
    } catch (error) {
      console.log("Erro ao criar novo hábito", error);
      console.log(habitTitle, selectedWeekDays);
      Alert.alert("Novo hábito", "Erro ao criar novo hábito");
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <BackButton />
        <Text className="mt-6 text-white font-space_bold text-3xl">Criar hábito</Text>
        <Text className="mt-6 text-white font-space_semibold text-base">Qual seu comprometimento?</Text>
        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="Exercícios, dormir bem, etc...."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setHabitTitle}
          value={habitTitle}
        />
        <Text className="mt-4 mb-3 text-white font-space_semibold text-base">Qual a recorrência?</Text>
        {weekDays.map((weekDay, index) => (
          <Checkbox key={weekDay} title={weekDay} checked={selectedWeekDays.includes(index)} onPress={() => handleToggleSelectedWeekDays(index)} />
        ))}
        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-space_semibold text-base text-white ml-2">Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
