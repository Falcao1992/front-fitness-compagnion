import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import MyProfile from "./components/MyProfile";
import RegisterPage from "./components/RegisterPage";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <PrivateRoute exact path="/" component={HomePage}/>
                <PrivateRoute exact path="/myProfile" component={MyProfile}/>
            </Switch>
        </Router>
    );
}

export default App;
