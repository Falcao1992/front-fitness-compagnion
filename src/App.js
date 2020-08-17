import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <PrivateRoute exact path="/" component={HomePage}/>
            </Switch>
        </Router>
    );
}

export default App;
