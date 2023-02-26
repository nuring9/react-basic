import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";

import NaveBar from "./components/NaveBar";
import Toast from "./components/Toast";
import useToast from "./hooks/toast";

function App() {
  const [toasts, addToast, deleteToast] = useToast();
  return (
    <Router>
      <NaveBar />
      <Toast toasts={toasts} deleteToast={deleteToast} />
      <div className="container mt-3">
        <Routes>
          {routes.map((route) => {
            const Component = route.element;
            return (
              <Route
                key={route.path}
                path={route.path}
                // element={route.element}
              >
                <Component addToast={addToast} />
              </Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
