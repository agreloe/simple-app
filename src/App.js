import "./App.css";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {
  const token = useSelector((state) => state.auth.token);

  return token ? <Navigate to="/dashboard" /> : <Home />;
}

export default App;
