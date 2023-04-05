import { useState, useEffect, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Text, ScrollView, Alert } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-dates-from-year-start";
import { api } from "../lib/axios";
import dayjs from "dayjs";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const datesFromYearStart = generateRangeDatesFromYearStart();
const MINIMUM_WEEKS = 18;
const minimumSummaryDatesSize = MINIMUM_WEEKS * 5;
const daysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

type SummaryProps = Array<{
  id: string;
  date: string;
  available: number;
  completed: number;
}>;

export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps | null>(null);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("summary");
      setSummary(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Oops - Fetch", "Error fetching habits data");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View className="flex-1 bg-background px-8 py-16">
        <Header />
        <View className="flex-row mt-6 mb-2">
          {weekDays.map((weekDay, i) => {
            return (
              <Text key={`${weekDay}-${i}`} className="text-zinc-400 text-xl font-space_bold text-center mx-1" style={{ width: DAY_SIZE }}>
                {weekDay}
              </Text>
            );
          })}
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {summary && (
            <View className="flex-row flex-wrap">
              {datesFromYearStart.map((date) => {
                const dayWithHabits = summary.find((day) => {
                  return dayjs(date).isSame(day.date, "day");
                });
                return (
                  <HabitDay
                    key={date.toISOString()}
                    date={date}
                    availableHabits={dayWithHabits?.available}
                    completedHabits={dayWithHabits?.completed}
                    onPress={() => navigate("habit", { date: date.toISOString() })}
                  />
                );
              })}
              {daysToFill > 0 &&
                Array.from({ length: daysToFill }).map((_, i) => {
                  return (
                    <View
                      key={i}
                      className="bg-zinc-900 rounded-lg border-2 border-zinc-800 m-1 opacity-40"
                      style={{ width: DAY_SIZE, height: DAY_SIZE }}
                    />
                  );
                })}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
