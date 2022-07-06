import "./App.css";
import Main from "./components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/common/PageNotFound";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Quiz from "./components/Quiz";
import ToDo from "./components/ToDo";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          redirectto="todo"
          path="/"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        >
          <Route path="/todo" element={<ToDo />} />
          <Route path="/quiz" element={<Quiz />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
