const baseUrl = 'http://localhost:3030/jsonstore'

export const getAll = async () => {
    try {
        const response = await fetch(`${baseUrl}/posts`);

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const posts = await response.json();
        console.log(posts);
        return posts;

    } catch (error) {
        console.log('Error fetching posts:', error);
    }
};

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
};