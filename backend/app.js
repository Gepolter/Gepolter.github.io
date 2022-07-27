const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")


// create our express app
const app = express()

const environment = process.env.NODE_ENV
console.log(environment)

let uri = 0
try{
   uri = DB_CONNECTION_STR
}catch (err){
   uri = 'mongodb+srv://Gepolter:KrummeMhrGoDB239$@mhrgodb.h9kql.mongodb.net/MhrGoTestData?retryWrites=true&w=majority'
}
//const uri = process.env.MONGO_URL

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

app.get("/", (req,res)=>{
    res.send("backend app connected")
})

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

app.use(express.static(path.join(__dirname, '../views')))
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname + '/..views/index.html'))
})

//start server
let portNum = PORT || 3000
app.listen(portNum, ()=>{
    console.log(`listening at port:${portNum}`)
}) 