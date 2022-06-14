//this can be used to post new entries to database
//is this wanted yet?

const mongoose = require('mongoose')

const talismanSchema = new mongoose.Schema({
    "_id": String,
    "_name": String,
    "_skillArray":[
        {String}
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
    "_slot_id": String,
    "_maxLvl": Number
})
const Skill = mongoose.model("Skill", skillSchema)
module.exports = Skill

