import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Recipe from './pages/recipe/Recipe';
import Search from './pages/search/Search';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/recipe/:id" component={Recipe} />
          <Route path="/search" component={Search} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
