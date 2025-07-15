const express =  require('express')
const path = require('path')
const multer = require('multer')
const app = express()
const port = 1234
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'frontend')))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
   let uniqueName =  Math.floor(Math.random())*10000 + "ghfdweghf"
    cb(null, uniqueName+ path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

app.get('/',(req,res)=>{
   res.sendFile(path.join(__dirname,'frontend','index.js'))
})

app.post('/profile',upload.single('avatar') ,(req,res)=>{
    res.send("file uploaded")
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    
})


