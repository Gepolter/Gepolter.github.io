<template>
    <div class="flex-container">
        <div class="flex-component1">
            <Buildtable/>
            <v-select
                :options="getWishlists"
                label="_name"
                v-model="wList"
            ></v-select>
            <v-select
                :options="getWeapons"
                label="_name"
                v-model="chosenWpn"

            ></v-select>
            <button @click="buildAlgorithm()">Calculate Build</button>
             
        </div>
        
        <div class="flex-component2">
           <SelectionFormWl/>
        </div>
        <div class="flex-component3">
            <SelectionFormTal/>
        </div>
    
    </div>
</template>


<script>
/* eslint-disable */
//import SelectionFormVue from './SelectionForm.vue'
import SelectionFormWl from './SelectionFormWl.vue'
import SelectionFormTal from './SelectionFormTal.vue';
import Buildtable from './BuildTable.vue'

import { mapGetters, mapActions, mapMutations } from 'vuex';

    export default {
        components: { 
        SelectionFormWl,
        SelectionFormTal,
        Buildtable
    },
    computed:{
        
        ...mapGetters({
            getBuild: 'getBuild',
            getBuilds: 'getBuilds',
            getBuildsLength: 'getBuildsLength',
            getSkills: 'getSkills',
            findSkill:'findSkill',
            getTalismans: 'getTalismans',
            getTalismansLength: 'getTalismansLength',
            getWishlists: 'getWishlists',
            getWeapons:'getWeapons',
            getArmor: 'getArmor',
            getSlotArrays: 'getSlotArrays',
            getSlotArray: 'getSlotArray',
            getSlots: 'getSlots',

            //testing
            findWeapon: 'findWeapon'

        })
    },

    

    data() {
        return {
        /*
        componentArray:[
            SelectionFormVue,
            SelectionFormVue,
            SelectionFormVue
        ]
        */
            chosenWpn: this.findWeapon,

            wList: null,
            /*
            build: null,
            headGear: null,
            chestGear: null,
            armsGear: null,
            waistGear: null,
            legsGear: null,
            */
        };
    },

    methods: {



        buildAlgorithm: function(){
            const build ={ 
                buildWpn: null,
                buildArmor:{
                    headGear: null,
                    chestGear: null,
                    armsGear: null,
                    waistGear: null,
                    legsGear: null
                },
                buildTalisman: null
            }
            
            this.setBuilds([])
            this.getBuilds.push(build)
            //Vue.$set(this.getBuilds, 0, build)

            //const branchMemory = []
            //const typeExclusion = []
            const evaluationList = []
            
            //before starting config, use fixed slots -> wpn slots
            this.decoAlgorithm(this.chosenWpn, this.wList, build)
            this.rateGear(this.chosenWpn, this.wList, build)
            //this.rateFlatGear(this.chosenWpn, this.wList, build)
            
            build.buildWpn = this.chosenWpn

            //loop alt builds. elements are added in case of equal ratings
            for(let b = 0; b < this.getBuildsLength; b++){
                
                //while current build b has null elements in armor =at(2), repeat this to select one armorpiece
                while(
                    this.getBuilds[b].buildArmor.headGear == null ||
                    this.getBuilds[b].buildArmor.chestGear == null ||
                    this.getBuilds[b].buildArmor.armsGear == null ||
                    this.getBuilds[b].buildArmor.waistGear == null ||
                    this.getBuilds[b].buildArmor.legsGear == null ||
                    //buildTalisman
                    this.getBuilds[b].buildTalisman === null
                ){
                    //clear eval list, while having references remaining intact
                    evaluationList.length = 0

                    for(let armor in this.getArmor){
                        
                        if(this.isGearTypeFree(this.getArmor[armor], this.getBuilds[b])){
                            evaluationList.push(this.getArmor[armor])
                        }
                    }
                    for(let tal in this.getTalismans){
                        if(this.isGearTypeFree(this.getTalismans[tal], this.getBuilds[b])){
                            evaluationList.push(this.getTalismans[tal])
                        }
                    }


                    //before adding deco skills, set all armor back to base skills
                    //other possibility: new skills get some tag _deco: true
                    //this.getArmor = structuredClone(this.getArmor)
                    
                    //set optimal decos for all gear and rate gear according to wip wl
                    //also recalculate rating based on wip wl
                    
                    for(let gearPiece in evaluationList){
                        this.decoAlgorithm(evaluationList[gearPiece], this.wList, this.getBuilds[b])
                        this.rateGear(evaluationList[gearPiece], this.wList, this.getBuilds[b])
                        //this.rateFlatGear(evaluationList[gearPiece], this.wList, this.getBuilds[b])                        
                    }
                    
                    ////console.log("deco and rating done")
                    
                    ////console.log(evaluationList)
                    ////console.log(evaluationList[gearPiece])
                    
                    
                    //check equal results. if equally good max lvls are there, save all to buildlist
                    //console.log(evaluationList)
                    var highestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._rating > gear._rating ? maxGear : gear)
                    var secondHighestRatedGear = {_rating : 0}
                    //with just one gearpiece left to set, maybe just one tal is left in eval list
                    if(evaluationList.length > 2){
                        evaluationList.splice(evaluationList.indexOf(highestRatedGear),1)
                        secondHighestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._rating > gear._rating ? maxGear : gear)
                    }
                    let plsDontFryCpu = 0
                    while(highestRatedGear._rating == secondHighestRatedGear._rating && evaluationList.length > 3 && plsDontFryCpu < 1){                        
                        //onsole.log(evaluationList)
                        //set highest, save build in builds, remove highest, loop
                        this.setGearInBuild(secondHighestRatedGear, this.getBuilds[b])
                        
                        //store state of build
                        this.getBuilds.push(structuredClone(this.getBuilds[b]))
                        console.log("altBuildset")
                        this.removeGearFromBuild(secondHighestRatedGear, this.getBuilds[b])

                        //remove second highest from eval, set new secondhighest
                        evaluationList.splice(evaluationList.indexOf(secondHighestRatedGear), 1)
                        secondHighestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._rating > gear._rating ? maxGear : gear)

                        plsDontFryCpu ++
                    }
                    //after loops, secondhighest is the last
                    this.setGearInBuild(highestRatedGear, this.getBuilds[b])
                    ////console.log("gearPieceSet")
                    ////console.log(this.getBuilds[b])

                }
                //after build completion, get buildrating
                this.rateBuild(this.getBuilds[b])    
                //this.rateFlatBuild(this.getBuilds[b])    
                   
                console.log("build completed")
                console.log(this.getBuilds.length)
            }

            //after all builds are completed, find the one with max rating
            console.log(this.getBuilds.reduce((maxBuild, build) => maxBuild._rating > build._rating ? maxBuild : build))
            return this.getBuilds.reduce((maxBuild, build) => maxBuild._rating > build._rating ? maxBuild : build)
        },

        isGearTypeFree: function(gear, build){
            ////console.log(gear)
            ////console.log(build)
            switch(gear._type_id){
                case "0":
                    return build.buildArmor.headGear != null ? false : true
                    
                case "1":
                    return build.buildArmor.chestGear != null ? false : true
                    
                case "2":
                    return build.buildArmor.armsGear != null ? false : true
                    
                case "3":
                    return build.buildArmor.waistGear != null ? false : true
                    
                case "4":
                    return build.buildArmor.legsGear != null ? false : true
                    
                case "5":
                    ////console.log(return build.buildTalisman != null)
                    return build.buildTalisman != null ? false : true
                    
                case "6":
                    return build.buildWpn != null ? false : true
                    
            }
        },
        rateGear: function(gear, wishlist, build){
            //rate gear according to how many OPEN skilllvls of wl are fulfilled
            //TODO optimize algorithm by multiplying rating with 1/prio or something
            gear._rating = 0
            for(let skillIndex = 0; skillIndex < gear._skill_array.length; skillIndex ++){
                if(wishlist._skillSelectionArray.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name)){
                    var wishlistSkill = wishlist._skillSelectionArray.find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)
                    //only if totalgearskills dont exceed selectedlvl
                    if(gear._skill_array[skillIndex].hasOwnProperty('_selectedLvl')){
                        if(wishlistSkill._selectedLvl -
                            this.totalSkillLevels(build, gear).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl >= 0
                        ){
                            gear._rating += gear._skill_array[skillIndex]._selectedLvl * (1/wishlistSkill._prio)
                        }else{
                            gear._rating += (gear._skill_array[skillIndex]._selectedLvl + 
                            wishlistSkill._selectedLvl -
                            this.totalSkillLevels(build, gear).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl) * (1/wishlistSkill._prio)
                        }
                    }else{
                       if(this.totalSkillLevels(build, gear).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl <= 
                           wishlistSkill._selectedLvl
                        ){
                            gear._rating += 1 * (1/wishlistSkill._prio)
                        }//else needed bc totalskilllevels calculates ALL not just CURRENT skill. later duplicates not coutned 
                    }
                }
            }
        },
        //control function
        rateFlatGear: function(gear, wishlist, build){
            //rate gear according to how many OPEN skilllvls of wl are fulfilled
            
            gear._flat_rating = 0
            for(let skillIndex = 0; skillIndex < gear._skill_array.length; skillIndex ++){
                if(wishlist._skillSelectionArray.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name)){
                    var wishlistSkill = wishlist._skillSelectionArray.find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)
                    //only if totalgearskills dont exceed selectedlvl
                    if(gear._skill_array[skillIndex].hasOwnProperty('_selectedLvl')){
                        if(wishlistSkill._selectedLvl -
                            this.totalSkillLevels(build, gear).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl >= 0
                        ){
                            gear._flat_rating += gear._skill_array[skillIndex]._selectedLvl 
                        }else{
                            gear._flat_rating += (gear._skill_array[skillIndex]._selectedLvl + 
                            wishlistSkill._selectedLvl -
                            this.totalSkillLevels(build, gear).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl) 
                        }
                    }else{
                       if(this.totalSkillLevels(build, gear).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl <= 
                           wishlistSkill._selectedLvl
                        ){
                            gear._flat_rating += 1 
                        }//else needed bc totalskilllevels calculates ALL not just CURRENT skill. later duplicates not coutned 
                    }
                }
            }
        },
        /*
        decoArrayConfig: function(slots){
            const decoObject = Object.values(slots)
                .sort()
                .reverse()
                .reduce((accumulator, key) => {
                    accumulator[key] = slots [key]
                    return accumulator
                }, {})
            return decoObject

        },
        */
        rateBuild: function(build){
            build._rating = 0

            var buildRating = build.buildWpn._rating
            buildRating += build.buildArmor.headGear._rating
            buildRating += build.buildArmor.chestGear._rating
            buildRating += build.buildArmor.armsGear._rating
            buildRating += build.buildArmor.waistGear._rating
            buildRating += build.buildArmor.legsGear._rating
            buildRating += build.buildTalisman._rating

            build._rating = buildRating
        },
        rateFlatBuild: function(build){
            build._flat_rating = 0

            var buildRating = build.buildWpn._flat_rating
            buildRating += build.buildArmor.headGear._flat_rating
            buildRating += build.buildArmor.chestGear._flat_rating
            buildRating += build.buildArmor.armsGear._flat_rating
            buildRating += build.buildArmor.waistGear._flat_rating
            buildRating += build.buildArmor.legsGear._flat_rating
            buildRating += build.buildTalisman._flat_rating

            build._flat_rating = buildRating
        },

        clearDecos: function(gear){
            for(let i = gear._skill_array.length -1; i >= 0; i--){
                if(gear._skill_array[i]._is_deco === true){
                    gear._skill_array.splice(i, 1)
                }
            }
        },
        decoAlgorithm: function(gear, wishlist, build) {
            this.clearDecos(gear)

            //console.log(gear)
            //get decoArray of armor
            var decoArray = null
            if(gear.hasOwnProperty('_slot_array_name')){
                if(gear._slot_array_name == ""){return}
                decoArray = this.getSlotArray(gear._slot_array_name)
                ////console.log("armor deco array")
                ////console.log(decoArray)
            }else if(gear.hasOwnProperty('_slots')){
                if(gear._slots == ""){return}
                decoArray = {_slots: gear._slots}
                ////console.log("tal deco array")
                ////console.log(decoArray)
            }
            //testing!!
            //build['buildTalisman'] = this.getTalismans[0]
            //build.buildArmor.armsGear = this.getArmor[2]
            

           //loop gearslots big -> small
            for(let gearSlot in decoArray._slots){
                let repeatBcNoFit = true
                //a=prio
                for(let prio = 1; repeatBcNoFit === true && prio <= wishlist._skillSelectionArray.length; prio++){
                    //var wlSkill = wishlist._skillSelectionArray.find(skill => skill._prio === prio)
                    //var buildSkill = this.totalSkillLevels(build, gear).find(skill => skill._name === wlSkill._name)

                    OuterLoop:
                    for(let wlSkill in wishlist._skillSelectionArray){
                        //is prio = a
                        if(prio === wishlist._skillSelectionArray[wlSkill]._prio){
                            
                            //check if overall skills of current gear already fullfill wl condition
                            //TODO better find wlSkill
                            
                            var currentSkillLevels = this.totalSkillLevels(build, gear)
                            if(currentSkillLevels.some(skill => skill._name === wishlist._skillSelectionArray[wlSkill]._name)){
                                if(wishlist._skillSelectionArray[wlSkill]._selectedLvl <= currentSkillLevels.find(skill => skill._name === wishlist._skillSelectionArray[wlSkill]._name)._lvl){
                                    break OuterLoop
                                }
                            }
                            //console.log(currentSkillLevels.find(skill => skill._name === wishlist._skillSelectionArray[wlSkill]._name))

                            /*
                            var currentSkillLevels = this.totalSkillLevels(build, gear)
                            for(let buildSkill in currentSkillLevels){
                                if(
                                    wishlist._skillSelectionArray[wlSkill]._name == currentSkillLevels[buildSkill]._name && //buildSkill._name &&//
                                    wishlist._skillSelectionArray[wlSkill]._selectedLvl <= currentSkillLevels[buildSkill]._lvl //buildSkill._lvl //
                                    //maxlvl criteria not needed. selectedLvl cant exceed maxlvl anyway
                                    ){
                                        //console.log("breaks bc filled")
                                        //console.log(wishlist._skillSelectionArray[wlSkill]._name)
                                        //console.log(wishlist._skillSelectionArray)
                                        break OuterLoop

                                    }
                            }
                            */
                            //check if skill fits slotLvl of gearSlot
                            if(this.findSkill(wishlist._skillSelectionArray[wlSkill]._name)._slot_id <= decoArray._slots[gearSlot]){
                                //if it fits, set deco on armor -> next slot 
                                
                                gear._skill_array.push(
                                    {
                                        _skill_name: wishlist._skillSelectionArray[wlSkill]._name,
                                        _is_deco: true
                                    }
                                )
                                ////console.log("deco set")
                                ////console.log(gear)

                                repeatBcNoFit = false
                            }else {
                                repeatBcNoFit = true
                            }
                        }

                    }
                }
            }
            //console.log(gear)
            //console.log("decoAlgDone")
        },

        totalSkillLevels: function(build, gear){
            const addedSkillList = []
            
            //set gear to be tested
            this.setGearInBuild(gear, build)
            //build Talisman
            //console.log(gear)
            //console.log(build)
            if(build.buildTalisman != null){
                //check if deco or native
                for(let i = 0; i < build.buildTalisman._skill_array.length; i++){
                    //if skill present, + selected_lvl to skill lvl
                    if(build.buildTalisman._skill_array[i]._is_deco == true){
                        ////console.log("talisman deco found")
                        if(addedSkillList.some(skill => skill._name === build.buildTalisman._skill_array[i]._skill_name)){
                            addedSkillList.find(skill => skill._name === build.buildTalisman._skill_array[i]._skill_name)._lvl =+ 1
                            
                        }else { //else add skill + lvl element = 1
                            addedSkillList[addedSkillList.length] = this.findSkill(build.buildTalisman._skill_array[i]._skill_name)
                            addedSkillList[addedSkillList.length-1]._lvl = 1        
                        }
                    }else{
                        if(addedSkillList.some(skill => skill._name === build.buildTalisman._skill_array[i]._skill_name)){
                            addedSkillList.find(skill => skill._name === build.buildTalisman._skill_array[i]._skill_name)._lvl =+ build.buildTalisman._skill_array[i]._selectedLvl
                        }else { //else add skill + lvl element = 1
                            addedSkillList[addedSkillList.length] = this.findSkill(build.buildTalisman._skill_array[i]._skill_name)
                            addedSkillList[addedSkillList.length-1]._lvl = build.buildTalisman._skill_array[i]._selectedLvl
                        }
                        ////console.log("native tal val added")
                        ////console.log(build.buildTalisman._skill_array)   
                        ////console.log(addedSkillList)              
                        
                    }
                }
            }
            //buildWeapon
            if(build.buildWpn != null){
                for(let i = 0; i < build.buildWpn._skill_array.length; i++){
                    if(addedSkillList.some(skill => skill._name === build.buildWpn._skill_array[i]._skill_name)){
                        addedSkillList.find(skill => skill._name === build.buildWpn._skill_array[i]._skill_name)._lvl += 1
                    }else {
                        addedSkillList[addedSkillList.length] = this.findSkill(build.buildWpn._skill_array[i]._skill_name)
                        addedSkillList[addedSkillList.length-1]._lvl = 1//as many entries as lvls -> build.buildWpn._skill_array[i]._lvl
                    }
                }
            }
            //for each armorpiece
            for(let armorPiece in build.buildArmor){
                if(build.buildArmor[armorPiece] != null){
                    for(let i = 0; i < build.buildArmor[armorPiece]._skill_array.length; i++){
                        if(Object.keys(build.buildArmor[armorPiece]._skill_array[i]).length !== 0){
                            if(addedSkillList.some(skill => skill._name === build.buildArmor[armorPiece]._skill_array[i]._skill_name)){
                                addedSkillList.find(skill => skill._name === build.buildArmor[armorPiece]._skill_array[i]._skill_name)._lvl += 1
                            }else {
                                //TESTING REMOVE LATER when all skills are in db
                                if(this.findSkill(build.buildArmor[armorPiece]._skill_array[i]._skill_name) != null){
                                    addedSkillList[addedSkillList.length] = this.findSkill(build.buildArmor[armorPiece]._skill_array[i]._skill_name)
                                    addedSkillList[addedSkillList.length-1]._lvl = 1//as many entries as lvls -> build.buildArmor[i]._skill_array[i]._lvl
                                }
                            }
                        }
                    }
                }
            }
            this.removeGearFromBuild(gear, build)
            return addedSkillList
        },
        setGearInBuild: function(gear, build){
            switch(gear._type_id){
                case "0":
                    build.buildArmor.headGear = gear
                    break
                case "1":
                    build.buildArmor.chestGear = gear
                    break
                case "2":
                    build.buildArmor.armsGear = gear
                    break
                case "3":
                    build.buildArmor.waistGear = gear
                    break
                case "4":
                    build.buildArmor.legsGear = gear
                    break
                case "5":
                    build.buildTalisman = gear
                    break
                case "6":
                    build.buildWpn = gear
                    break
            }
        },
        removeGearFromBuild: function(gear, build){
            switch(gear._type_id){
                case "0":
                    build.buildArmor.headGear = null
                    break
                case "1":
                    build.buildArmor.chestGear = null
                    break
                case "2":
                    build.buildArmor.armsGear = null
                    break
                case "3":
                    build.buildArmor.waistGear = null
                    break
                case "4":
                    build.buildArmor.legsGear = null
                    break
                case "5":
                    build.buildTalisman = null
                    break
                case "6":
                    build.buildWpn = null
                    break
            }
        },
        ...mapActions({
            fetchSkills: 'fetchSkills',
            fetchArmor: 'fetchArmor',
            fetchWeapons: 'fetchWeapons',
            //fetchGearTypes: 'fetchGearTypes',
            fetchSlots: 'fetchSlots',
            fetchSlotArrays: 'fetchSlotArrays',
            setBuild: 'setBuild',
            setBuilds: 'setBuilds',
        }),
        ...mapMutations([
            'ADD_TAL',
            'DELETE_TAL',
            'SET_BUILDS'
        ]),    

    },
    created(){
        this.fetchArmor()
        this.fetchWeapons()
        //this.fetchGearTypes()
        this.fetchSlots()
        this.fetchSlotArrays()
    }
}
</script>

<style>
    @media only screen and (max-width: 768px){
        .flex-container{flex-direction: column-reverse;}
    }
    .flex-container{
        display: flex;
        

    }
    .flex-component1{
        flex:3;
        padding-left: 1em;
        padding-right: 1em;
    }
    .flex-component2{
        flex:1;
        padding-left: 2%;
        padding-right: 2%;
    }
    .flex-component3{
        flex:1;
        padding-left: 2%;
        padding-right: 2%;
    }
</style>