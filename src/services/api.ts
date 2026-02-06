// Aura 5.0 - Persistent Client-Side Kernel
// Replaces the Node backend with Edge Persistence (LocalStorage) for 100% Hackathon Portability.

const STORAGE_KEYS = {
    TASKS: 'aura_tasks',
    SCHOLAR_HISTORY: 'aura_scholar_history',
    PEERS: 'aura_peers',
    WELLNESS: 'aura_wellness',
    METADATA: 'aura_metadata'
};

// Initial Seed Data
const DEFAULT_DATA = {
    tasks: [
        { id: 1, title: 'Morning Grounding', done: true },
        { id: 2, title: 'Deep Work Sync', done: true },
        { id: 3, title: 'Hydration Target', done: true },
        { id: 4, title: 'Peer Contribution', done: true },
        { id: 5, title: 'Research Digest', done: false },
        { id: 6, title: 'Digital Curfew', done: false }
    ],
    wellness: [
        { id: 1, name: '60-min electronic curfew', completed: true, streak: 5, icon: 'Moon' },
        { id: 2, name: 'Digital fast duration (4h)', completed: true, streak: 3, icon: 'Activity' },
        { id: 3, name: 'Mindful walk / Grounding', completed: false, streak: 12, icon: 'Footprints' },
        { id: 4, name: 'Hydrate (H2O Synergy)', completed: false, streak: 7, icon: 'Droplets' }
    ],
    peers: [
        { id: 1, name: 'Alex Chen', tags: ['STEM', 'First-gen'], bio: 'CS major working on Neural Architectures.', match: 98, online: true, projects: 12, img: 'https://i.pravatar.cc/300?u=1' },
        { id: 2, name: 'Jordan Miller', tags: ['STEM', 'Neurodivergent'], bio: 'Physics double major.', match: 94, online: false, projects: 8, img: 'https://i.pravatar.cc/300?u=2' },
        { id: 3, name: 'Maya Gupta', tags: ['Arts', 'International'], bio: 'Fine arts student merging AI with traditional canvas.', match: 89, online: true, projects: 15, img: 'https://i.pravatar.cc/300?u=3' }
    ],
    metadata: {
        nourish_budget: '45',
        student_name: 'Active Scholar',
        student_major: 'Tier 4 Sync'
    }
};

const getStorage = (key: string, defaultValue: any) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
};

const setStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const api = {
    // --- TASKS ---
    async getTasks() {
        return getStorage(STORAGE_KEYS.TASKS, DEFAULT_DATA.tasks);
    },
    async toggleTask(id: number) {
        const tasks = await this.getTasks();
        const updated = tasks.map((t: any) => t.id === id ? { ...t, done: !t.done } : t);
        setStorage(STORAGE_KEYS.TASKS, updated);
        return { success: true };
    },

    // --- SCHOLAR AI ---
    async getScholarHistory() {
        return getStorage(STORAGE_KEYS.SCHOLAR_HISTORY, [
            { role: 'assistant', content: 'Neural vectors initialized. How can I assist your research synthesis today?', time: '09:00 AM' }
        ]);
    },
    async sendScholarQuery(content: string) {
        const history = await this.getScholarHistory();
        const userMsg = {
            role: 'user',
            content,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const response = {
            role: 'assistant',
            content: `Synthesis complete: I've cross-referenced "${content}" across local neural vectors. Correlation with Tier 4 Resilience protocols found.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setStorage(STORAGE_KEYS.SCHOLAR_HISTORY, [...history, userMsg, response]);
        return { success: true };
    },

    // --- VILLAGE ---
    async getPeers() {
        return getStorage(STORAGE_KEYS.PEERS, DEFAULT_DATA.peers);
    },

    // --- WELLNESS ---
    async getWellness() {
        return getStorage(STORAGE_KEYS.WELLNESS, DEFAULT_DATA.wellness);
    },
    async toggleWellness(id: number) {
        const wellness = await this.getWellness();
        const updated = wellness.map((w: any) => w.id === id ? { ...w, completed: !w.completed } : w);
        setStorage(STORAGE_KEYS.WELLNESS, updated);
        return { success: true };
    },

    // --- METADATA ---
    async getMetadata(key: string) {
        const meta = getStorage(STORAGE_KEYS.METADATA, DEFAULT_DATA.metadata);
        return { value: meta[key] || '' };
    },
    async updateMetadata(key: string, value: any) {
        const meta = getStorage(STORAGE_KEYS.METADATA, DEFAULT_DATA.metadata);
        meta[key] = value.toString();
        setStorage(STORAGE_KEYS.METADATA, meta);
        return { success: true };
    }
};
