import { useThemeStore } from "@/state/ThemeStore";
import { TimePeriodSection } from "./TimePeriodSection";

type Props = {};

export function DashboardPageSettings({}: Props) {
  const { theme } = useThemeStore();

  return (
    <div
      className="absolute p-2 py-3 border rounded-lg shadow-md right-2 top-8 w-52"
      style={{
        backgroundColor: theme.mainBgColor,
        color: theme.mainTextColor,
        borderColor: theme.mainBorderColor,
      }}
    >
      <TimePeriodSection />
    </div>
  );
}
