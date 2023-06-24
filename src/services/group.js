import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_ENDPOINT}/groups`; 

export const fetchGroups = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching group:', error);
        return [];
    }
};

export const addGroup = async (classe) => {
    try {
        const response = await axios.post(API_URL, classe);
        return response.data;
    } catch (error) {
        return false
       
    }
};

export const deleteGroup = async (classId) => {
    try {
        const response = await axios.delete(`${API_URL}/${classId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing group:', error);
        return error;
    }
};

export const updateGroup = async (classe) => {
    try {
        const response = await axios.put(`${API_URL}/${classe.id}`, classe);
        return response.data;
    } catch (error) {
        console.error('Error update group:', error);
        return error;
    }
};