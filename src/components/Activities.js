import React, { useState } from 'react';
import './Activities.css';

const Activities = ({ activitiesList, setActivitiesList, token }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    //Submit handle for creating a new activity
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('https://fitnesstrac-kr.herokuapp.com/api/activities', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: `${name}`,
                    description: `${description}`
                })
            })

            const data = await response.json();
            setMessage('')//reset message state

            //provides helpful message if activity was created or gives them an error
            if (data.error) {
                setMessage(data.error);
            }
            else {
                setMessage("Activity Created!");
            }

            //updates new activity list
            const newActivitiesList = [...activitiesList, data];
            setActivitiesList(newActivitiesList);
            setName('');
            setDescription('');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main>
            <div className="newActDiv">
                <h1 style={{ textAlign: "center", paddingTop: "10px" }}>Activities</h1>
                <div className="newActivity">
                    {token ?
                        <form className="newActivityForm" onSubmit={handleSubmit}>
                            <h2>Create Activity</h2>
                            <input type="text" placeholder="name"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value)
                                }} />
                            <input type="text" placeholder="description"
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value)
                                }} />
                            <button type="submit" className="actBtn" style={{ marginTop: "5px"}}>Add Activity</button>
                        </form>
                        : ''
                    }
                    {message ? <p style={{ color: "red", fontWeight: "bold", marginLeft: "35px", marginTop: "5px"}}>{message}</p> : ''}
                </div>
            </div>
            
            <div className="activitiesSection">
                {
                    activitiesList.map((activity) => {
                        return (
                            <div key={activity.id} className='activityItem'>
                                <h3>{activity.name}</h3>
                                <p><b>Description:</b>{activity.description}</p>
                            </div>)
                    })
                }
            </div>
        </main>
    )
}

export default Activities;