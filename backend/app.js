//this is the express API
//here, the connection to the db is established
//and functions are provided that the frontend may consume via http requests
/*
CRUD    HTTP
Create  POST 
Read    GET
Update  PUT
Delete  DELETE

*/

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

//require and use route files
const builderRoute = require("./routes/builder")


//require("dotenv").config({ path: `.env.${process.env.MONGO_ENV}` })
const uri = process.env.MONGO_URL
//const uri = "mongodb+srv://Gepolter:KrummeMhrGoDB239$@mhrgodb.h9kql.mongodb.net/MhrGoTestData?retryWrites=true&w=majority"
//mongodb+srv://Gepolter:<password>@mhrgodb.h9kql.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch(err => console.log(err))

// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(cors())

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



//start server
let portNum = process.env.PORT
app.listen(portNum, ()=>{
    console.log(`listening at port:${portNum}`)
}) 