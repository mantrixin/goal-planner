import api from "./postApi" 



export const fetchHabit = async () => {
   try {
    const response = await api.get('/habits');
    if(response.data){
        if(response.data.data){
            return response.data.data;
        }else {
            return [];
        }
   }
} catch (error) {
    console.error(error.message)
    return [];
}}

export const createHabit = async (habitData) => {
   
    try{
    const  response = await api.post("/habits",habitData)
    if(response.data){
        if(response.data.data){
            return response.data.data
        } else {
            return null
        }
    }
    } catch (error) {
        console.error(error.message)
        return null;
    }
}    


export const updateHabit = async (habitId, habitData) => {
    try {

        const response = await api.put(`/habits/${habitId}`, habitData)
        if(response.data){
            if(response.data.data){
                return response.data.data
            }
            return null
        }
        
    } catch (error) {
        console.error(error.message)
        return null
    }
    
}

export const deleteHabit = async (habitId) => {
try {
     const response = await api.delete(`/habits/${habitId}`)
     if(response.data){
        if(response.data.data){
            return response.data.data;
        }
        else{
            return null
        }
     }
    
} catch (error) {
    console.error(error.message)
    return null
}
}

export const toggleHabitCompletion = async (habitId) => {
    try {
        const response = await api.post(`/habits/${habitId}/toggle`)
        if(response.data){
            if(response.data.data){
                return response.data.data
            } else {
                return null
            }
        }
    } catch (error) {
        console.error(error.message)
        return null
    }
}
