import { BrowserRouter as Router, Route ,Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/dashboard";
import ErrorPage from "./components/ErrorPage/errorPage";
import LoginPage from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import RegisterPage from "./components/Register/Register";

function App() {
  return (
    <Router>
       <Route path="/" component={Navbar} />
      <div className="App">
        <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route  path="/register" component={RegisterPage} />
        <Route  path="/dashboard" component={Dashboard} />
        <Route  path="/form" component={ProfileForm} />
        <Route component={ErrorPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
