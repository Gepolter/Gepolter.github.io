<template>
    <section class="animated-grid">
        <div v-for="(column, index) in gridColumns" :key="index">
            <template v-for="columnImage in columnImageArray" :key="columnImage.column">
                <div v-if="column === columnImage.column" class="cell">
                   <img :src="columnImage.image"
                        class="image-fit"
                    />
                </div>
                
            </template>
            <div v-if="column === 1 || column === 2 ||column === 3" class="cell"></div>

            <template v-for="columnHeader in headerColumn" :key="columnHeader.column">
                <div v-if="column === columnHeader.column && (this.getBuildSkillsLength == 0 || column < 3)" class="cell">
                    {{columnHeader.label}}
                </div>
            </template>
            <div v-if="this.getBuildSkillsLength != 0 && column > 2" class="cell">
                {{getHeader(column)}}
            </div>

            <template v-for="(row, index) in gridRowsAddition" :key="index">
                <div class="cell" v-if="typeof getContent(column, row) !== 'object'">
                    {{getContent(column, row)}}
                </div>
                <div class="cell" v-else>
                    <div v-if="getContent(column, row).natLvl != 0">
                        {{getContent(column, row).natLvl}}
                    </div>
                     <div class="decoDiv" v-if="getContent(column, row).decoLvl != 0">
                         {{getContent(column, row).decoLvl}}
                     </div>
                     <!--img :src="decoImg"/-->
                </div>
            </template>

        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        data(){
            return{
                gridColumns: [1,2,3,4,5,6,7,8,9],
                
                headerColumn:[
                    {column: 1, label: "Active Skill"},
                    {column: 2, label: "Lvl"},
                    {column: 3, label: "Weapon"},
                    {column: 4, label: "Head"},
                    {column: 5, label: "Chest"},
                    {column: 6, label: "Arms"},
                    {column: 7, label: "Waist"},
                    {column: 8, label: "Legs"},
                    {column: 9, label: "Talisman"},
                    
                ],
                decoImg: require('../assets/mhw-decorations-wiki.png'),
                

                columnImageArray:[
                    /*{column: 3, image: "wpnImg"},*/
                    {column: 4, image: require('../assets/Helmet_Icon_White.webp')},
                    {column: 5, image: require('../assets/Chest_Icon_White.webp')},
                    {column: 6, image: require('../assets/Arm_Icon_White.webp')},
                    {column: 7, image: require('../assets/Waist_Icon_White.webp')},
                    {column: 8, image: require('../assets/Leg_Icon_White.webp')},
                    {column: 9, image: require('../assets/Talisman_Icon_White.webp')},
                ],

                weaponsImageArray:[

                ]
            }
        },
        props:{
        },
        computed:{
            
            ...mapGetters({
                getBuild: 'getBuild',
                getBuildSkills: 'getBuildSkills',
                getBuildSkillsLength: 'getBuildSkillsLength'
            }),

            gridRowsAddition(){
                return this.getBuildSkillsLength
            }
            
        },
        methods:{
            clearGrid: function(){

            },
            getHeader: function(column){
                switch (column){
                    case 3:
                        return this.getBuild.buildWpn._name
                    case 4:
                        return this.getBuild.buildArmor.headGear._name
                    case 5:
                        return this.getBuild.buildArmor.armsGear._name
                    case 6:
                        return this.getBuild.buildArmor.chestGear._name
                    case 7:
                        return this.getBuild.buildArmor.waistGear._name
                    case 8:
                        return this.getBuild.buildArmor.legsGear._name
                    case 9:
                        return this.getBuild.buildTalisman._name
                }
            },
            getContent: function(column, row){
                if(this.getBuildSkillsLength == 0){
                    return
                }

                const build = this.getBuild
                const buildSkills = this.getBuildSkills

                console.log(build)
                console.log(buildSkills)
                switch (column){
                    //active Skills
                    case 1:
                        return buildSkills[row-1]._name
                    //total lvl
                    case 2:
                        return buildSkills[row-1]._lvl
                    //weapon
                    case 3:
                        if(build.buildWpn._skill_array.some(skill => skill._skill_name === buildSkills[row-1]._name)){
                            let natLvl = 0
                            let decoLvl = 0
                            for(let i = 0; i < build.buildWpn._skill_array.length; i++){
                                if(build.buildWpn._skill_array[i]._skill_name === buildSkills[row-1]._name){
                                    if(build.buildWpn._skill_array[i]._is_deco === false){
                                        natLvl ++
                                    }else{
                                        decoLvl ++
                                    }
                                }
                            }
                            return{natLvl: natLvl, decoLvl: decoLvl}
                        }
                        break
                    //Head
                    case 4:
                        if(build.buildArmor.headGear._skill_array.some(skill => skill._skill_name === buildSkills[row-1]._name)){
                            let natLvl = 0
                            let decoLvl = 0
                            for(let i = 0; i < build.buildArmor.headGear._skill_array.length; i++){
                                if(build.buildArmor.headGear._skill_array[i]._skill_name === buildSkills[row-1]._name){
                                    if(build.buildArmor.headGear._skill_array[i]._is_deco === false){
                                        natLvl ++
                                    }else{
                                        decoLvl ++
                                    }
                                }
                            }
                            return{natLvl: natLvl, decoLvl: decoLvl}
                        }
                        break
                    //chest
                    case 5:
                         if(build.buildArmor.chestGear._skill_array.some(skill => skill._skill_name === buildSkills[row-1]._name)){
                            let natLvl = 0
                            let decoLvl = 0
                            for(let i = 0; i < build.buildArmor.chestGear._skill_array.length; i++){
                                if(build.buildArmor.chestGear._skill_array[i]._skill_name === buildSkills[row-1]._name){
                                    if(build.buildArmor.chestGear._skill_array[i]._is_deco === false){
                                        natLvl ++
                                    }else{
                                        decoLvl ++
                                    }
                                }
                            }
                            return{natLvl: natLvl, decoLvl: decoLvl}
                        }
                        break
                    //arms
                    case 6:
                         if(build.buildArmor.armsGear._skill_array.some(skill => skill._skill_name === buildSkills[row-1]._name)){
                            let natLvl = 0
                            let decoLvl = 0
                            for(let i = 0; i < build.buildArmor.armsGear._skill_array.length; i++){
                                if(build.buildArmor.armsGear._skill_array[i]._skill_name === buildSkills[row-1]._name){
                                    if(build.buildArmor.armsGear._skill_array[i]._is_deco === false){
                                        natLvl ++
                                    }else{
                                        decoLvl ++
                                    }
                                }
                            }
                            return{natLvl: natLvl, decoLvl: decoLvl}
                        }
                        break
                    //waist
                    case 7:
                         if(build.buildArmor.waistGear._skill_array.some(skill => skill._skill_name === buildSkills[row-1]._name)){
                            let natLvl = 0
                            let decoLvl = 0
                            for(let i = 0; i < build.buildArmor.waistGear._skill_array.length; i++){
                                if(build.buildArmor.waistGear._skill_array[i]._skill_name === buildSkills[row-1]._name){
                                    if(build.buildArmor.waistGear._skill_array[i]._is_deco === false){
                                        natLvl ++
                                    }else{
                                        decoLvl ++
                                    }
                                }
                            }
                            return{natLvl: natLvl, decoLvl: decoLvl}
                        }
                        break
                    //legs
                    case 8:
                         if(build.buildArmor.legsGear._skill_array.some(skill => skill._skill_name === buildSkills[row-1]._name)){
                            let natLvl = 0
                            let decoLvl = 0
                            for(let i = 0; i < build.buildArmor.legsGear._skill_array.length; i++){
                                if(build.buildArmor.legsGear._skill_array[i]._skill_name === buildSkills[row-1]._name){
                                    if(build.buildArmor.legsGear._skill_array[i]._is_deco === false){
                                        natLvl ++
                                    }else{
                                        decoLvl ++
                                    }
                                }
                            }
                            return{natLvl: natLvl, decoLvl: decoLvl}
                        }
                        break
                    //tal
                    case 9:
                         if(build.buildTalisman._skill_array.some(skill => skill._skill_name === buildSkills[row-1]._name)){
                            let natLvl = 0
                            let decoLvl = 0
                            for(let i = 0; i < build.buildTalisman._skill_array.length; i++){
                                if(build.buildTalisman._skill_array[i]._skill_name === buildSkills[row-1]._name){
                                    if(build.buildTalisman._skill_array[i]._is_deco === false){
                                        natLvl ++
                                    }else{
                                        decoLvl ++
                                    }
                                }
                            }
                            return{natLvl: natLvl, decoLvl: decoLvl}
                        }
                        break
                }
            }
            /*
            addImage: function(colNum){

            },
            addLabel: function(contentString){
                
            },
            displayBuild: function(build){
                this.clearGrid()

            }
            */
        }
    }
