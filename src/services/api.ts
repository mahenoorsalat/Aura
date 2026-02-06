const API_URL = 'http://localhost:3001/api';

export const api = {
    async getTasks() {
        const res = await fetch(`${API_URL}/tasks`);
        return res.json();
    },
    async toggleTask(id: number) {
        const res = await fetch(`${API_URL}/tasks/toggle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        return res.json();
    },
    async getScholarHistory() {
        const res = await fetch(`${API_URL}/scholar/history`);
        return res.json();
    },
    async sendScholarQuery(content: string) {
        const res = await fetch(`${API_URL}/scholar/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });
        return res.json();
    },
    async getPeers() {
        const res = await fetch(`${API_URL}/peers`);
        return res.json();
    },
    async getWellness() {
        const res = await fetch(`${API_URL}/wellness`);
        return res.json();
    },
    async toggleWellness(id: number) {
        const res = await fetch(`${API_URL}/wellness/toggle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        return res.json();
    },
    async getMetadata(key: string) {
        const res = await fetch(`${API_URL}/metadata/${key}`);
        return res.json();
    },
    async updateMetadata(key: string, value: any) {
        const res = await fetch(`${API_URL}/metadata`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, value }),
        });
        return res.json();
    },
};
