export const httpClient = {
    async get(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (e) {
            console.log(e);
        }
    }
}