import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Homepage from "./homepage/Homepage";
import Login from "./login/Login";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Logs from "./pages/LogsRecords/Logs";
import Calendar from "./pages/Calendar/Calendar";

import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/homepage"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <Calendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/logs"
          element={
            <PrivateRoute>
              <Logs />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
