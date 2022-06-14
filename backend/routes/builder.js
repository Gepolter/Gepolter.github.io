const express = require('express')
const router = express.Router()
const uuid = require("uuid")
const Wishlist = require('../models/builder')
const Skill = require('../models/builder')

console.log(uuid.v4)


// all routes

router.get('/', (req,res)=>{
    res.send("Our builds route")
})

//get all skills
router.get("/skillsAll", function(req, res) {
    Skill.find({}, function(err, skills){
        var skillMap = []

        skills.forEach(function(skill){
            skillMap[skill._id] = skill
        })
        res.send(skillMap)
    })
})


//new wishlist upon confirming selectionObjSets
//async bcs db operations can take some time
router.post("/newWl", async (req, res, next)=>{
    //function
    let {_id, _name,_skillArray,_prios,_wantedLvls} = req.body
    try{
        let wishlist = new Wishlist({
            _id,
            _name,
            _skillArray,
            _prios,
            _wantedLvls        
        })
        let newWishlist = await wishlist.save()
        console.log("success wl")
        res.status(200).json({
            status: "Success",
            data: wishlist,
            
        })
    }catch(err){
        console.log(err)
        next(err)
    }
})

router.post("/newTal", async (req, res)=>{
    //function
    
})

router.post("/newBuild", (req, res)=>{
    //function
})

/*
example use of schema
const Thing = mongoose.model('Thing', schema);

const m = new Thing;
m.name = 'Statue of Liberty';
*/
module.exports = router