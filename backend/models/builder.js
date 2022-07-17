//this can be used to post new entries to database
//is this wanted yet?

const mongoose = require('mongoose')

const talismanSchema = new mongoose.Schema({
    "_id": String,
    "_name": String,
    "_skillArray":[
        
    ],
    "_slotArrays_id":String
})
const Talisman = mongoose.model('Talisman', talismanSchema)
module.exports = Talisman

const wishlistSchema = new mongoose.Schema({
        "_id": String,
        "_name":String,
        "_skillArray":[
            {type:String}
        ],
        "_prios":[
            Number
        ],
        "_wantedLvls":[
            {type:Number}
        ]
})
const Wishlist = mongoose.model("Wishlist", wishlistSchema)
module.exports = Wishlist

const skillSchema = new mongoose.Schema({
    "_id": String,
    "_name": String,
    "_maxLvl": Number,
    "_deco_array":Array
}/*{collection: 'skills'}*/)
const Skill = mongoose.model("Skill", skillSchema, "skills_master_rank")
module.exports = Skill

const armorSchema = new mongoose.Schema({
    "_id": String,
    "_set": String,
    "_type_id": String,
    "_skill_array": [],
    "_slot_array_name": String

})
const Armor = mongoose.model("Armor", armorSchema, 'armor_master_rank')
module.exports = Armor

//trying to rewrite algorithm in a way, that no deco objects are needed
//instead, skills will be applied directly, when fitting slots are available in gear
/*
const decoSchema = new mongoose.Schema({
    "_id": String,
    "_name": String,
    "_slot_id": String,
})
const Deco = mongoose.model("Deco", decoSchema)
modlule.exports = Deco
*/
const weaponSchema = new mongoose.Schema({
    "_id": String,
    "_name": String,
    _slot_array_name: String,
    _skill_array: Array,
    _type_id: String

})
const Weapon = mongoose.model("weapon", weaponSchema)
module.exports = Weapon

const gearTypeSchema = new mongoose.Schema({
    "_id": String,
    "_name": String
})
const GearType = mongoose.model("gearType", gearTypeSchema)
module.exports = GearType

const slotSchema = new mongoose.Schema({
    "_id": String,
    "_lvl": Number
})
const Slot = mongoose.model("slot", slotSchema)
module.exports = Slot

const slotArraySchema = new mongoose.Schema({
    "_id": String,
    "_name": String,
    "_slots": Array   
})
const SlotArray = mongoose.model("slotArray", slotArraySchema, "slotArrays")
module.exports = {Talisman, Wishlist, Armor, Skill, Weapon, Slot, SlotArray}