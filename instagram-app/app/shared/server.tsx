export const getInfo = async () => {
    const URL = "http://localhost:3001/api/posts/feed";
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return; 
        }
        const response = await fetch(URL, {
            headers: {
                "bypass-tunnel-reminder": "true",
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log("Error getting info");
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};

export async function getElement(url, id, token) {
    const elementUrl = `${url}/${id}`;
    try {
        const response = await fetch(elementUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error fetching element: ${response.status} - ${errorText}`);
        }

        console.log('Element fetched successfully');

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching element: ', error);
        throw error;
    }
}

export async function deleteData(url, id) {
    const deleteUrl = `${url}/${id}`;
    try {
        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting: ${response.status}`);
        }

        console.log('Element deleted successfully');

        const data = await response.text();
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error deleting element: ', error);
        throw error;
    }
}

export async function deleteDataWithToken(url, id, token) {
    const deleteUrl = `${url}/${id}`;
    try {
        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting: ${response.status}`);
        }

        console.log('Element deleted successfully');

        const data = await response.text();
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error deleting element: ', error);
        throw error;
    }
}

export async function putData(url, data, token) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error ' + response.statusText);
        }

        const result = await response.json();
        console.log('Element updated:', result);
        return result;
    } catch (error) {
        console.error('Error updating element:', error);
    }
}

export async function postData(url, data, token) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: data
        });

        const result = await response.json();
        return { response, result };
    } catch (error) {
        console.log('Could not add the element: ', error);
    }
}

export async function postDataApplicationJson(url, data, token) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: data
        });
        const result = await response.json();
        return { response, result };
    } catch (error) {
        console.log('Could not add the element: ', error);
    }
}