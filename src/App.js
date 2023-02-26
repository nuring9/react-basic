import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";

import NaveBar from "./components/NaveBar";
import Toast from "./components/Toast";
import useToast from "./hooks/toast";
import { useSelector } from "react-redux";

function App() {
  const toasts = useSelector((state) => state.toast.toasts);
  const { deleteToast } = useToast();
  return (
    <Router>
      <NaveBar />
      <Toast toasts={toasts} deleteToast={deleteToast} />
      <div className="container mt-3">
        <Routes>
          {routes.map((route) => {
            // const Component = route.element;
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
