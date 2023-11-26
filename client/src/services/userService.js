const baseUrl = 'http://localhost:3030/users'

export const login = async (email, password) => {
    
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email, password), 
        });


        if(!response.ok) {
            throw new Error('Login failed')
        }

        const result = await response.json();
        return result
    } catch (err) {
        console.log(err);
    }
}

export const register = async (email, password) => {
    try {

        // const requestBody = {
        //     email: email,
        //     password: password,
        //     // You can add other properties here if required
        // };

        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email, password), 
        });

        if(!response.ok) {
            throw new Error('Registration failed')
        }
        
        const result = await response.json();

        return result
    } catch (err) {
        console.log(err);
    }
}