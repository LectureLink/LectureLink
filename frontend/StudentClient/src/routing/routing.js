import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page imports
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import StudentClasses from "../pages/StudentClasses";
import Prompt from "../pages/Prompt";
import Error from "../pages/Error";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/classes" element={<StudentClasses />} />
        <Route path="/prompt" element={<Prompt />} />
        {/* <Route path="/*" element={<Error />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
