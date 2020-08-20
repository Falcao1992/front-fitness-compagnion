import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import MyProfile from "./components/MyProfile";
import RegisterPage from "./components/RegisterPage";
import theme from "../src/assets/theme";
import {ThemeProvider} from "styled-components";

function App() {
    return (
        <ThemeProvider theme={theme}>
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <PrivateRoute exact path="/" component={HomePage}/>
                <PrivateRoute exact path="/myProfile" component={MyProfile}/>
            </Switch>
        </Router>
        </ThemeProvider>
    );
}

export default App;
