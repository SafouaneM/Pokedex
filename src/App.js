import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import backgroundimage  from './poyo.jpg'
import Pokemon from './components/pokemon/Pokemon'
import {HashRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {

  render() {
    return (
        <Router>
        <div className="App" style={{background: `url(${backgroundimage})`}}>
        <NavBar></NavBar>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/pokemon/:pokemonIndex" component={Pokemon}/>
                    <Dashboard />
                </Switch>
        </div>
        </div>
        </Router>
    );
  }
}
export default App;
