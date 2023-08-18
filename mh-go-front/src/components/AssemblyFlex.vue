<template>
    <div class="assembly-div">
        <div class="flex-container">
            <div class="flex-component1">
                <div class="borderWrapperBuild">
                    <div class="buildOptions">
                        <p>Select wishlist:</p>
                        <div style="width: 25%">
                            <v-select
                                :options="getWishlists"
                                label="_name"
                                v-model="wList"
                                width="50px"
                            ></v-select>
                        </div>
                        <p style="display: inline">Select weapon slots:</p>
                        <div class="slotSelection" style="width:25%">
                            <SlotItemBtn @send="setWpnSlotLvl(findWeapon, 0, $event)" :slotId=findWeapon._slots[0] />
                            <SlotItemBtn @send="setWpnSlotLvl(findWeapon, 1, $event)" :slotId=findWeapon._slots[1] />
                            <SlotItemBtn @send="setWpnSlotLvl(findWeapon, 2, $event)" :slotId=findWeapon._slots[2] />                     
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
                        <button @click="buildSetup()" style="width:100%">Calculate build</button>
                    </div>
                </div>
            </div>
            
            <div class="flex-component2">
               <SelectionFormWl/>
            </div>
            <div class="flex-component3">
                <SelectionFormTal/>
            </div>
            <div class="flex-component4">
                <button @click="toggleGuide()" class='guideBtn'>
                    <p>Guide</p>
                    <img v-bind:src="guideImg">
                </button>
            </div>
        
        </div>
        <GuidePanel @close="toggleGuide()" v-if="showGuide"/>
        <LoadingScreen 
            v-if="isLoading"
            :buildsFinished="this.buildsFinished"
            :buildsTotal="this.buildsTotal"
        />
    </div>
    
</template>


<script>
//deploy?
/* eslint-disable */

//https://dev.to/dd8888/how-to-create-a-simple-loading-screen-using-vue-4h7m
//https://weekendprojects.dev/posts/css-rotate-animations-examples/
//https://jsfiddle.net/78kt1p5j/1/
//http://test-a-tag.com/
//https://medium.com/bb-tutorials-and-thoughts/how-to-build-mevn-stack-for-production-91a53534758f
//https://medium.com/bb-tutorials-and-thoughts/reading-environment-variables-in-nodejs-rest-api-e75bb04b813d
//https://policies.google.com/technologies/partner-sites

//import SelectionFormVue from './SelectionForm.vue'
import SelectionFormWl from './SelectionFormWl.vue'
import SelectionFormTal from './SelectionFormTal.vue'
import Buildtable from './BuildTable.vue'
import SlotItemBtn from './SlotItemBtn.vue'


