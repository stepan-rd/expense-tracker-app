import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useGlobalStore } from "./state/GlobalStore";
import { AddEntryModal } from "./components/AddEntryModal/AddEntryModal";
import { useThemeStore } from "./state/ThemeStore";

function App() {
  const { theme } = useThemeStore();

  const { isAddEntryModalVisible } = useGlobalStore();

  return (
    <div
      className="flex min-h-screen overflow-x-auto transition-all duration-500 ease-out font-alexandria"
      style={{ backgroundColor: theme.mainBgColor }}
    >
      <Navbar />
      <Outlet />
      <AddEntryModal />
    </div>
  );
}

export default App;
