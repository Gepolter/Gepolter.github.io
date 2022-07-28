const express = require('express')
const router = express.Router()
//const uuid = require("uuid")
const {Skill, Armor, Weapon, Slot, SlotArray} = require('../models/builder')

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
        
        slotArrays.forEach(function(slotArray){
            slotArrayMap[slotArray._id] = slotArray
        })
        res.send(slotArrayMap)
        
    })
})


module.exports = router
