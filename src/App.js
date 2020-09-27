import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/Home/HomePage";
import LoginPage from "./components/Login/LoginPage";
import MyProfile from "./components/MyProfile/MyProfile";
import RegisterPage from "./components/Register/RegisterPage";
import theme from "../src/assets/theme";
import {ThemeProvider} from "styled-components";
import Workouts from "./components/Workout/Workouts";
import EditWorkout from "./components/Workout/EditWorkout";
import NotFoundPage from "./components/NotFoundPage"


const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/register" component={RegisterPage}/>
                    <PrivateRoute exact path="/" component={HomePage}/>
                    <PrivateRoute path="/myProfile" component={MyProfile}/>
                    <PrivateRoute path="/workouts" component={Workouts}/>
                    <PrivateRoute path="/workout/:workoutId" component={EditWorkout}/>
                    <PrivateRoute path="/workout" component={EditWorkout}/>
                    <Route path="*" component={NotFoundPage}/>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
