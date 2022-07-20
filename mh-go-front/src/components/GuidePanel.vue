<template>
    <div class="borderWrapperGuide">
        <div class="guideWindow">
            <button class="close" type="submit" @click="close">X</button>
            <div v-if="page == 0">
            
                <p>Page1</p>
            </div>
            <div v-if="page == 1">
                <p>page2</p>
            </div>
            <div v-if="page == 2">
                <p>page3</p>
            </div>
            <div v-if="page == 3">
                <p>page4</p>
            </div>
            <div class="pageCount"></div>
            <div class="nav">
                <button class="skip" type="submit" @click="nextPage">back</button>
                <button class="skip" type="submit" @click="prevPage">next</button>
            </div>
        </div>
    </div>

    
</template>
<script>
    export default {
        data(){
            return{
                page: 0
            }
        },
        methods: {
            close(){
                this.$emit('close')
            },
            nextPage(){
                this.$emit('next')
            },
            prevPage(){
                this.$emit('prev')
            }
            

        }
    }
</script>
<style lang="scss">
    .borderWrapperGuide{
        height: 40vh;
        width: 50vw;
        background: radial-gradient(var(--mh-yellow), var(--mh-dark-yellow));
        color: var(--mh-white);
        position: absolute;
        top: 30vh;
        left: 25vw;
        text-align: center;
        padding: 5px, 5px,5px,5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2%;
    }
    .guideWindow{
        background: var(--mh-gray);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        height: 98%;
        width: 98%;
        border-radius: 1%;
        
    }
    .close{
        align-self: flex-end;
    }
    .nav{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 3px,3px,3px,3px;
    }
</style>