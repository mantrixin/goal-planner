import api from './postApi.js';

export const fetchGoals = async () => {
    try {
            const response = await api.get("/goals");
            if(response.data){
                if(response.data.data){
                   return response.data.data
                }else {
                    return []
                }
            }
    } catch (error) {
        console.error(error.message)
     return []
    }
}


export const createGoal = async (goalData) => {
    try {

        const response = await api.post('/goals', goalData)
        if (response.data){
            if(response.data.data){
                return response.data.data
            }else
                return null;
        }   
    } catch (error) {
        console.error(error.message)
        return null;
    }
}

export const updateGoalProgress = async (goalId, progressData) => {
    try {
        const response = await api.put(`/goals/${goalId}/progress`, progressData)

        if(response.data){
            if(response.data.data)
                return response.data.data
        } else {
           return null
        }
        
    } catch (error) {
        console.error(error.message)
        return null;
    }
}

export const updateGoal = async (goalId, updateData) => {
    try {
        const response = await api.put(`/goals/${goalId}`, updateData)
        
        if(response.data){
            if(response.data.data)
                return response.data.data
        } else {
           return null
        }
        
    } catch (error) {
        console.error(error.message)
        return null;
    }
}


export const deleteGoal = async (habitId) => {
    try {
        const response = await api.delete(`/goals/${habitId}`)
        if(response.data.data){
            if(response.data.data){
                return response.data.data
            }else 
                return null
        }
    } catch (error) {
        console.error(error.message)
        return null;
    }
}

