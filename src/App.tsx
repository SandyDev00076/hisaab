import { useNavigate } from "react-router-dom";
import Login from "./components/Login"
import pb from "./lib/pocketbase";
import { PrimaryButton } from "./style/shared";

function App() {

  const navigate = useNavigate();

  function logout() {
    pb.authStore.clear();
    navigate(0);
  }

  if (!pb.authStore.isValid) return <Login />;
  
  return <div>
    <PrimaryButton onClick={logout}>Logout</PrimaryButton>
  </div>
}

export default App
