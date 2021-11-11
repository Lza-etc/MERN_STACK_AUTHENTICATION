import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from "./components/Login";
function App() {
  return (
    <div className="App">
   <Router>
     <Route path="/" component={LoginForm}/>
   </Router>
    </div>
  );
}

export default App;
