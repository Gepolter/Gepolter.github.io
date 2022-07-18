<template>
    <div class="borderWrapper">
        <div class="guideWindow">
            <button class="close" type="submit" @click="closeThis()">X</button>
                <div v-if="page == 0">
                    <p></p>
                </div>
                <div v-if="page == 0">
                    <p></p>
                </div>
                <div v-if="page == 0">
                    <p></p>
                </div>
                <div v-if="page == 0">
                    <p></p>
                </div>
                <div class="pageCount"></div>
            <button class="prev" type="submit" @click="nextPage()"></button>
            <button class="next" type="submit" @click="prevPage()"></button>
        </div>
    </div>

    
</template>
<script>
    export default {
        data(){
            return{
                page: 0
            }
        }
    }
</script>
<style lang="scss">
    .guideWindow{
        height: 40vh;
        width: 50vw;
        background: var(--mh-dark-blue);
        color: var(--mh-white);
        display: flex;
        z-index: 1;
        position: fixed;
        top: 30vh;
        text-align: center;
    }
</style>