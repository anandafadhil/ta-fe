import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = 'http://127.0.0.1:8000';

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

        // let url = `${process.env.NEXT_PUBLIC_BASEURL}${endpoint}?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`;
        // if (endpoint.includes("?")) {
        //     url = `${process.env.NEXT_PUBLIC_BASEURL}${endpoint}&pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`;
        // }
        // if (endpoint === "/AuditLogs") {
        //     url = `${process.env.NEXT_PUBLIC_BASEURL}${endpoint}?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}&action=${action}`;
        // }
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

export const postNoIDData = async ({ endpoint, data }) => {
    try {
        const url = `${BASE_URL}${endpoint}`;
        // const response = await axios.post(url, data);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
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