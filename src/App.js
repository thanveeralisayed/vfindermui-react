import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';



function App() {
  return (
    <Router>
      <div className="App">

        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>

      </div>
    </Router>
  );
}

export default App;
