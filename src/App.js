import React, {useEffect} from 'react';
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

    // Reload Page if user come from Redirection
    useEffect(() => {
        if (location.redirect) {
            window.location.reload()
        }
    })

    return (
        <AnimatePresence exitBeforeEnter>
            <Switch location={location}
                    key={location.pathname}>
                <PrivateRoute exact path="/" component={HomePage}/>
                <PrivateRoute path="/myProfile" component={MyProfile}/>
                <PrivateRoute path="/workouts" component={Workouts}/>
                <PrivateRoute path="/workout/:workoutId" component={EditWorkout}/>
                <PrivateRoute path="/workout" component={EditWorkout}/>
                <Route path="/login" component={LoginPage} key="/login"/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="*" component={NotFoundPage}/>
            </Switch>
        </AnimatePresence>
    )
}

export default App
