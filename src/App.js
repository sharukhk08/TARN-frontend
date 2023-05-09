import "./App.css";
import Main from "./components/Main";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/common/PageNotFound";
import Login from "./components/Login";
import LogInPage from "./components/auth/LogInPage";
import SignUp from "./components/SignUp";
import Quiz from "./components/Quiz";
import ToDo from "./components/ToDo";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ScoreBoard from "./components/ScoreBoard";
import CoverFlowSlider from "./components/CoverFlowSlider";
import TestSwiper from "./components/TestSwiper";

function App() {
  return (
    <>
      <Routes>
        <Route path="/swiper" element={<TestSwiper />} />
        <Route path="/cover-flow" element={<CoverFlowSlider />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-by-auth0" element={<LogInPage />} />
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
          <Route path="/scoreboard" element={<ScoreBoard />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
