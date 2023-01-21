import { useState } from "react"
import Login from "./components/Login"

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  if (!isLoggedIn) return <Login />;
  
  return <div></div>
}

export default App
