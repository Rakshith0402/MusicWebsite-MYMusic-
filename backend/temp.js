
 
const express= require('express');
const app=express();
const PORT =process.env.port ||8000;
const multer=require('multer')
const Mongoose= require("mongoose");
const cors=require('cors');
Mongoose.connect("mongodb://localhost:27017/logins")

const mongoose=require("mongoose");
const MusicSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    impassword:{
      type:String,
    },
    link:{
      type:String,
    }

    
  });
const Music= mongoose.model("MusicData", MusicSchema);
const userDataSchema = new mongoose.Schema(
  {
    userDataName: {
      type: String,
      required:false,
    },
    email: {
      type: String,
      unique: true,
      required: false,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);
//Create Model
const userData = mongoose.model("UserData", userDataSchema);
  

app.use(cors());
app.use(express.json());

app.post("/Register", async (req, res) => {
  console.log(req.body);
  const { userDataName, email, password } = req.body;
  console.log(req.body.userDataName)
  try {
    const userAdded = await userData.insertMany({
      userDataName: userDataName,
      email: email,
      
    
      password: password,
    });
    console.log(userAdded);
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.messpassword });
  }
});

app.get('/Play',async (req,res)=>{
  await Music.find()
  .then(MusicData=>res.json(MusicData))
  .catch(err=>res.json(err))
 
});


app.post("/login", async (req, res) => {
  try {
      // Find user by email
      const user = await userData.findOne({ email: req.body.email });

      if (!user) {
          return res.status(404).json({ error: "Check Username and passsword" });
      }

      // Check if the provided password matches the stored password
      if (user.password === req.body.password) {
          // Passwords match, send the user data in the response
          return res.json({ userDataName: user.userDataName });
      } else {
          // Passwords do not match
          return res.status(401).json({ error: "Invalid password"
          
         });
          
      }
  } catch (error) {
      // Handle other errors
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
});
 // Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Handle file uploads
app.post('/upload', upload.array('files'), (req, res) => {
  // Files are uploaded, handle them as needed (save to database, etc.)
  const files = req.files.map((file) => ({
    filename: file.filename,
    path: file.path,
  }));
  res.json({ files });
  console.log("successful")
});
 

   









app.listen(PORT,()=>{
    console.log("listening on port 8000 ")
})
