import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_ENDPOINT}/classes`; 

export const fetchClasses = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching classs:', error);
        return [];
    }
};

export const addClass = async (classe) => {
    try {
        const response = await axios.post(API_URL, classe);
        return response.data;
    } catch (error) {
        return false
       
    }
};

export const deleteClass = async (classId) => {
    try {
        const response = await axios.delete(`${API_URL}/${classId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing class:', error);
        return error;
    }
};

export const updateClass = async (classe) => {
    try {
        const response = await axios.put(`${API_URL}/${classe.id}`, classe);
        return response.data;
    } catch (error) {
        console.error('Error removing class:', error);
        return error;
    }
};