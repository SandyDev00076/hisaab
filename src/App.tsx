import Login from "./components/Login"
import pb from "./lib/pocketbase";

function App() {
  if (!pb.authStore.isValid) return <Login />;
  
  return <div>User is logged in</div>
}

export default App
