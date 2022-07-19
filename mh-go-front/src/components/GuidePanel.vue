<template>
    <div class="borderWrapperGuide">
        <div class="guideWindow">
            <button class="close" type="submit" @click="closeThis()">X</button>
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
            <button class="prev" type="submit" @click="nextPage()">back</button>
            <button class="next" type="submit" @click="prevPage()">next</button>
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
    .borderWrapperGuide{
        height: 40vh;
        width: 50vw;
        background: var(--mh-yellow);
        color: var(--mh-white);
        position: absolute;
        top: 30vh;
        left: 25vw;
        text-align: center;
        padding: 1em, 1em,1em,1em;
    }
    .guideWindow{
        background: var(--mh-gray);
        display: flex;
    }
</style>