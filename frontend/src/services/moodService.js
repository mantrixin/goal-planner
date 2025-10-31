import api from './postApi';

export const fetchMood = async () => {
    try {
        const response = await api.get('/mood');
        if (response.data) {
            if (response.data.data) {
                return response.data.data;
            } else {
                return [];
            }
        } else {
            return [];
        }
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

export const createMood = async (moodData) => {
    try {
        const response = await api.post('/mood', moodData);
        if (response.data) {
            if (response.data.data) {
                return response.data.data;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export const deleteData = async (moodId) => {
    try {
        const response = await api.delete(`/mood/${moodId}`);
        if (response.data) {
            if (response.data.data) {
                return response.data.data;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error(error.message);
        return null;
    }
}