import { mapGetters, mapActions, mapMutations } from 'vuex'
import LoadingScreen from './LoadingScreen.vue'
import GuidePanel from './GuidePanel.vue'

    export default {
        components: {
            SelectionFormWl,
            SelectionFormTal,
            Buildtable,
            SlotItemBtn,
            LoadingScreen,
            GuidePanel
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
                //findWeapon: 'findWeapon'

            })
        },

    

        data() {
            return {
                showGuide: true,
                buildsFinished: 0,
                buildsTotal:0,
                wList: null,
                isLoading: false,
                guideImg: require('../assets/unique-armor-mhw-wiki.png'),
                findWeapon: {
                    _name: "wpn",
                    _skill_array: [],
                    _type_id: "6",
                    _slots: [0,0,0]
                }
            };
        },

        methods: {
            buildSetup(){
                if(this.wList == null){
                    alert("No wishlist selected")
                    return
                }
                this.isLoading = true
                setTimeout(() =>{
                    this.buildAlgorithm()
                }, 1000)
                
                
                
                
            },
            buildAlgorithm: function(){
               
                const configWpn = this.findWeapon
                this.isLoading = true
                this.buildsTotal = 0
                this.buildsFinished = 0
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

                const evaluationList = []

                //this.decoAlgorithm(configWpn, this.wList, build, false)
                this.rateGear(configWpn, this.wList, build, false)
                this.rateFlatGear(configWpn, this.wList, build, false)
                
                
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
                            //this.decoAlgorithm(evaluationList[gearPiece], this.wList, this.getBuilds[b], false)
                            this.rateGear(evaluationList[gearPiece], this.wList, this.getBuilds[b], false)                        
                            this.rateFlatGear(evaluationList[gearPiece], this.wList, this.getBuilds[b], false)                        
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
                            //set highest, save build in builds, remove highest, loop
                            this.setGearInBuild(secondHighestRatedGear, this.getBuilds[b])
                            
                            //store state of build
                            this.getBuilds.push(structuredClone(this.getBuilds[b]))
                            console.log("altBuildset")
                            this.removeGearFromBuild(secondHighestRatedGear, this.getBuilds[b])

                            //remove second highest from eval, set new secondhighest
                            evaluationList.splice(evaluationList.indexOf(secondHighestRatedGear), 1)
                            secondHighestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._flat_rating > gear._flat_rating ? maxGear : gear)

                            plsDontFryCpu ++
                        }

                        
                        var highestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._rating > gear._rating ? maxGear : gear)
                        var secondHighestRatedGear = {_rating : 0}
                        //with just one gearpiece left to set, maybe just one tal is left in eval list
                        if(evaluationList.length > 2){
                            evaluationList.splice(evaluationList.indexOf(highestRatedGear),1)
                            secondHighestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._rating > gear._rating ? maxGear : gear)
                        }
                        //let plsDontFryCpu = 0
                        while(highestRatedGear._rating == secondHighestRatedGear._rating && evaluationList.length > 3 && plsDontFryCpu < 1){
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
                        console.log("gearPieceSet")
                        ////console.log(this.getBuilds[b])

                    }
                    
                    //for future release: loading progress
                    this.buildsFinished += 1
                    this.buildsTotal = this.getBuildsLength

                    //fixing overshoots / optimizing for final loadout?
                    //after build completion, get buildrating
                    this.rateBuild(this.getBuilds[b]) 
                    this.rateBuild(this.getBuilds[b])   
                    console.log("build completed")
                    //console.log(this.getBuilds.length)
                }
                /*
                
                */

                //after all builds are completed, find the one with max rating
                const finalBuild = this.getBuilds.reduce((maxBuild, build) => maxBuild._rating > build._rating ? maxBuild : build)
                console.log(finalBuild)
                

                this.decoAlgorithm(finalBuild.buildArmor.headGear, this.wList, finalBuild, true)
                this.rateGear(finalBuild.buildArmor.headGear, this.wList, finalBuild, true)                        
                this.rateFlatGear(finalBuild.buildArmor.headGear, this.wList, finalBuild, true)

                this.decoAlgorithm(finalBuild.buildArmor.chestGear, this.wList, finalBuild, true)
                this.rateGear(finalBuild.buildArmor.chestGear, this.wList, finalBuild, true)                        
                this.rateFlatGear(finalBuild.buildArmor.chestGear, this.wList, finalBuild, true)

                this.decoAlgorithm(finalBuild.buildArmor.armsGear, this.wList, finalBuild, true)
                this.rateGear(finalBuild.buildArmor.armsGear, this.wList, finalBuild, true)                        
                this.rateFlatGear(finalBuild.buildArmor.armsGear, this.wList, finalBuild, true)

                this.decoAlgorithm(finalBuild.buildArmor.waistGear, this.wList, finalBuild, true)
                this.rateGear(finalBuild.buildArmor.waistGear, this.wList, finalBuild, true)                        
                this.rateFlatGear(finalBuild.buildArmor.waistGear, this.wList, finalBuild, true)

                this.decoAlgorithm(finalBuild.buildArmor.legsGear, this.wList, finalBuild, true)
                this.rateGear(finalBuild.buildArmor.legsGear, this.wList, finalBuild, true)                        
                this.rateFlatGear(finalBuild.buildArmor.legsGear, this.wList, finalBuild, true)

                this.decoAlgorithm(finalBuild.buildTalisman, this.wList, finalBuild, true)
                this.rateGear(finalBuild.buildTalisman, this.wList, finalBuild, true)                        
                this.rateFlatGear(finalBuild.buildTalisman, this.wList, finalBuild, true)

                this.decoAlgorithm(finalBuild.buildWpn, this.wList, finalBuild, true)
                this.rateGear(finalBuild.buildWpn, this.wList, finalBuild, true)                        
                this.rateFlatGear(finalBuild.buildWpn, this.wList, finalBuild, true)


                const build2 ={ 
                    buildWpn: configWpn,
                    buildArmor:{
                        headGear: null,
                        chestGear: null,
                        armsGear: null,
                        waistGear: null,
                        legsGear: null
                    },
                    buildTalisman: null
                }
                this.getBuilds.push(build2)
                for(let b = 1; b < this.getBuildsLength; b++){
                    console.log(this.getBuilds[b])
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
                            this.decoAlgorithm(evaluationList[gearPiece], this.wList, this.getBuilds[b], false)
                            this.rateGear(evaluationList[gearPiece], this.wList, this.getBuilds[b], false)                        
                            this.rateFlatGear(evaluationList[gearPiece], this.wList, this.getBuilds[b], false)                        
                        }
                        
                        //check equal results. if equally good max lvls are there, save all to buildlist
                        var highestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._rating > gear._rating ? maxGear : gear)
                        var secondHighestRatedGear = {_rating : 0}
                        //with just one gearpiece left to set, maybe just one tal is left in eval list
                        if(evaluationList.length > 2){
                            evaluationList.splice(evaluationList.indexOf(highestRatedGear),1)
                            secondHighestRatedGear = evaluationList.reduce((maxGear, gear) => maxGear._rating > gear._rating ? maxGear : gear)
                        }
                        let plsDontFryCpu = 0
                        while(highestRatedGear._rating == secondHighestRatedGear._rating && evaluationList.length > 3 && plsDontFryCpu < 1){
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
                        console.log("gearPieceSet")
                        ////console.log(this.getBuilds[b])

                    }
                }

                //after all builds are completed, find the one with max rating
                const finalFinalBuild = this.getBuilds.reduce((maxBuild, build) => maxBuild._rating > build._rating ? maxBuild : build)
                console.log(finalFinalBuild)
                

                this.decoAlgorithm(finalFinalBuild.buildArmor.headGear, this.wList, finalFinalBuild, true)
                this.rateGear(finalFinalBuild.buildArmor.headGear, this.wList, finalFinalBuild, true)                        
                this.rateFlatGear(finalFinalBuild.buildArmor.headGear, this.wList, finalFinalBuild, true)

                this.decoAlgorithm(finalFinalBuild.buildArmor.chestGear, this.wList, finalFinalBuild, true)
                this.rateGear(finalFinalBuild.buildArmor.chestGear, this.wList, finalFinalBuild, true)                        
                this.rateFlatGear(finalFinalBuild.buildArmor.chestGear, this.wList, finalFinalBuild, true)

                this.decoAlgorithm(finalFinalBuild.buildArmor.armsGear, this.wList, finalFinalBuild, true)
                this.rateGear(finalFinalBuild.buildArmor.armsGear, this.wList, finalFinalBuild, true)                        
                this.rateFlatGear(finalFinalBuild.buildArmor.armsGear, this.wList, finalFinalBuild, true)

                this.decoAlgorithm(finalFinalBuild.buildArmor.waistGear, this.wList, finalFinalBuild, true)
                this.rateGear(finalFinalBuild.buildArmor.waistGear, this.wList, finalFinalBuild, true)                        
                this.rateFlatGear(finalFinalBuild.buildArmor.waistGear, this.wList, finalFinalBuild, true)

                this.decoAlgorithm(finalFinalBuild.buildArmor.legsGear, this.wList, finalFinalBuild, true)
                this.rateGear(finalFinalBuild.buildArmor.legsGear, this.wList, finalFinalBuild, true)                        
                this.rateFlatGear(finalFinalBuild.buildArmor.legsGear, this.wList, finalFinalBuild, true)

                this.decoAlgorithm(finalFinalBuild.buildTalisman, this.wList, finalFinalBuild, true)
                this.rateGear(finalFinalBuild.buildTalisman, this.wList, finalFinalBuild, true)                        
                this.rateFlatGear(finalFinalBuild.buildTalisman, this.wList, finalFinalBuild, true)

                this.decoAlgorithm(finalFinalBuild.buildWpn, this.wList, finalFinalBuild, true)
                this.rateGear(finalFinalBuild.buildWpn, this.wList, finalFinalBuild, true)                        
                this.rateFlatGear(finalFinalBuild.buildWpn, this.wList, finalFinalBuild, true)





                console.log(finalFinalBuild)
                this.setBuild(finalFinalBuild)
                this.setBuildSkills(this.totalSkillLevels(finalFinalBuild, null, true, this.wList))
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
            rateGear: function(gear, wishlist, build, buildWrapup){
                //rate gear according to how many OPEN skilllvls of wl are fulfilled
                const catchOverflow = []

                gear._rating = 0
                var skillArrLength = gear._skill_array.length
                for(let skillIndex = 0; skillIndex < skillArrLength; skillIndex ++){
                    if(wishlist._skillSelectionArray.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name)){

                        var wishlistSkill = wishlist._skillSelectionArray.find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)
                        //only if totalgearskills dont exceed selectedlvl
                        //console.log(this.totalSkillLevels(build, gear, buildWrapup).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl)
                        //console.log(wishlistSkill._selectedLvl)
                        if(this.totalSkillLevels(build, gear, buildWrapup, wishlist).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl <= 
                            wishlistSkill._selectedLvl
                        ){
                            gear._rating += 1 * (1/wishlistSkill._prio)
                        }else{
                            //skilllvl exceeded give gear the difference of totalskilllvls without it, and the wishlvl of skill
                            //console.log("test overflow")
                            //console.log(gear._skill_array[skillIndex]._skill_name)
                            //console.log(catchOverflow.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name))
                            if(!catchOverflow.some(skill => skill._skill_name === gear._skill_array[skillIndex]._skill_name)){
                                
                                //console.log(gear._skill_array[skillIndex]._skill_name)
                                //console.log(this.totalSkillLevels(build, null, buildWrapup, wishlist))
                                var totalExceptGear = this.totalSkillLevels(build, null, buildWrapup, wishlist)
                                //console.log(totalExceptGear)
                                var priorLvls
                                if(totalExceptGear.length == 0 || totalExceptGear.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name) == false){
                                    priorLvls = 0
                                }else{
                                    priorLvls = totalExceptGear.find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl
                                }
                                catchOverflow.push({
                                    _skill_name: gear._skill_array[skillIndex]._skill_name,
                                    _lvlToWantedRating: (wishlistSkill._selectedLvl - priorLvls) * (1/wishlistSkill._prio),
                                                           
                                })
                                //console.log(gear._name)
                                //console.log(wishlistSkill._selectedLvl - priorLvls)
                            }
                        }

                    }
                }
                for(let skill in catchOverflow){
                    gear._rating += catchOverflow[skill]._lvlToWantedRating
                    //console.log(catchOverflow)
                }
            },
            rateFlatGear: function(gear, wishlist, build, buildWrapup){
                //rate gear according to how many OPEN skilllvls of wl are fulfilled

                const catchOverflow = []
                gear._flat_rating = 0

                var skillArrLength = gear._skill_array.length
                for(let skillIndex = 0; skillIndex < skillArrLength; skillIndex ++){
                    if(wishlist._skillSelectionArray.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name)){
                        var wishlistSkill = wishlist._skillSelectionArray.find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)
                        //If gear exceeds selected lvl by one, but has 4 lvls of the skill, the previous lvls have to count
                        //console.log(this.totalSkillLevels(build, gear, buildWrapup).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl)
                        //console.log(wishlistSkill._selectedLvl)
                        if(this.totalSkillLevels(build, gear, buildWrapup, wishlist).find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl <= 
                            wishlistSkill._selectedLvl
                        ){
                            gear._flat_rating += 1 
                        }else{
                            
                            //skilllvl exceeded give gear the difference of totalskilllvls without it, and the wishlvl of skill
                            if(!catchOverflow.some(skill => skill._skill_name === gear._skill_array[skillIndex]._skill_name)){
                                //console.log(gear._skill_array[skillIndex]._skill_name)
                                //console.log(this.totalSkillLevels(build, null, buildWrapup, wishlist))

                                var totalExceptGear = this.totalSkillLevels(build, null, buildWrapup, wishlist)
                                //console.log(totalExceptGear)
                                var priorLvls
                                if(totalExceptGear.length == 0 || totalExceptGear.some(skill => skill._name === gear._skill_array[skillIndex]._skill_name) == false){
                                    priorLvls = 0
                                }else{
                                    priorLvls = totalExceptGear.find(skill => skill._name === gear._skill_array[skillIndex]._skill_name)._lvl
                                }
                                //console.log(gear._skill_array[skillIndex]._skill_name)
                                //TODO somehow produces negative values
                                catchOverflow.push({
                                    _skill_name: gear._skill_array[skillIndex]._skill_name,
                                    _lvlToWantedRating: wishlistSkill._selectedLvl - priorLvls,

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
            decoAlgorithm: function(gear, wishlist, build, buildWrapup) {
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
                                
                                var currentSkillLevels = this.totalSkillLevels(build, gear, buildWrapup, wishlist)
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
                                        //TODO try out effectiveness of if statement to check for overshooting 
                                        ///*
                                        if(!currentSkillLevels.some(skill => skill._name === wishlist._skillSelectionArray[wlSkill]._name) ||
                                        skillDecoArr[i-1]._skill_lvl +
                                        currentSkillLevels.find(skill => skill._name === wishlist._skillSelectionArray[wlSkill]._name)._lvl <=
                                        wishlist._skillSelectionArray[wlSkill]._selectedLvl){

                                            for(let j = 0; j < skillDecoArr[i-1]._skill_lvl; j++){
                                                gear._skill_array.push(
                                                    {
                                                        _skill_name: wishlist._skillSelectionArray[wlSkill]._name,
                                                        _is_deco: true
                                                    }
                                                )
                                            }
                                            if(gear._name == "Valstrax Braces - Eclipse"){
                                                console.log(gear)
                                                //this.brtek()
                                            }
                                            repeatBcNoFit = false 
                                            break OuterLoop//DecoSet
                                        }
                                    }
                                    ///*
                                    if(skillDecoArr[i-1]._deco_lvl <= decoArray._slots[gearSlot]){
                                        //TODO try out effectiveness of if statement to check for overshooting 
                                        ///*
                                        if(!currentSkillLevels.some(skill => skill._name === wishlist._skillSelectionArray[wlSkill]._name) ||
                                        skillDecoArr[i-1]._skill_lvl +
                                        currentSkillLevels.find(skill => skill._name === wishlist._skillSelectionArray[wlSkill]._name)._lvl <=
                                        wishlist._skillSelectionArray[wlSkill]._selectedLvl){

                                            for(let j = 0; j < skillDecoArr[i-1]._skill_lvl; j++){
                                                gear._skill_array.push(
                                                    {
                                                        _skill_name: wishlist._skillSelectionArray[wlSkill]._name,
                                                        _is_deco: true
                                                    }
                                                )
                                            }
                                            if(gear._name == "Valstrax Braces - Eclipse"){
                                                console.log("whyyyyyyyyyyyyyy")
                                                console.log(gear)
                                                //this.brtek()
                                            }
                                            repeatBcNoFit = false 
                                            break OuterLoop//DecoSet
                                        }
                                    }
                                    //*/

                                    repeatBcNoFit = true
                                }
                            }

                        }
                    }
                }
                //console.log(gear)
            },
            totalSkillLevels: function(build, gear, buildWrapup, wishlist){
                const addedSkillList = []
                
                //set gear to be tested
                if(gear != null && buildWrapup == false){
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
                            if(wishlist._skillSelectionArray.some(skill => skill._name === buildTal._skill_array[i]._skill_name)){
                                const skillPrio = wishlist._skillSelectionArray.find(skill => skill._name === buildTal._skill_array[i]._skill_name)._prio
                                addedSkillList[addedSkillList.length-1]._prio = skillPrio
                            }else{
                                addedSkillList[addedSkillList.length-1]._prio = 100
                            }

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
                            if(wishlist._skillSelectionArray.some(skill => skill._name === buildWpn._skill_array[i]._skill_name)){
                                const skillPrio = wishlist._skillSelectionArray.find(skill => skill._name === buildWpn._skill_array[i]._skill_name)._prio
                                addedSkillList[addedSkillList.length-1]._prio = skillPrio
                            }else{
                                addedSkillList[addedSkillList.length-1]._prio = 100
                            }
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
                                    //if(this.findSkill(armorPieceVar._skill_array[i]._skill_name) != null){
                                        //console.log(armorPieceVar._skill_array[i]._skill_name)
                                        //console.log(this.findSkill(armorPieceVar._skill_array[i]._skill_name))
                                        
                                        addedSkillList[addedSkillList.length] = this.findSkill(armorPieceVar._skill_array[i]._skill_name)
                                        addedSkillList[addedSkillList.length-1]._lvl = 1 //as many entries as lvls -> build.buildArmor[i]._skill_array[i]._lvl
                                        if(wishlist._skillSelectionArray.some(skill => skill._name === armorPieceVar._skill_array[i]._skill_name)){
                                            const skillPrio = wishlist._skillSelectionArray.find(skill => skill._name === armorPieceVar._skill_array[i]._skill_name)._prio
                                            addedSkillList[addedSkillList.length-1]._prio = skillPrio
                                        }else{
                                            addedSkillList[addedSkillList.length-1]._prio = 100
                                        }
                                    //}
                                }
                            }
                        }
                    }
                }
                if(gear != null && buildWrapup == false){
                    this.removeGearFromBuild(gear, build)
                }
                addedSkillList.sort(function(a,b){return a._prio - b._prio})
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
            toggleGuide: function(){
                this.showGuide = !this.showGuide
            }
        },
        created(){
            this.fetchArmor()
            this.fetchWeapons()
            //this.fetchGearTypes()
            this.fetchSlots()
            this.fetchSlotArrays()
            //this.showGuide = true
        }
    }
