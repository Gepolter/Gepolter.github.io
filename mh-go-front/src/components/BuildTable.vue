<template>
    <section class="animated-grid">
        <div v-for="(columnGrid, index) in gridColumns" :key="index">
            <template v-for="columnImage in columnImageArray" :key="columnImage.column">
                <div v-if="columnGrid === columnImage.column" class="cell">
                   <img :src="columnImage.image"
                        style="width: 30%; height: auto;"
                    />
                </div>
                
            </template>
            <div v-if="columnGrid === 1 || columnGrid === 2 ||columnGrid === 3">a</div>

            <template v-for="columnHeader in headerColumn" :key="columnHeader.column">
                <div v-if="columnGrid === columnHeader.column" class="cell">
                    {{columnHeader.label}}
                </div>
            </template>

            <template v-for="(n, index) in gridRowsAddition" :key="index">
                <div class="cell">{{n}}</div>
            </template>

        </div>
    </section>
</template>

<script>
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
                //gridRows are always = amount of skills in build
                gridRowsAddition: 15,


                columnImageArray:[

                    /*{column: 3, image: "wpnImg"},*/
                    {column: 4, image: require('../assets/mhw-helm-headgear-wiki.png')},
                    {column: 5, image: require('../assets/mhw-torso-chest-plate-wiki.png')},
                    {column: 6, image: require('../assets/mhw-arm-gauntlets-wiki.png')},
                    {column: 7, image: require('../assets/mhw-waist-belt-wiki.png')},
                    {column: 8, image: require('../assets/mhw-feet-boots-greaves.png')},
                    {column: 9, image: require('../assets/mhw-charms-wiki.png')}
                ],

                weaponsImageArray:[

                ]
            }
        },
        props:{
            skilllArray: Array,
            build: Array,


        },
        methods:{
            clearGrid: function(){

            },
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

    @media only screen and (max-width: 768px){
        .animated-grid {transform:rotate(90deg);}
    }

    .animated-grid {
        /*vh => % of viewport*/ 
        height: 100%;
        width: 100%;
        display: grid;
        gap: 0.5rem;

        /*grid-template-areas: ;*/
        

        grid-template-columns: auto 1fr repeat(7 , 1fr);
        grid-auto-rows: repeat(auto-fit, 1fr);

        --stagger-delay: 100ms

    }

    body {
        background-color: rgb(19, 19, 19);
        color:gray;
        font-family: "monsterhunter", Avenir, sans-serif;
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
        background-color: #1ea334;
        animation: cellEntrance 700ms ease-out;
        animation-fill-mode: backwards;
        color: #fff;
        white-space:nowrap
    }

    /*@for $i from 1 through */
    .cell:nth-child(n){

    }
/*
    .cell {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #353535;
        font-size: 2rem;
        color: #fff;
        box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
        height: 100%;
        width: 100%;
        border-radius: 4px;
        transition: all 500ms;
        overflow: hidden;

        background-size: cover;
        background-position: center;
        background-repeat: no-repeat
    }
*/
    .cell:hover {
        box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em, rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
        transform: translateY(-3px) scale(1.1);
 }
</style>