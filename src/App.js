import React from 'react';
import './App.css';
import {Route, Switch, useLocation} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/Pages/Home/HomePage";
import LoginPage from "./components/AuthPage/Login/LoginPage";
import MyProfile from "./components/Pages/MyProfile/MyProfile";
import RegisterPage from "./components/AuthPage/Register/RegisterPage";
import Workouts from "./components/Pages/Workouts/Workouts";
import EditWorkout from "./components/Pages/EditWorkout/EditWorkout";
import NotFoundPage from "./components/Pages/NotFoundPage/NotFoundPage"
import {AnimatePresence} from "framer-motion"

const App = () => {
    let location = useLocation()

    return (
        <Switch location={location}
                key={location.pathname}
        >
            <AnimatePresence exitBeforeEnter>
                <PrivateRoute exact path="/" component={HomePage} key={'homepage'}/>
                <PrivateRoute path="/myProfile" component={MyProfile} key={"myProfile"}/>
                <PrivateRoute exact path="/workouts" component={Workouts} key={"workouts"}/>
                <PrivateRoute path="/workout/:workoutId" component={EditWorkout} key={"EditWorkout"}/>
                <PrivateRoute path="/workout" component={EditWorkout} key={"EditWorkoutDirect"}/>
                <Route path="/login" component={LoginPage} key={"loginPage"}/>
                <Route path="/register" component={RegisterPage} key={"RegisterPage"}/>
                <Route exact path="*" component={NotFoundPage} key={"notFoundPage"}/>
            </AnimatePresence>
        </Switch>
    );
}

export default App;
