const url = 'https://jsonplaceholder.typicode.com/posts';

export const getAll = async () => {
    try {
        const response = await fetch(url);
        const result = await response.json();

        const data = Object.values(result);

        return data;
    } catch (error) {
        console.log(error);
    }
}