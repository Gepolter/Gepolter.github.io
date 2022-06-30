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
            getSlots: 'getSlots'

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
            chosenWpn: null,

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
            
            /*
            var headGear = null
            var chestGear = null
            var armsGear = null
            var waistGear = null
            var legsGear = null
            var buildTalisman = null
                        
            const buildArmor = [
                [
                    {headGear: null},
                    {chestGear: null},
                    {armsGear: null},
                    {waistGear: null},
                    {legsGear: null}
                ],
            ]

            buildTalisman,
            this.chosenWpn
            */
            var armorCopy = structuredClone(this.getArmor)
            const build ={ 
                buildWpn: this.chosenWpn,
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

            const branchMemory = []
            const typeExclusion = []
            const evaluationList = []
            
            const wipListList = [structuredClone(this.wList)]
            var wlCounter = 0
            
            //loop alt builds. elements are added in case of equal ratings
            for(let b = 0; b < this.getBuildsLength; b++){
                if(branchMemory.length !== 0){
                    for (let s in branchMemory){
                        for (let i = 0; i < evaluationList.length(); i++){
                            if(s === evaluationList.at(i).at(0)){
                                evaluationList.splice(i)
                                break
                            }   
                        }
                    }
                }
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
                        evaluationList.push(this.getArmor[armor])
                    }
                    for(let tal in this.getTalismans){
                        evaluationList.push(this.getTalismans[tal])
                    }
                    //FILTER INSTEAD!!!
                    //var filteredArmor = this.getArmor.filter(armor => armor._type_id != )
                    //exclude set gearTypes  THESE ARE STRINGS FROM 1-7
                    if(typeExclusion.length !== 0){
                        for(let s in typeExclusion){
                            for(let i = evaluationList.length()-1; i > -1; i--){
                                if(s === evaluationList[i]._type_id){
                                    evaluationList.splice(i)
                                }
                            }
                        }
                    }

                    //before adding deco skills, set all armor back to base skills
                    //other possibility: new skills get some tag _deco: true
                    //this.getArmor = structuredClone(this.getArmor)
                    
                    //set optimal decos for all gear and rate gear according to wip wl
                    //also recalculate rating based on wip wl
                    for(let armor in this.getArmor){
                        //then the algorithm adds as many skills from wl, as are fitting onto slot array 
                        this.decoAlgorithm(this.getArmor[armor], wipListList[wlCounter], this.getBuilds[b])
                        this.rateGear(this.getArmor[armor], wipListList[wlCounter])
                    }
                    console.log("armor done")
                    for(let talisman in this.getTalismans){
                        this.decoAlgorithm(this.getTalismans[talisman], wipListList[wlCounter], this.getBuilds[b])
                        this.rateGear(this.getTalismans[talisman], wipListList[wlCounter])                        
                    }
                    console.log("tal done")

                    //console.log(this.getBuilds)
                    
                    //check equal results. if equally good max lvls are there, save all to buildlist
                    var highestRatedGear
                    var secondHighestRatedGear
                    do{
                        highestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._rating > gear._rating ? maxGear : gear)
                        evaluationList.splice(evaluationList.indexOf(highestRatedGear))
                        secondHighestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._rating > gear._rating ? maxGear : gear)                            
                        console.log(secondHighestRatedGear)

                        




                    }
                    while(highestRatedGear._rating == secondHighestRatedGear._rating)
                    

                    this.bearkfunction()


                }
            }
        },

        rateGear: function(gear, wishlist){
            //rate gear according to how many skilllvls of wl are fulfilled
            //TODO optimize algorithm by multiplying rating with 1/prio or something
            gear._rating = 0
            
            //if not talisman add skills up
            if(gear._skill_array.hasOwnProperty('_selectedLvl')){
                for(let skillIndex = 0; skillIndex < gear._skill_array.length; skillIndex ++){
                    if(wishlist._skillSelectionArray.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name)){
                        gear._rating += gear._skill_array[skillIndex]._selectedLvl
                    }
                }
                
            }else{
                for(let skillIndex = 0; skillIndex < gear._skill_array.length; skillIndex ++){
                    if(wishlist._skillSelectionArray.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name)){
                        gear._rating += 1
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
        clearDecos: function(gear){
            for(let skill in gear._skill_array){
                if(gear._skill_array[skill]._is_deco === true){
                    gear._skill_array.splice(gear._skill_array[skill])
                }
            }
        },
        decoAlgorithm: function(gear, wishlist, build) {
            this.clearDecos(gear)

            //get decoArray of armor
            var decoArray = null
            if(gear.hasOwnProperty('_slot_array_name')){
                decoArray = this.getSlotArray(gear._slot_array_name)
                //console.log("armor deco array")
                //console.log(decoArray)
            }else if(gear.hasOwnProperty('_slots')){
                decoArray = {_slots: gear._slots}
                //console.log("tal deco array")
                //console.log(decoArray)
            }
            //testing!!
            build['buildTalisman'] = this.getTalismans[0]
            build.buildArmor.armsGear = this.getArmor[2]
            

           //loop gearslots big -> small
            for(let gearSlot in decoArray._slots){
                let repeatBcNoFit = true
                //a=prio
                for(let prio = 1; repeatBcNoFit === true && prio <= wishlist._skillSelectionArray.length; prio++){
                    OuterLoop:
                    //l=skill
                    for(let wlSkill in wishlist._skillSelectionArray){
                        //is prio = a
                        if(prio === wishlist._skillSelectionArray[wlSkill]._prio){
                            
                            //check if overall skills of current gear already fullfill wl condition
                            //better find skill l
                            for(let buildSkill in this.totalSkillLevels(build, gear)){
                                if(
                                    wishlist._skillSelectionArray[wlSkill]._name == buildSkill._name &&
                                    wishlist._skillSelectionArray[wlSkill]._selectedLvl <= buildSkill._lvl
                                    //maxlvl criteria not needed. selectedLvl cant exceed maxlvl anyway
                                    ){
                                        console.log("breaks bc filled")
                                        break OuterLoop

                                    }
                            }
                            
                            //check if skill fits slotLvl of gearSlot
                            if(this.findSkill(wishlist._skillSelectionArray[wlSkill]._name)._slot_id <= decoArray._slots[gearSlot]){
                                //if it fits, set deco on armor -> next slot 
                                gear._skill_array.push(
                                    {
                                        
                                        _skill_name: wishlist._skillSelectionArray[wlSkill]._name,
                                        _is_deco: true
                                    }
                                )
                                //console.log("deco set")
                                //console.log(gear)

                                repeatBcNoFit = false
                                break
                            }else {
                                repeatBcNoFit = true
                                break
                            }
                        }

                    }
                }
            }
            console.log("decoAlgDone")
        },

        totalSkillLevels: function(build, gear){
            const addedSkillList = []
            
            //set gear to be tested
            this.setGearInBuild(gear, build)

            //build Talisman
            if(build.buildTalisman != null){
                //tal skill length
                for(let i = 0; i < build.buildTalisman._skill_array.length; i++){
                    //if skill present, +1 to skill lvl
                    if(addedSkillList.some(skill => skill._name === build.buildTalisman._skill_array[i]._skill_name)){
                        addedSkillList.find(({_name}) => _name === build.buildTalisman._skill_array[i]._skill_name)._lvl ++
                    }else { //else add skill + lvl element = 1
                        addedSkillList[i] = this.findSkill(build.buildTalisman._skill_array[i]._skill_name)
                        addedSkillList[i]._lvl = build.buildTalisman._skill_array[i]._selectedLvl
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
    
                                addedSkillList[addedSkillList.length] = this.findSkill(build.buildArmor[armorPiece]._skill_array[i]._skill_name)
                                addedSkillList[addedSkillList.length-1]._lvl = 1//as many entries as lvls -> build.buildArmor[i]._skill_array[i]._lvl
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
                    build.buildTalsiman = gear
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
                    build.buildTalsiman = null
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