</script>

<style lang="scss">
    .animated-grid {
        /*vh => % of viewport*/ 
        height: 100%;
        width: 100%;
        display: grid;
        /*gap: 0.5rem;

        /*grid-template-areas: ;*/
        

        grid-template-columns: auto 1fr repeat(7 , 1fr);
        grid-auto-rows: repeat(auto-fit, 1fr);

        --stagger-delay: 100ms

    }

    
    @keyframes cellEntrance {
        from {
            opacity: 0;
            transform: scale(0.3);
            filter: hue-rotate(180deg);
        }
        to {
            opacity: 1;
            transform: scale(1);
            filter: hue-rotate(0deg);
        }
    }
    .cell {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: var(--mh-dark-yellow);
        border: 2px var(--mh-gray);
        border-style: dashed solid dashed solid;
        animation: cellEntrance 700ms ease-out;
        animation-fill-mode: backwards;
        color: #fff;
        white-space:nowrap;
        height: 1.5em;
    }
    .cell:hover {
        box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em, rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
        transform: translateY(-3px) scale(1.1);
    }
    .decoDiv{      
        display: flex;
        justify-content: center;
        align-items: baseline;  
        height: 1.2em;
        width: 1.2em;
        background-color: var(--mh-gray);
        clip-path:polygon(20% 0, 80% 0, 100% 20%, 100% 40%, 65% 100%, 35% 100%, 0 40%, 0 20%);
    }
    .image-fit{
        width: 1.5em;
        height: 1.5em;
        object-fit: cover;
    }
</style>