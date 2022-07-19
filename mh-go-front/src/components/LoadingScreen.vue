<template>
    <div class="loadingDiv">
        <!--div class="content-bundle"></div-->
        <div class="loadingHeader">
            <!--img-->
            Pawcessing Builds
            <!--img></img-->
        </div>
        <div class="progress-div">
            {{buildsFinished}}
            /
            {{buildsTotal}}
             calculated
        </div>
    </div>
</template>
<script>

    export default{
        props:{
            buildsTotal: Number,
            buildsFinished: Number

        },
        data(){
            return{

            }
        },
    }
</script>

<style lang="scss">
    .loadingDiv{
        height: 100vh;
        width: 100vw;
        background: var(--mh-dark-blue);
        color: var(--mh-green);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:space-around;
        position: absolute;
        top: 0px;
        left: 0px;
        text-align: center;
    }

    .loadingHeader{
        
        font-size: 3em;
       
    }
    .progress-div{
       
        font-size: 2em;
    }
</style>