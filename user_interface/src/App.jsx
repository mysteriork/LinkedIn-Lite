import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Reset from "./components/reset";

const Feed = lazy(() => import("./components/home"));
const Profile = lazy(() => import("./components/profile"));
function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: "x-large",
            }}
          >
            Loading. . .
          </div>
        }
      >
        <Routes>
          <Route path="/home" element={<Feed />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
