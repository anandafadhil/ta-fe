import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = 'https://pddikti-be-7nv4o5wmyq-uc.a.run.app';

export const fetchData = async (endpoint) => {
    try {
        const url = `${BASE_URL}${endpoint}`;
        console.log(url)
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchDatawithYear = async ({ endpoint, selectedYear }) => {
    try {
        const url = `${BASE_URL}${endpoint}/${selectedYear}`;
        console.log(url)
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchDatawithIDUniv = async ({ endpoint, selectedIDUniv }) => {
    try {
        const url = `${BASE_URL}${endpoint}/${selectedIDUniv}`;
        console.log(url)
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchDatawithIDYear = async ({ endpoint, selectedIDUniv, selectedYear }) => {
    try {
        const url = `${BASE_URL}${endpoint}/${selectedIDUniv}/${selectedYear}`;
        console.log(url)
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchTable = async ({ endpoint, data, pageSize = 5, pageNumber = 1, }) => {
    try {
        const url = `${BASE_URL}${endpoint}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, pageSize, pageNumber }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

// Define a function to make POST requests
export const postData = async ({ endpoint, data, id }) => {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, id }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const postNoIDData = async ({ endpoint, data, id }) => {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data, id }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};