</script>

<style>
    @media only screen and (max-width: 768px){
        .flex-container{flex-direction: column-reverse;}
    }
    .assembly-div{
        display: flex;
        flex-direction: column;
    }
    .flex-container{
        display: flex;
    }
    .flex-component1{
        flex:3;
        padding: 10px;
        
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
        /*
        padding-left: 2%;
        padding-right: 2%;
        padding-bottom: 2%;*/
        padding: 10px;
    }
    .flex-component3{
        flex:1;
        /*
        padding-left: 2%;
        padding-right: 2%;
        padding-bottom: 2%;
        */
        padding: 10px;
    }
    .buildOptions{
        border: 3px solid black;
        background: linear-gradient(black 0%, var(--mh-gray) 25%, var(--mh-gray)85%, black);
        /*background: linear-gradient(#f24725, #fff790 ,var(--mh-white));*/
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 0px 5px 0px;
        
    }
    .buildTable{
        height: auto;
        padding: 5px 5px 5px 5px;
    }
    .buildOptions > label{
        flex: 0.2;
    }
    .guideBtn{
        margin: 10px;
        color: black;
        background: linear-gradient(green, blue);
    }
    .borderWrapperBuild{
        border: 1px solid var(--mh-gray);
        background: linear-gradient(var(--mh-dark-red), black);
        border-radius: 1%;
        box-shadow: 5px 10px 5px black;
        display: flex;
        flex-direction: column;
        padding: 2px;
    }
</style>