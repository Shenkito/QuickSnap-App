const loginUrl = 'http://localhost:3030/users/login'

export async function login(email, password) {
    try {
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email, password), 
        });

        if(!response.ok) {
            throw new Error('Login failed')
        }

        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

const registerUrl = 'http://localhost:3030/users/register'

export async function register(email, password) {
    try {

        // const requestBody = {
        //     email: email,
        //     password: password,
        //     // You can add other properties here if required
        // };

        const response = await fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email, password), 
        });

        if(!response.ok) {
            throw new Error('Registration failed')
        }
        
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}