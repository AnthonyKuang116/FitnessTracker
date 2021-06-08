import React, { useState } from 'react';
import { addActivity } from '../api'

//Form for adding activities to your routine
const AddActivity = ({ activitiesList, routineIdtoAddActivity, token }) => {
    const [activityId, setActivityId] = useState(1);
    const [activityName, setActivityName] = useState('');
    const [descriptionName, setDescriptionName] = useState('');
    const [message, setMessage] = useState('');
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const activitySelect = await addActivity(token, routineIdtoAddActivity, activityId, count, duration)
        if (activitySelect.error) {
            setMessage("Unable to perform action due to it being a duplicate")
        } else {
            setMessage('')
        }
        setCount(0)
        setDuration(0)
        setActivityId(0)
    };

    const handleSelectChange = (event) => {
        const id = event.target.value;
        const activity = activitiesList.find(activity => activity.id == id);
        setActivityId(activity.id);
        setActivityName(activity.name)
        setDescriptionName(activity.description)
    };

    return (
        <div className='activityForm'>
            <h4 className="activityFormTitle">Add an Activity</h4>
            <form onSubmit={handleSubmit}>
                <p>(Choose an activity)</p>
                <select onChange={handleSelectChange} className="option" style={{ width: "232px" }}>
                    {
                        activitiesList.map(activity => (
                            <option key={activity.id} value={activity.id}>
                                { activity.name}</option>
                        ))
                    }
                </select>
                <label>Duration:</label>
                <input className="numberInput" type="number" min="0" value={duration} name="duration"
                    onChange={(event) => { setDuration(event.target.value) }} />
                <label>Count:</label>
                <input className="numberInput" type="number" min="0" value={count} name="count"
                    onChange={(event) => { setCount(event.target.value) }} />
                <button type="submit" className='submitButton'>Add Activity (CURRENTLY UNAVAILABLE)</button>
                {
                    message ?
                        <p style={{ color: "red", backgroundColor: "white" }}>{message} </p> : ''
                }
            </form>
        </div>
    )
};

export default AddActivity;