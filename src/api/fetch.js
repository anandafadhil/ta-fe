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

// export const fetchwithData = async (endpoint, data) => {
//     try {
//         const url = `${BASE_URL}${endpoint}`;
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });        if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// };

// Define a function to make POST requests
export const postData = async ({endpoint, data, id}) => {
    try {
        const url = `${BASE_URL}${endpoint}`;
        console.log("url", url);
        console.log("data", data);
        console.log("id", id);
        // const response = await axios.post(url, data);
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

export const postNoIDData = async ({endpoint, data}) => {
    try {
        const url = `${BASE_URL}${endpoint}`;
        console.log("url", url);
        console.log("data", data);
        // const response = await axios.post(url, data);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data}),
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