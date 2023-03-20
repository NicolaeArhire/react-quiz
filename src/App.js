import "./App.css";
import Navigation from "./components/nav";
import Quiz from "./components/quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Provider from "./context/context";

function App() {
  return (
    <div className="App">
      <Provider>
        <Router>
          <Navigation />
          <Routes>
            <Route index element={<Quiz />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
