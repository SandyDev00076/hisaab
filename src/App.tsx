import Home from "./components/Home";
import Login from "./components/Login"
import pb from "./lib/pocketbase";

function App() {
  if (!pb.authStore.isValid) return <Login />; 
  return <Home />
}

export default App
