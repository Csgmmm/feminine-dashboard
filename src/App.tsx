import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout"
import Homepage from "./homepage/Homepage"


function App() {
  return (
    <Layout>
      <Routes>
        <Route>
          <Route path="/homepage" element={<Homepage />} />
        </Route>
      </Routes>
      <footer>Footer!</footer>
    </Layout>
  );
}


export default App;