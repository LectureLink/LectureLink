import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Page imports
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import StudentClasses from "../pages/StudentClasses";
import Prompt from "../pages/Prompt";
import Error from "../pages/Error";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={<Login />} />
        <Route path="/signup" component={<Signup />} />
        <Route path="/classes" component={<StudentClasses />} />
        <Route path="/prompt" component={<Prompt />} />
        <Route path="/*" component={<Error />} />
      </Switch>
    </Router>
  );
}

export default Routes;
