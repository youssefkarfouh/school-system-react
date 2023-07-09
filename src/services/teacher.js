import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_ENDPOINT}/teachers`; 

export const fetchTeachers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching Teachers:', error);
        return [];
    }
};

export const addTeacher = async (teacher) => {
    try {
        const response = await axios.post(API_URL, teacher);
        return response.data;
    } catch (error) {
        return false
       
    }
};

export const removeTeacher = async (teacherId) => {
    try {
        const response = await axios.delete(`${API_URL}/${teacherId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing Teacher:', error);
        return null;
    }
};

export const updateTeacher = async (teacher) => {
    try {
        const response = await axios.put(`${API_URL}/${teacher.id}`, teacher);
        return response.data;
    } catch (error) {
        console.error('Error updating Teacher:', error);
        return null;
    }
};