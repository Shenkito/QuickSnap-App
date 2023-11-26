const baseUrl = 'http://localhost:3030/jsonstore'

export const create = async (postData) => {
    const response = await fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })

    const result = await response.json();

    return result;
}