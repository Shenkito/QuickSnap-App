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