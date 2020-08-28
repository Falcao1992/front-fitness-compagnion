import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/Home/HomePage";
import LoginPage from "./components/Login/LoginPage";
import MyProfile from "./components/Home/MyProfile";
import RegisterPage from "./components/Register/RegisterPage";
import theme from "../src/assets/theme";
import {ThemeProvider} from "styled-components";
import Workouts from "./components/Home/Workouts";
import EditWorkout from "./components/Home/EditWorkout";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <PrivateRoute exact path="/" component={HomePage}/>
                <PrivateRoute exact path="/myProfile" component={MyProfile}/>
                <PrivateRoute exact path="/workouts" component={Workouts}/>
                <PrivateRoute exact path="/workout/:workoutId" component={EditWorkout}/>
                <PrivateRoute exact path="/workout" component={EditWorkout}/>
            </Switch>
        </Router>
        </ThemeProvider>
    );
}

export default App;
