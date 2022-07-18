<template>
    <div class="flex-container">
        <div class="flex-component1">

            <div class="buildOptions">
                <label>Select wishlist:</label>
                <div style="width: 25%">
                    <v-select
                        :options="getWishlists"
                        label="_name"
                        v-model="wList"
                        width="50px"
                    ></v-select>
                </div>
                <label>Select weapon slots</label>
                <div class="slotSelection" style="width:25%">
                    <SlotItemBtn @send="setWpnSlotLvl(findWeapon, 0, $event)"/>
                    <SlotItemBtn @send="setWpnSlotLvl(findWeapon, 1, $event)"/>
                    <SlotItemBtn @send="setWpnSlotLvl(findWeapon, 2, $event)"/>                     
                </div>
                <!--div style="width:25%">
                    <v-select
                        :options="getWeapons"
                        label="_name"
                        v-model="findWpn"
                    ></v-select>
                </div-->
            </div>
            <div class="buildTable">
                <Buildtable/>
            </div>
            <div>
                <button @click="buildAlgorithm()" style="width:100%">Calculate build</button>
            </div>
             
        </div>
        
        <div class="flex-component2">
           <SelectionFormWl/>
        </div>
        <div class="flex-component3">
            <SelectionFormTal/>
        </div>
    
    </div>
    <LoadingScreen v-if="isLoading"/>
</template>


<script>
/* eslint-disable */
//https://developer.paypal.com/api/nvp-soap/paypal-payments-standard/integration-guide/donate-step-1/
//https://makeshiftinsights.com/blog/adsense-vue-js-app/#:~:text=First%2C%20install%20the%20vue-google-adsensepackage%20to%20your%20project%20as,page%29%3A%20npm%20install%20vue-script2%20vue-google-adsense%20--save%20Step%202.
//https://support.google.com/adsense/answer/9274025?hl=en&visit_id=637932184737370532-2653476057&rd=1
//https://dev.to/dd8888/how-to-create-a-simple-loading-screen-using-vue-4h7m
//https://weekendprojects.dev/posts/css-rotate-animations-examples/
//https://jsfiddle.net/78kt1p5j/1/
//http://test-a-tag.com/
//import SelectionFormVue from './SelectionForm.vue'
import SelectionFormWl from './SelectionFormWl.vue'
import SelectionFormTal from './SelectionFormTal.vue'
import Buildtable from './BuildTable.vue'
import SlotItemBtn from './SlotItemBtn.vue'


