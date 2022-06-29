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
                    /*add all armor:
                        [{_id,_type_id,_skillArray,_slotArrays_id,_set},{}...]
                    */
                    //console.log(armorCopy)
                    evaluationList.push(armorCopy)
                    evaluationList.push(this.getTalismans)
                    //FILTER INSTEAD!!!
                    //var filteredArmor = armorCopy.filter(armor => armor._type_id != )
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
                    armorCopy = structuredClone(this.getArmor)
                    
                    //set optimal decos for all gear and rate gear according to wip wl
                    //also recalculate rating based on wip wl
                    for(let armor in armorCopy){
                        //then the algorithm adds as many skills from wl, as are fitting onto slot array 
                        this.decoAlgorithm(armorCopy[armor], wipListList[wlCounter], this.getBuilds[b], this.getSkills)
                        this.rateGear(armorCopy[armor], wipListList[wlCounter])


                    }
                }
            }
        },
        
        decoAlgorithm: function(armor, wishlist, build, skills) {
            //clear skills with {_deco: true}

            //get decoArray of armor
            const decoArray = this.getSlotArray(armor._slot_array_name)

            build['buildTalisman'] = this.getTalismans[0]
            

           //loop gearslots big -> small
            for(let k = decoArray._slots.length; k > 0; k--){
                let repeatBcNoFit = true
                //a=prio
                for(let a = 1; repeatBcNoFit === true && a <= wishlist._skillSelectionArray.length; a++){
                    OuterLoop:
                    //l=skill
                    for(let l in wishlist._skillSelectionArray){
                        //is prio = a
                        if(a === wishlist._skillSelectionArray[l]._prio){
                            //is some gear set already?
                            if(
                                build.buildArmor.headGear != null ||
                                build.buildArmor.chestGear != null ||
                                build.buildArmor.armsGear != null ||
                                build.buildArmor.waistGear != null ||
                                build.buildArmor.legsGear != null ||
                                //buildTalisman
                                build.buildTalisman !== null
                            ){
                                //check if overall skills of current gear already fullfill wl condition
                                //better find skill l
                                //console.log("reached")
                                for(let s in this.totalSkillLevels(build)){
                                    
                                }
                            }
                        }

                    }
                }
            }
            
        },

        totalSkillLevels: function(build){
            const addedSkillList = []
            //build Talisman
            console.log(build)

            if(build.buildTalisman != null){
                //tal skill length
                for(let i = 0; i < build.buildTalisman._skillSelectionArray.length; i++){
                    //if skill present, +1 to skill lvl
                    if(addedSkillList.some(skill => skill._name === build.buildTalisman._skillSelectionArray[i]._name)){
                        //addedSkillList.find(({_name}) => _name === build[2][2][i]._name)._lvl ++
                    }else { //else add skill + lvl element = 1
                        addedSkillList[i] = this.findSkill(build.buildTalisman._skillSelectionArray[i]._name)
                        addedSkillList[i]._lvl = build.buildTalisman._skillSelectionArray[i]._name._selectedLvl
                        console.log(addedSkillList)
                    }
                    console.log("reached")
                    
                }
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