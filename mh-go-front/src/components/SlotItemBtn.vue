<template>
    <button @click="toggleBtnState">
        <img v-bind:src="selectedImg"/>
    </button>
</template>

<script>

    export default{
        data() {
            return {
                stateArray:[
                    {selectedState: 0, image: require('../assets/mhw-decorations-wiki.png')},
                    {selectedState: 1, image: require('../assets/gem_level_1.png')},
                    {selectedState: 2, image: require('../assets/gem_level_2.png')},
                    {selectedState: 3, image: require('../assets/gem_level_3.png')}
                ],
                slotLvl: 0,
                selectedImg: require('../assets/mhw-decorations-wiki.png')
                
            }
        },
        computed: {
            //slotLvl: 0
        },
        methods:{
            toggleBtnState(){
                this.slotLvl = (this.slotLvl + 1) % 4
                for(var i = 0; i < this.stateArray.length; i++){
                    if(this.stateArray[i].selectedState === this.slotLvl){
                        this.selectedImg = this.stateArray[i].image
                    }
                }
                this.$emit('send', this.slotLvl)
            }
        }

    }
</script>