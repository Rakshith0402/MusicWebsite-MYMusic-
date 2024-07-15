const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost:27017/logins', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Music schema and model
const MusicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  impassword: { type: String },
  link: { type: String },
});
const Music = mongoose.model('MusicData', MusicSchema);

// Define User schema and model
const userDataSchema = new mongoose.Schema(
  {
    userDataName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: {
      type: String,
      default: 'user', // Default role is 'user'
    },
  },
  { timestamps: true }
);
const userData = mongoose.model('UserData', userDataSchema);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/Register', async (req, res) => {
  const { userDataName, email, password, role } = req.body;
  try {
    const userAdded = await userData.create({ userDataName, email, password, role });
    res.status(201).json(userAdded);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await userData.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: 'Check Username and password' });
    }
    if (user.password === req.body.password) {
      return res.json({ userDataName: user.userDataName, role: user.role }); // Include isAdmin
    } else {
      return res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/Play', async (req, res) => {
  try {
    const musicData = await Music.find();
    res.json(musicData);
  } catch (err) {
    res.json(err);
  }
});

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
  const { name, artist } = req.body;
  const file = req.file;
  const newMusic = new Music({
    name,
    artist,
    link: file.filename,
  });

  try {
    await newMusic.save();
    res.json({ file, newMusic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
