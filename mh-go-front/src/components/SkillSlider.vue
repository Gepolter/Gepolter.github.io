<template>
    <div>
        <vue-slider v-model="value"></vue-slider>
    </div>
</template>


<script>
    export default{
        data() {
            return {
                value: 'sliderValue'
            }
        }
        
    }
</script>