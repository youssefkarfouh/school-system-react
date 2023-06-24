import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_ENDPOINT}/subjects`; 

export const fetchSubjects = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching Subjets:', error);
        return [];
    }
};

export const addSubject = async (classe) => {
    try {
        const response = await axios.post(API_URL, classe);
        return response.data;
    } catch (error) {
        return false
       
    }
};

export const deleteSubject = async (classId) => {
    try {
        const response = await axios.delete(`${API_URL}/${classId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing subject:', error);
        return error;
    }
};

export const updateSubject = async (classe) => {
    try {
        const response = await axios.put(`${API_URL}/${classe.id}`, classe);
        return response.data;
    } catch (error) {
        console.error('Error removing class:', error);
        return error;
    }
};