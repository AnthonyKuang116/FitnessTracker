
import React, { useState, useEffect } from 'react';
import './MyRoutines.css';

import AddActivity from './AddActivity'

import {deleteRoutine, deleteRoutineActivity, getUserRoutines, editRoutineActivity} from '../api';

const BASE = "https://fitnesstrac-kr.herokuapp.com/api"

//Forms for myRoutines (creating and editing)
const myRoutines = ({token, currentUser, routinesList, setRoutinesList, activitiesList, userRoutines, setUserRoutines}) => {
    //myRoutine options
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(true);

    //when state needs to be updated
    const [state, setState] = useState(false);
    const [message, setMessage] = useState('');
    const [routineIdAddAct, setRoutineIdAddAct] = useState(1);

    //edit states
    const [edit, setEdit] = useState(false);
    const [editRA, setEditRA] = useState(false);

    const [editName, setEditName] = useState('');
    const [editGoal, setEditGoal] = useState('');
    const [editId, setEditId] = useState(0);

    const [editRAId, setEditRAId] = useState(0);
    const [editRAName, setEditRAName] = useState('');
    const [editRADuration, setEditRADuration] = useState(0);
    const [editRACount, setEditRACount] = useState(0);
    const [editRAPublic, setEditRAPublic] = useState(true);

    useEffect(() => {
        getUserRoutines(currentUser)
        .then(routines => {
            setUserRoutines(routines)
        })
    }, [])

    useEffect(() => {
        getUserRoutines(currentUser)
        .then(routines => {
            setUserRoutines(routines)
            setState(false)
        })
    }, [state])
    
    //Submit handler for creating your inital routine
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch (`${BASE}/routines`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: `${name}`,
                    goal: `${goal}`,
                    isPublic: `${isPublic}`
                })
            })

            const data = await response.json()
            if(data.error) {
                setMessage("Coudln't add routine because one already exists!")
            }
            else{
                setMessage("")
            }
            console.log(data)
            setState(true);

            setName('');
            setGoal('');
            setIsPublic(true);
        } catch (error) {
            console.error(error);
        }
    }

    //handler for editing the already created routine
    const handleEdit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch (`${BASE}/routines/${editId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: `${name}`,
                    goal: `${goal}`,
                    isPublic: `${editRAPublic}`
                })
            })

            await response.json()
        } catch (error) {
            console.error(error);
        }
    }

    //edit handle for activities added
    const handleEditRoutineActivity = async (event) => {
        event.preventDefault();
        try {
            await editRoutineActivity(editRAId, token, editRACount, editRADuration)
            setEditRAId(0)
            setEditRACount(0)
            setEditRADuration(0)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="myRoutinesDiv">
                <h1>My Routines</h1>
                <form className="myRoutineForm" onSubmit={handleSubmit}>
                    <h2>Create Your Own Routine!</h2>
                    {
                        message ? <p style={{color:"red"}}>{message}</p> : ''
                    }
                    <label>Name</label>
                    <input type="text" placeholder="name" value={name}
                        onChange={(event) => {
                        setName(event.target.value)}}/>
                    <label>Goal</label>
                    <input type="text" placeholder="goal" value={goal}
                        onChange={(event) => {
                        setGoal(event.target.value)}}/>
                    <label>Make it Public?</label>
                    <select value={isPublic} style={{width: "50px", alignSelf: "center"}}
                        onChange={(event) => {setIsPublic(event.target.value)}} name="isPublic">
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <button type="submit" style={{marginTop: "5px"}}>Create Routine</button>
                </form>
            </div>

            <div className="userRoutines">
                {
                    userRoutines && userRoutines.length > 0 && userRoutines.map((userRoutine) => 
                    <div key={userRoutine.id} style={{border: "1px solid black", width:"250px"}} className="userRoutineCard">
                        <section>
                            <h3>{userRoutine.name}</h3>
                            <p><span>Goal: </span>{userRoutine.goal}</p>
                            <p><span>Creator: </span>{userRoutine.creatorName}</p>
                            <p><span>Is Public: </span>{userRoutine.isPublic ? "Yes" : "No"}</p>
                        </section>

                        {
                            userRoutine.activities ?
                            <>
                                <section className="userRoutineAct">
                                    <p>Activities:</p>
                                    {
                                        userRoutine.activities.map((activity) => 
                                        <div key={activity.RoutineActivityId}>
                                            <p>Name: {activity.name}</p>
                                            <p>Description: {activity.description}</p>
                                            <p>Duration: {activity.duration}</p>
                                            <p>Count: {activity.count}</p>
                                            <button className="editRoutineAct"
                                                onClick={() => {
                                                    setEditRA(true)
                                                    setEditRAId(activity.RoutineActivityId)
                                                    setEditRAName(activity.name)
                                                    setEditRACount(activity.count)
                                                    setEditRADuration(activity.duration)
                                                }}>Edit</button>
                                            <button className="deleteBtn"
                                                onClick={() => {
                                                    deleteRoutineActivity(activity.RoutineActivityId, token)
                                                }}>Delete</button>
                                        </div>
                                        )
                                    }
                                </section>
                            </>
                            : ''
                        }
                        <button className="editBtn"
                            onClick={() => {
                                setEditName(userRoutine.name)
                                setEditGoal(userRoutine.goal)
                                setEditId(userRoutine.id)
                            }}>Edit (UNAVAILABLE)</button>
                        
                        <button className="deleteBtn" 
                            onClick={(event) =>{
                                event.preventDefault()
                                const modifiedRoutines = [...routinesList]
                                const modifiedUserList = [...userRoutines]
                                const routineIndex = modifiedRoutines.findIndex(routine => routine.id ===userRoutine.id);
                                if(routineIndex === -1) return;
                                modifiedRoutines.splice(index, 1)
                                setRoutinesList(modifiedRoutines)

                                const userIndex = modifiedUserList.findIndex(routine => routine.id === userRoutine.id);
                                if(userIndex === -1) return;
                                newUserList.splice(userIndex, 1);
                                setUserRoutines(modifiedUserList)
                                deleteRoutine(userRoutine.id, token)}}>Delete (UNAVAILABLE)</button>
                            <>
                                <div onClick ={(event) => 
                                    {
                                        event.preventDefault()
                                        setRoutineIdAddAct(userRoutine.id)}}>
                                        <AddActivity activitiesList={activitiesList} routineIdAddAct={routineIdAddAct} token={token}/>
                                </div>
                            </>
                    </div>
                    )
                }
            </div>

            <form className="routineEditForm" style={{display: edit? 'block' : 'none'}}
                onSubmit={{handleEdit}}>
                <h2>
                    <span>EditRoutine</span>
                    <span onClick={() => setEdit(false)}>Exit</span>
                </h2>
                <label>Name</label>
                <input type="text" placeholder="name" value={editName} onChange={(event) => {setEditName(event.target.value)}}/>
                <label>Goal</label>
                <input type="textarea" placeholder="goal" value={editGoal} onChange={(event) => {setEditGoal(event.target.value)}}/>
                <label>Is Public?</label>
                <select value={editRAPublic} style={{width: "50px"}}
                    onChange={(event) => {setEditRAPublic(event.target.value)}} name="isPublic">
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                </select>
                <button style={{padding: "5px", border: "1px solid black"}}>Submit</button>
            </form>

            <form className="editRAForm" onSubmit={handleEditRoutineActivity} style={{display: editRA? 'block' : 'none', textAlign: "center"}}>
                <p>Routine Activity Edit:<span>{editRAName}</span></p>
                <label>Duration</label>
                <input type="number" name="editDuration" value={editRADuration} min="0"
                    onChange={(event) => {setEditRADuration(event.target.value)}}/>
                <label>Count</label>
                <input type="number" name="editCount" value={editRACount} min="0" 
                    onChange={(event) => {setEditRACount(event.target.value)}}/>
                <button style={{padding: "5px"}}>Submit Edit</button>
                <span className="exit"
                    onClick={() => setEditRA(false)}>Exit</span>
            </form>
        </>
    )
}



export default myRoutines;