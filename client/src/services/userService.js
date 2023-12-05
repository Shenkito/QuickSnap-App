const baseUrl = 'http://localhost:3030/users'

export const serializeUser = (user) => {
    return JSON.stringify(user);
};

const deserializeUser = (serializedUser) => {
    return JSON.parse(serializedUser);
};

export const login = async ({ email, password }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        const token = localStorage.getItem('accessToken');
        if (token) {
            headers['X-Authorization'] = token;
        }

        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ email, password }), // Send email and password as an object
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const result = await response.json();
        localStorage.setItem('user', serializeUser(result)); // Serialize user data
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const register = async ({ email, password, username, bio, profileImage }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        const token = localStorage.getItem('accessToken');
        if (token) {
            headers['X-Authorization'] = token;
        }

        const userData = { email, password, username, bio, profileImage }; // Include username in the request body

        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userData), // Send email, password, username, bio, and profileImage
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const result = await response.json();
        localStorage.setItem('user', serializeUser(result)); // Serialize user data
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


export const getStoredUser = () => {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser) {
        return deserializeUser(serializedUser); // Deserialize user data
    }
    return null;
};