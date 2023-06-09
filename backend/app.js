const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const dotenv = require("dotenv")

// former build script of json
//"webpack --config ./webpack/webpack-dev.config.js",

dotenv.config()
//console.log(process.env)

// create our express app
const app = express()

const environment = process.env.NODE_ENV
console.log(environment)
const PORT = 0

let uri = 0
try{
   uri = process.env.DB_CONNECTION_STR
}catch (err){
   
}
console.log("URI:")
console.log(uri)

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "MhrGoTestData"
})
.then(() => {
  console.log('MongoDB Connected')
})
.catch(err => console.log(err))

// middleware
app.use(bodyParser.json())
app.use(cors())

//require and use route files
const builderRoute = require("./routes/builder")
// routes
app.use("/builder", builderRoute)
// routes correspond with middleware functions implemented here
//this design seems to couple all functions defined in the backend / API
//to uri addresses...
//have to write custom method
/*
app.get("/", (req,res)=>{
    res.send('backend app connected')
    console.log(`listening at port:${portNum}`)
})*/

app.get("/newBuild", (req, res)=>{
  res.send("newBuild route working")
})
//this method 
app.put("/newBuild:customizedId", (req, res)=>{
  //function must receive all selected configurations from frontend
  //namely: wishlist, a weapon, talisman[]
  
  //also needed from database: allDeco[], allArmor[], 

  //then implement the algorithm //REALY? ALGORITHM IN API??

  //and lastly send back the table Data to display the build
  //making this an Update/PUT method
})

app.use(express.static(path.join(__dirname, '/views')))

app.get('/*', (req, res) =>{
  res.sendFile(path.join(__dirname + '/views', 'index.html'))
})

//start server
let portNum = process.env.PORT || 3000
app.listen(portNum, ()=>{
    console.log(`listening at port:${portNum}`)
}) 