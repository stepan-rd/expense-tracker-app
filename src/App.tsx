import { Outlet, useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "./state/FirebaseAuth";
import { Navbar } from "./components/Navbar";
import { Button } from "./components/Button";
import { useGlobalStore } from "./state/GlobalStore";
import { AddEntryModal } from "./components/AddEntryModal/AddEntryModal";

function App() {
  const navigate = useNavigate();

  const { currUser, loading, logoutUser } = useFirebaseAuth();

  const { isAddEntryModalVisible } = useGlobalStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="flex min-h-screen font-alexandria">
      <Navbar />
      <Outlet />
      <Button
        className="absolute bottom-0 left-0 z-50 h-10"
        onClick={handleLogout}
      >
        /temp/ Logout
      </Button>
      
      {isAddEntryModalVisible && <AddEntryModal />}
    </div>
  );
}

export default App;
