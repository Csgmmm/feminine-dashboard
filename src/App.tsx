import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Homepage from "./homepage/Homepage";
import Login from "./login/Login";
import PrivateRoute from "./privateRoute/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/homepage" element={<PrivateRoute><Homepage/></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login"/>}/>
      </Routes>

    </>
  );
}

export default App;
