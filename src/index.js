import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink,
    Redirect
} from 'react-router-dom';

import { getRoutines, getActivities } from './api';
import { getCurrentUser, getCurrentToken } from './auth';

import {
    Header,
    Routines,
    Activities,
    MyRoutines
} from './components';



const App = () => {
    const [currentUser, setCurrentUser] = useState(getCurrentUser);
    const [routinesList, setRoutinesList] = useState([]);
    const [userRoutines, setUserRoutines] = useState([]);
    const [activitiesList, setActivitiesList] = useState([]);
    const [token, setToken] = useState(getCurrentToken);

    useEffect(() => {
        getRoutines()
            .then(routines => {
                setRoutinesList(routines)
            }).catch(error => {
                console.error(error);
            });

        getActivities()
            .then(activities => {
                setActivitiesList(activities)
            }).catch(error => {
                console.error(error);
            });

    }, []);

    return (
        <div id='App'>
            <Header
                token={token}
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser} />
            <Router>
                <div id="navLinks">
                    <NavLink to="/" className="nav" style={{padding: "5px", borderRadius: "5px", marginLeft: "10px", fontWeight: "bold"}}>Home</NavLink>
                    <NavLink to="/routines" className="nav" style={{padding: "5px", borderRadius: "5px", fontWeight: "bold"}}>Routines</NavLink>
                    <NavLink to="/activities" className="nav" style={{padding: "5px", borderRadius: "5px", fontWeight: "bold"}}>Activities</NavLink>
                    {token ?
                        <NavLink to="/my-routines" className="nav" style={{padding: "5px", borderRadius: "5px", fontWeight: "bold"}}>My Routines</NavLink>
                        : ''}
                    <Switch>
                        {token ?
                            <Route path="/my-routines">
                                <MyRoutines 
                                    currentUser={currentUser}
                                    token={token}
                                    routinesList={routinesList}
                                    setRoutinesList={setRoutinesList}
                                    userRoutines={userRoutines}
                                    setUserRoutines={setUserRoutines}
                                    activitiesList={activitiesList}
                                />
                            </Route>
                            : ""}
                            <Route exact path="/routines"><Routines routinesList={routinesList}/></Route>
                            <Route exact path="/activities"><Activities activitiesList={activitiesList} setActivitiesList={setActivitiesList} token={token}/></Route>
                
                            <Redirect to="/"/>
                    </Switch>
                </div>
            </Router>      
        </div>
    )
}


ReactDOM.render(
            <App />,
    document.getElementById('app')
);