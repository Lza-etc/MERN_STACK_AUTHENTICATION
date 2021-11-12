import { BrowserRouter as Router, Route ,Switch } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route  path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