import { mapGetters, mapActions, mapMutations } from 'vuex'
import LoadingScreen from './LoadingScreen.vue'

    export default {
        components: {
        SelectionFormWl,
        SelectionFormTal,
        Buildtable,
        SlotItemBtn,
        LoadingScreen
    },
    computed:{
        
        ...mapGetters({
            getBuild: 'getBuild',
            getBuildSkills: 'getBuildSkills',
            getBuildSkillsLength: 'getBuildSkillsLength',
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
            
            wList: null,
            isLoading: false
        };
    },

    methods: {
        buildAlgorithm: function(){
            const configWpn = this.findWeapon
            this.isLoading = true
            
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

            this.decoAlgorithm(configWpn, this.wList, build)
            //this.rateGear(configWpn, this.wList, build)
            this.rateGear(configWpn, this.wList, build)
            this.rateFlatGear(configWpn, this.wList, build)
            
            
            build.buildWpn = configWpn

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
                        if(this.getArmor[armor] != null){
                            if(this.isGearTypeFree(this.getArmor[armor], this.getBuilds[b])){
                                evaluationList.push(this.getArmor[armor])
                            }
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
                        //this.rateGear(evaluationList[gearPiece], this.wList, this.getBuilds[b])
                        this.rateGear(evaluationList[gearPiece], this.wList, this.getBuilds[b])                        
                        this.rateFlatGear(evaluationList[gearPiece], this.wList, this.getBuilds[b])                        
                    }
                    
                    //check equal results. if equally good max lvls are there, save all to buildlist
                    var highestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._flat_rating > gear._flat_rating ? maxGear : gear)
                    var secondHighestRatedGear = {_flat_rating : 0}
                    //with just one gearpiece left to set, maybe just one tal is left in eval list
                    if(evaluationList.length > 2){
                        evaluationList.splice(evaluationList.indexOf(highestRatedGear),1)
                        secondHighestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._flat_rating > gear._flat_rating ? maxGear : gear)
                    }
                    let plsDontFryCpu = 0
                    while(highestRatedGear._flat_rating == secondHighestRatedGear._flat_rating && evaluationList.length > 3 && plsDontFryCpu < 1){                        
                        //onsole.log(evaluationList)
                        //set highest, save build in builds, remove highest, loop
                        this.setGearInBuild(secondHighestRatedGear, this.getBuilds[b])
                        
                        //store state of build
                        //DELETED for testing
                        //this.getBuilds.push(structuredClone(this.getBuilds[b]))
                        console.log("altBuildset")
                        this.removeGearFromBuild(secondHighestRatedGear, this.getBuilds[b])

                        //remove second highest from eval, set new secondhighest
                        evaluationList.splice(evaluationList.indexOf(secondHighestRatedGear), 1)
                        secondHighestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._flat_rating > gear._flat_rating ? maxGear : gear)

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
            const finalBuild = this.getBuilds.reduce((maxBuild, build) => maxBuild._flat_rating > build._flat_rating ? maxBuild : build)
            console.log(finalBuild)
            this.setBuild(finalBuild)
            this.setBuildSkills(this.totalSkillLevels(finalBuild))
            this.isLoading = false
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
            const catchOverflow = []

            gear._rating = 0
            var skillArrLength = gear._skill_array.length
            for(let skillIndex = 0; skillIndex < skillArrLength; skillIndex ++){
                if(wishlist._skillSelectionArray.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name)){

                    var wishlistSkill = wishlist._skillSelectionArray.find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)
                    //only if totalgearskills dont exceed selectedlvl
                    //console.log(this.totalSkillLevels(build, gear).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl)
                    //console.log(wishlistSkill._selectedLvl)
                    if(this.totalSkillLevels(build, gear).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl <= 
                        wishlistSkill._selectedLvl
                    ){
                        gear._rating += 1 * (1/wishlistSkill._prio)
                    }else{
                        //skilllvl exceeded give gear the difference of totalskilllvls without it, and the wishlvl of skill
                        //console.log("test overflow")
                        //console.log(gear._skill_array[skillIndex]._skill_name)
                        //console.log(catchOverflow.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name))
                        if(!catchOverflow.some(skill => skill._skill_name === gear._skill_array[skillIndex]._skill_name)){
                            
                            console.log(gear._skill_array[skillIndex]._skill_name)
                            console.log(this.totalSkillLevels(build, null))
                            var totalExceptGear = this.totalSkillLevels(build, null)
                            console.log(totalExceptGear)
                            var priorLvls
                            if(totalExceptGear.length == 0 || totalExceptGear.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name) == false){
                                priorLvls = 0
                            }else{
                                priorLvls = totalExceptGear.find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl
                            }
                            catchOverflow.push({
                                _skill_name: gear._skill_array[skillIndex]._skill_name,
                                _lvlToWantedRating: (wishlistSkill._selectedLvl - priorLvls) * (1/wishlistSkill._prio)
                            })
                            //console.log(gear)
                            //console.log(wishlistSkill._selectedLvl)
                        }
                    }

                }
            }
            for(let skill in catchOverflow){
                gear._rating += catchOverflow[skill]._lvlToWantedRating
                //console.log(catchOverflow)
            }
        },
        rateFlatGear: function(gear, wishlist, build){
            //rate gear according to how many OPEN skilllvls of wl are fulfilled

            const catchOverflow = []
            gear._flat_rating = 0

            var skillArrLength = gear._skill_array.length
            for(let skillIndex = 0; skillIndex < skillArrLength; skillIndex ++){
                if(wishlist._skillSelectionArray.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name)){
                    var wishlistSkill = wishlist._skillSelectionArray.find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)
                    //If gear exceeds selected lvl by one, but has 4 lvls of the skill, the previous lvls have to count
                    //console.log(this.totalSkillLevels(build, gear).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl)
                    //console.log(wishlistSkill._selectedLvl)
                    if(this.totalSkillLevels(build, gear).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl <= 
                        wishlistSkill._selectedLvl
                    ){
                        gear._flat_rating += 1 
                    }else{
                        
                        //skilllvl exceeded give gear the difference of totalskilllvls without it, and the wishlvl of skill
                        if(!catchOverflow.some(skill => skill._skill_name === gear._skill_array[skillIndex]._skill_name)){
                            console.log(gear._skill_array[skillIndex]._skill_name)
                            console.log(this.totalSkillLevels(build, null))

                            var totalExceptGear = this.totalSkillLevels(build, null)
                            console.log(totalExceptGear)
                            var priorLvls
                            if(totalExceptGear.length == 0 || totalExceptGear.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name) == false){
                                priorLvls = 0
                            }else{
                                priorLvls = totalExceptGear.find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl
                            }
                            //console.log(gear._skill_array[skillIndex]._skill_name)
                            catchOverflow.push({
                                _skill_name: gear._skill_array[skillIndex]._skill_name,
                                _lvlToWantedRating: wishlistSkill._selectedLvl - priorLvls
                            })
                            //console.log(gear)
                            //console.log(wishlistSkill._selectedLvl)
                        }
                    }
                    //if skillLvl is exceeded, search for a deco of that skill and lvl in build and run deco algorithm on this piece again
                }
            }
            for(let skill in catchOverflow){
                gear._flat_rating += catchOverflow[skill]._lvlToWantedRating
                //console.log(catchOverflow)
            }
        },
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

            //testing
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
            var skillArrLength = gear._skill_array.length
            for(let i = skillArrLength -1; i >= 0; i--){
                if(gear._skill_array[i]._is_deco === true){
                    gear._skill_array.splice(i, 1)
                }
            }
        },
        decoAlgorithm: function(gear, wishlist, build) {
            //console.log(gear)
            
            this.clearDecos(gear)

            //get decoArray of armor
            var decoArray = null
            if(gear.hasOwnProperty('_slot_array_name')){
                if(gear._slot_array_name == ""){return}
                decoArray = this.getSlotArray(gear._slot_array_name)
            }else if(gear.hasOwnProperty('_slots')){
                if(gear._slots == ""){return}
                decoArray = {_slots: gear._slots}
            }else{
                return
            }
           //console.log(decoArray)

           //loop gearslots big -> small
            for(let gearSlot in decoArray._slots){
                if(decoArray._slots[gearSlot] == 0){
                    continue
                }
                
                let repeatBcNoFit = true
                //a=prio
                var selectionArrLength = wishlist._skillSelectionArray.length
                for(let prio = 1; repeatBcNoFit === true && prio <= selectionArrLength; prio++){
                    OuterLoop:
                    for(let wlSkill in wishlist._skillSelectionArray){
                        //is prio = a
                        if(prio === wishlist._skillSelectionArray[wlSkill]._prio){
                            //check if overall skills of current gear already fullfill wl condition
                            //TODO better find wlSkill
                            
                            var currentSkillLevels = this.totalSkillLevels(build, gear)
                            if(currentSkillLevels.some(skill => skill._name === wishlist._skillSelectionArray[wlSkill]._name)){
                                if(wishlist._skillSelectionArray[wlSkill]._selectedLvl <= currentSkillLevels.find(skill => skill._name === wishlist._skillSelectionArray[wlSkill]._name)._lvl){
                                    break //OuterLoop
                                }
                            }
                            var skillDecoArr = this.findSkill(wishlist._skillSelectionArray[wlSkill]._name)._deco_array
                            var decoArrLength = skillDecoArr.length
                            for(let i = decoArrLength; i > 0; i--){
                                //changed from <= to == 
                                if(skillDecoArr[i-1]._deco_lvl == decoArray._slots[gearSlot]){
                                    for(let j = 0; j < skillDecoArr[i-1]._skill_lvl; j++){
                                        gear._skill_array.push(
                                            {
                                                _skill_name: wishlist._skillSelectionArray[wlSkill]._name,
                                                _is_deco: true
                                            }
                                        )
                                    }
                                    repeatBcNoFit = false 
                                    break OuterLoop//DecoSet
                                }
                                repeatBcNoFit = true
                            }
                        }

                    }
                }
            }
            //console.log(gear)
        },
        totalSkillLevels: function(build, gear){
            const addedSkillList = []
            
            //set gear to be tested
            if(gear != null){
                this.setGearInBuild(gear, build)
            }
            //build Talisman
            if(build.buildTalisman != null){
                //check if deco or native
                var buildTal = build.buildTalisman
                var talSkillArrLength = buildTal._skill_array.length
                for(let i = 0; i < talSkillArrLength; i++){

                    if(addedSkillList.some(skill => skill._name === buildTal._skill_array[i]._skill_name)){
                        addedSkillList.find(skill => skill._name === buildTal._skill_array[i]._skill_name)._lvl += 1
                            
                    }else { //else add skill + lvl element = 1
                        addedSkillList[addedSkillList.length] = this.findSkill(buildTal._skill_array[i]._skill_name)
                        addedSkillList[addedSkillList.length-1]._lvl = 1        
                    }
                }
            }
            //buildWeapon
            if(build.buildWpn != null){
                var buildWpn = build.buildWpn
                var wpnSkillArrLength = buildWpn._skill_array.length
                for(let i = 0; i < wpnSkillArrLength; i++){
                    if(addedSkillList.some(skill => skill._name === buildWpn._skill_array[i]._skill_name)){
                        addedSkillList.find(skill => skill._name === buildWpn._skill_array[i]._skill_name)._lvl += 1
                    }else {
                        addedSkillList[addedSkillList.length] = this.findSkill(buildWpn._skill_array[i]._skill_name)
                        addedSkillList[addedSkillList.length-1]._lvl = 1//as many entries as lvls -> buildWpn._skill_array[i]._lvl
                    }
                }
            }
            //for each armorpiece
            for(let armorPiece in build.buildArmor){
                if(build.buildArmor[armorPiece] != null){
                    var armorPieceVar = build.buildArmor[armorPiece]
                    var armorSkillArrLength = armorPieceVar._skill_array.length
                    for(let i = 0; i < armorSkillArrLength; i++){
                        if(Object.keys(armorPieceVar._skill_array[i]).length != 0){
                            if(addedSkillList.some(skill => skill._name === armorPieceVar._skill_array[i]._skill_name)){
                                addedSkillList.find(skill => skill._name === armorPieceVar._skill_array[i]._skill_name)._lvl += 1
                            }else {
                                //TESTING: remove if statement to find missing skills in db!
                                if(this.findSkill(armorPieceVar._skill_array[i]._skill_name) != null){
                                    //console.log(armorPieceVar._skill_array[i]._skill_name)
                                    //console.log(this.findSkill(armorPieceVar._skill_array[i]._skill_name))
                                    
                                    addedSkillList[addedSkillList.length] = this.findSkill(armorPieceVar._skill_array[i]._skill_name)
                                    addedSkillList[addedSkillList.length-1]._lvl = 1 //as many entries as lvls -> build.buildArmor[i]._skill_array[i]._lvl
                                }
                            }
                        }
                    }
                }
            }
            if(gear != null){
                this.removeGearFromBuild(gear, build)
            }
            //console.log(gear)
            //console.log(addedSkillList)
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
        replaceAt: function(string, index, replacement) {
            return string.substring(0, index) + replacement + string.substring(index + 1);
        },
        setWpnSlotLvl: function(weapon, slotNum, slotLvl){
            try{
                weapon._slots[slotNum] = slotLvl
            }catch (error){
                alert (error)
                console.log(error)
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
            setBuildSkills: 'setBuildSkills',
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
        
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-wrap: wrap;
        
        /*
        display: grid;
        grid-template-columns: 1;
        grid-template-rows: min-content;
        */
    }
    .flex-component1 > div{
        align-self: flex-start;
        width: 100%;
    }
    .flex-component2{
        flex:1;
        padding-left: 2%;
        padding-right: 2%;
        padding-bottom: 2%;
    }
    .flex-component3{
        flex:1;
        padding-left: 2%;
        padding-right: 2%;
        padding-bottom: 2%;
    }
    .buildOptions{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 5px 10px 5px;
        
    }
    /*
    @media only screen and (max-width: 768px){
        .buildTable {
            transform:rotate(90deg);
            position:relative;
            transform-origin: 0% 120%;
        }
    }
    */
    .buildTable{
        height: auto;
        width: auto;
    }
    .buildOptions > label{
        flex: 0.2;
    }
</style>