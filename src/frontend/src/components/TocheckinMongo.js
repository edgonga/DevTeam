const { MongoClient } = require('mongodb');

// Set up MongoDB connection
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('DATABASENAME');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

// Define User schema
const UserSchema = {
  name: String,
  password: String,
};

// Example user registration endpoint
app.post('/register', async (req, res) => {
  const { name, password } = req.body;

  try {
    const db = await connectToDatabase();
    const users = db.collection('users');

    const existingUser = await users.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = { name, password };
    const result = await users.insertOne(newUser);

    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error('Failed to register user', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Example user login endpoint
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const db = await connectToDatabase();
    const users = db.collection('users');

    const user = await users.findOne({ name, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Failed to login', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});
