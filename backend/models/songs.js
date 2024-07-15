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
    image:{
      type:String,
    },
    link:{
      type:String,
    }

    
  });
module.exports = mongoose.model("MusicData", MusicSchema);
  