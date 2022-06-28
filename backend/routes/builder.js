const express = require('express')
const router = express.Router()
const uuid = require("uuid")
const {Skill, Armor, Weapon, Slot, SlotArray} = require('../models/builder')
/*
const Armor = require('../models/builder')
const Weapon = require('../models/builder')
const Slot = require('../models/builder')
const SlotArray = require('../models/builder')

//const Wishlist = require('../models/builder')
*/

console.log(uuid.v4)


// all routes

router.get('/', (req,res)=>{
    res.send("Our builds route")
})

//getter routes
router.get("/skillsAll", function(req, res) {
    Skill.find({}, function(err, skills){
        var skillMap = []
        skills.forEach(function(skill){
            skillMap[skill._id] = skill
        })
        res.send(skillMap)
    })
})

router.get("/armorAll", function(req, res) {
    Armor.find({}, function(err, armor){
        var armorMap = []
        console.log(armor)
        armor.forEach(function(armor){
            armorMap[armor._id] = armor
        })
        res.send(armorMap)
    })
})
router.get("/weaponsAll", function(req, res) {
    Weapon.find({}, function(err, weapons){
        var weaponMap = []

        weapons.forEach(function(weapon){
            weaponMap[weapon._id] = weapon
        })
        res.send(weaponMap)
    })
})
router.get("/slotsAll", function(req, res) {
    Slot.find({}, function(err, slots){
        var slotMap = []

        slots.forEach(function(slot){
            slotMap[slot._id] = slot
        })
        res.send(slotMap)
    })
})
//not working...
router.get("/slotArraysAll", function(req, res) {
    SlotArray.find({}, function(err, slotArrays){
        var slotArrayMap = []
        console.log(slotArrays)
        slotArrays.forEach(function(slotArray){
            
            console.log(slotArray._id)
            slotArrayMap[slotArray._id] = slotArray
            //console.log(slotArrayMap[slotArray._id])
            //console.log(slotArrayMap)
        })
        res.send(slotArrayMap)
        
    })
})


module.exports = router
/*
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