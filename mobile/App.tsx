import "./src/lib/dayjs";
import { StatusBar } from "react-native";
import {
  useFonts,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import * as Notififications from "expo-notifications";

Notififications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  async function scheduleNotification() {
    const trigger = new Date(Date.now());
    trigger.setMinutes(trigger.getMinutes() + 1);
    await Notififications.scheduleNotificationAsync({
      content: {
        title: "Olá, beloved 💝",
        body: "Praticou seus hábitos hoje?",
      },
      trigger,
    });
  }

  async function getScheduledNotification() {
    const schedules = await Notififications.getAllScheduledNotificationsAsync();
    console.log(schedules);
  }

  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  );
}
