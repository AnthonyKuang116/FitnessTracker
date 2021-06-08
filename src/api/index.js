const BASE = 'https://fitnesstrac-kr.herokuapp.com/api'

export async function getUser(token){
    try {
        const data = await fetch(`${BASE}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const response = await data.json();
        if (!token){
            return;
        }
        else{
            return response;
        }
    } catch (error) {
        throw error;
    }
}

export async function getRoutines(){
    try{
        const data = await fetch(`${BASE}/routines`);
        const dataJson = await data.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}

export async function getUserRoutines(user){
    try{
        const data = await fetch(`${BASE}/users/${user}/routines`);
        const dataJson = await data.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}

export async function getActivities(){
    try{
        const data = await fetch(`${BASE}/activities`);
        const dataJson = await data.json();
        return dataJson;
    } catch (error) {
        throw error;
    }
}

export async function deleteRoutine(routineId, token) {
    try{
        const response = await fetch(`${BASE}/routines/${routineId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                activityId,
                count,
                duration
            })
        })
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function editRoutineActivity(routineActivityId, token, count, duration) {
    try{
        const response = await fetch(`${BASE}/routine_activities/${routineActivityId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                count,
                duration
            })
        })
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function deleteRoutineActivity(routineActivityId, token) {
    try{
        const response = await fetch(`${BASE}/routine_activities/${routineActivityId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function addActivity(routineId, token, activityId, count, duration) {
    try{
        const response = await fetch(`${BASE}/routines/${routineId}/activities`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                activityId,
                count,
                duration
            })
        })
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

