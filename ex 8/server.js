const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ex8';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mongoose setup
mongoose.set('strictQuery', true);

const itemSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, default: null }
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// Normalize JSON output to keep `id` like the previous SQLite API
itemSchema.set('toJSON', {
	versionKey: false,
	transform: (doc, ret) => {
		ret.id = String(ret._id);
		delete ret._id;
		return ret;
	}
});

const Item = mongoose.model('Item', itemSchema);

// API routes
app.get('/api/items', async (req, res) => {
	try {
		const items = await Item.find().sort({ _id: -1 });
		res.json(items);
	} catch (err) {
		res.status(500).json({ error: 'Database error' });
	}
});

app.get('/api/items/:id', async (req, res) => {
	try {
		const item = await Item.findById(req.params.id);
		if (!item) return res.status(404).json({ error: 'Not found' });
		res.json(item);
	} catch (err) {
		res.status(500).json({ error: 'Database error' });
	}
});

app.post('/api/items', async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name || typeof name !== 'string') {
			return res.status(400).json({ error: 'Name is required' });
		}
		const created = await Item.create({ name, description: description || null });
		res.status(201).json(created);
	} catch (err) {
		res.status(500).json({ error: 'Database error' });
	}
});

app.put('/api/items/:id', async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name || typeof name !== 'string') {
			return res.status(400).json({ error: 'Name is required' });
		}
		const updated = await Item.findByIdAndUpdate(
			req.params.id,
			{ name, description: description || null },
			{ new: true, runValidators: true }
		);
		if (!updated) return res.status(404).json({ error: 'Not found' });
		res.json(updated);
	} catch (err) {
		res.status(500).json({ error: 'Database error' });
	}
});

app.delete('/api/items/:id', async (req, res) => {
	try {
		const deleted = await Item.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).json({ error: 'Not found' });
		res.status(204).send();
	} catch (err) {
		res.status(500).json({ error: 'Database error' });
	}
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

async function start() {
	try {
		await mongoose.connect(MONGODB_URI, { dbName: new URL(MONGODB_URI).pathname.replace(/^\//, '') || undefined });
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('MongoDB connection failed:', err.message);
		// Continue to start server so we can return helpful errors, but CRUD will 500
	}

	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
}

start();



