<template>
    <button @click="toggleBtnState" class="talSlotBtn">
        <img v-bind:src="selectedImg" class="image-fit"/>
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
                    {selectedState: 3, image: require('../assets/gem_level_3.png')},
                    {selectedState: 4, image: require('../assets/gem_level_4.png')},                    
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
                this.slotLvl = (this.slotLvl + 1) % 5
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
<style>
    .talSlotBtn{
        background-color: radial-gradient(var(--mh-dark-yellow),var(--mh-gray));

    }
    .image-fit{
        height: 1.5em;
        width: 1.5em;
        object-fit: cover;
    }

</style>