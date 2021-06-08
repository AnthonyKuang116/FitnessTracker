import React from 'react';
import './Routines.css';

//Loads list of routines and filters them by if their public
const Routines = ({ routinesList }) => {
    const publicRoutines = routinesList.filter(routine => routine.isPublic === true)

    return (
        <>
            <main>
                <h1 style={{ textAlign: "center", paddingTop: "10px" }}>Routines</h1>
                <div className="routinesDiv">
                    {
                        publicRoutines.map((routine) =>
                            <div key={routine.id} className='routineItem'>
                                <section>
                                    <h3>{routine.name}</h3>
                                    <p>Goal: {routine.goal}</p>
                                    <p>Creator: {routine.creatorName}</p>
                                </section>
                                {routine.activities != '' ?
                                    <section className="activityList">
                                        <p style={{ color: "green" }}><b>Activities:</b></p>
                                        {routine.activities.map((activity) =>
                                            <div key={activity.id} className="activity">
                                                <p><b>Name: </b>{activity.name}</p>
                                                <p><b>Description: </b>{activity.description}</p>
                                                <p><b>Duration: </b>{activity.duration}</p>
                                                <p><b>Count: </b>{activity.count}</p>
                                            </div>
                                        )}
                                    </section>
                                    : <section className="activityList">
                                        <p style={{ color: "green" }}><b>Activities:</b></p>
                                        <div className="activity">
                                            <p>No Activities Listed Yet</p>
                                        </div>

                                    </section>
                                }
                            </div>
                        )
                    }
                </div>
            </main>
        </>
    )
}

export default Routines;
