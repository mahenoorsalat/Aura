import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';
import { z } from 'zod';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const db = new Database('aura.db');

// --- DATABASE INITIALIZATION ---
db.exec(`
  CREATE TABLE IF NOT EXISTS scholar_chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS wellness_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS system_metadata (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS peers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    tags TEXT,
    bio TEXT,
    match INTEGER,
    online INTEGER,
    projects INTEGER,
    img TEXT
  );
`);

// --- SEED DATA ---
const seed = () => {
    const taskCount = db.prepare('SELECT count(*) as count FROM tasks').get() as any;
    if (taskCount.count === 0) {
        const insertTask = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
        ['Morning Grounding', 'Deep Work Sync', 'Hydration Target', 'Peer Contribution'].forEach(t => insertTask.run(t, 1));
        ['Research Digest', 'Digital Curfew'].forEach(t => insertTask.run(t, 0));
    }

    const wellnessCount = db.prepare('SELECT count(*) as count FROM wellness_tasks').get() as any;
    if (wellnessCount.count === 0) {
        const insertWellness = db.prepare('INSERT INTO wellness_tasks (name, completed, streak, icon) VALUES (?, ?, ?, ?)');
        insertWellness.run('60-min electronic curfew', 1, 5, 'Moon');
        insertWellness.run('Digital fast duration (4h)', 1, 3, 'Activity');
        insertWellness.run('Mindful walk / Grounding', 0, 12, 'Footprints');
        insertWellness.run('Hydrate (H2O Synergy)', 0, 7, 'Droplets');
    }

    const metaCount = db.prepare('SELECT count(*) as count FROM system_metadata').get() as any;
    if (metaCount.count === 0) {
        db.prepare('INSERT INTO system_metadata (key, value) VALUES (?, ?)').run('nourish_budget', '45');
    }

    const peerCount = db.prepare('SELECT count(*) as count FROM peers').get() as any;
    if (peerCount.count === 0) {
        const insertPeer = db.prepare('INSERT INTO peers (name, tags, bio, match, online, projects, img) VALUES (?, ?, ?, ?, ?, ?, ?)');
        insertPeer.run('Alex Chen', 'STEM,First-gen', 'CS major working on Neural Architectures.', 98, 1, 12, 'https://i.pravatar.cc/300?u=1');
        insertPeer.run('Jordan Miller', 'STEM,Neurodivergent', 'Physics double major.', 94, 0, 8, 'https://i.pravatar.cc/300?u=2');
    }
};
seed();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// Dashboard Tasks
app.get('/api/tasks', (req, res) => {
    const tasks = db.prepare('SELECT * FROM tasks').all();
    res.json(tasks.map((t: any) => ({ ...t, done: !!t.done })));
});

app.post('/api/tasks/toggle', (req, res) => {
    const { id } = req.body;
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id) as any;
    if (task) {
        db.prepare('UPDATE tasks SET done = ? WHERE id = ?').run(task.done ? 0 : 1, id);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Wellness Tasks (Balance)
app.get('/api/wellness', (req, res) => {
    const tasks = db.prepare('SELECT * FROM wellness_tasks').all();
    res.json(tasks.map((t: any) => ({ ...t, completed: !!t.completed })));
});

app.post('/api/wellness/toggle', (req, res) => {
    const { id } = req.body;
    const task = db.prepare('SELECT * FROM wellness_tasks WHERE id = ?').get(id) as any;
    if (task) {
        db.prepare('UPDATE wellness_tasks SET completed = ? WHERE id = ?').run(task.completed ? 0 : 1, id);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Wellness task not found' });
    }
});

// System Metadata (Nourish Budget)
app.get('/api/metadata/:key', (req, res) => {
    const row = db.prepare('SELECT value FROM system_metadata WHERE key = ?').get(req.params.key) as any;
    res.json({ value: row?.value || '' });
});

app.post('/api/metadata', (req, res) => {
    const { key, value } = req.body;
    db.prepare('INSERT OR REPLACE INTO system_metadata (key, value) VALUES (?, ?)').run(key, value.toString());
    res.json({ success: true });
});

// Scholar AI
app.get('/api/scholar/history', (req, res) => {
    const history = db.prepare('SELECT * FROM scholar_chats ORDER BY created_at ASC').all();
    res.json(history.map((m: any) => ({
        ...m,
        time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })));
});

app.post('/api/scholar/chat', async (req, res) => {
    const { content } = req.body;

    // Save User message
    db.prepare('INSERT INTO scholar_chats (role, content) VALUES (?, ?)').run('user', content);

    // High-fidelity "Synthesis" simulation
    setTimeout(() => {
        const response = `Synthesis complete: I've cross-referenced "${content}" across 12 neural vectors. Significant correlation with Tier 4 Resilience protocols found.`;
        db.prepare('INSERT INTO scholar_chats (role, content) VALUES (?, ?)').run('assistant', response);
    }, 1000);

    res.json({ success: true });
});

// Village Peers
app.get('/api/peers', (req, res) => {
    const peers = db.prepare('SELECT * FROM peers').all();
    res.json(peers.map((p: any) => ({
        ...p,
        tags: p.tags.split(','),
        online: !!p.online
    })));
});

// Server check
app.get('/health', (req, res) => res.json({ status: 'Aura Core Operational' }));

app.listen(port, () => {
    console.log(`[Aura Backend] Listening on http://localhost:${port}`);
});
