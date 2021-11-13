import { BrowserRouter as Router, Route ,Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/dashboard";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route  path="/register" component={RegisterPage} />
        <Route  path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
