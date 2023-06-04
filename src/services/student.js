import axios from 'axios';

const API_URL = 'http://localhost:3000/students'; 

export const fetchStudents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
};

export const addStudent = async (student) => {
    try {
        const response = await axios.post(API_URL, student);
        return response.data;
    } catch (error) {
        return false
       
    }
};

export const removeStudent = async (studentId) => {
    try {
        const response = await axios.delete(`${API_URL}/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing student:', error);
        return null;
    }
};

export const updateStudent = async (student) => {
    try {
        const response = await axios.put(`${API_URL}/${student.id}`, student);
        return response.data;
    } catch (error) {
        console.error('Error removing student:', error);
        return null;
    }
};