import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NaveBar from "./components/NaveBar";
import routes from "./routes";

function App() {
  return (
    <Router>
      <NaveBar />
      <div className="container mt-3">
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
