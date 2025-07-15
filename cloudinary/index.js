const express = require("express");
const path = require("path");
const multer = require('multer')
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const app = express();

const port = 2323;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend")));

cloudinary.config({
  cloud_name: "dshb4uvpy",
  api_key: "311538989558635",
  api_secret: "eh4MM81QGGhpL9J77LMuDZFsCVI",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "upload",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});


app.post('/upload',upload.single("cloud"),(req,res)=>{
    res.send("file uploaded")
})
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
