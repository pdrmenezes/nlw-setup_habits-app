import "./lib/dayjs";
import "./styles/global.css";
import { Header } from "./components/Header";
import { HabitsSummary } from "./components/HabitsSummary";

export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <HabitsSummary />
      </div>
    </div>
  );
}
