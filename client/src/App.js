

import LoginPage from "../components/views/LoginPage/LoginPage";
import LandingPage from "../components/views/LandingPage/LandingPage";
import RegisterPage from "../components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/" component={RegisterPage} />
      </Switch>
    </Router>
  );
}

export default App;
