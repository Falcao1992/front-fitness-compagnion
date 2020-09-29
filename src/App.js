import React from 'react';
import './App.css';
import {Route, Switch, useLocation} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/Home/HomePage";
import LoginPage from "./components/Login/LoginPage";
import MyProfile from "./components/MyProfile/MyProfile";
import RegisterPage from "./components/Register/RegisterPage";
import Workouts from "./components/Workout/Workouts";
import EditWorkout from "./components/Workout/EditWorkout";
import NotFoundPage from "./components/NotFoundPage"
import {AnimatePresence} from "framer-motion"


const App = () => {
    let location = useLocation()
    return (
        <AnimatePresence exitBeforeEnter>
            <Switch location={location}
                    key={location.pathname}
            >
                <PrivateRoute exact path="/" component={HomePage}/>
                <PrivateRoute path="/myProfile" component={MyProfile}/>
                <PrivateRoute path="/workouts" component={Workouts}/>
                <PrivateRoute path="/workout/:workoutId" component={EditWorkout}/>
                <PrivateRoute path="/workout" component={EditWorkout}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="*" component={NotFoundPage}/>
            </Switch>
        </AnimatePresence>
    );
}


export default App;
