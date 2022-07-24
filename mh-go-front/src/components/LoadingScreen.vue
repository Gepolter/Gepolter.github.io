<template>
    <div class="loadingDiv">
        <!--div class="content-bundle"></div-->
        <div class="workingHard">
            <div class="imgDivCss">
                <img v-bind:src='leftPal' id="pal"/>
                <img v-bind:src="leftPal1" id="pal1"/>
                <img v-bind:src="leftPal2" id="pal2"/>
                <img v-bind:src="leftPal3" id="pal3"/>
            </div>
            <div class="loadingHeader">
                <p>
                    Pawcessing Builds
                </p>
            </div>
            <div class="imgDivCss">
                <img v-bind:src='rightPal' id="pal"/>
                <img v-bind:src="rightPal1" id="pal1"/>
                <img v-bind:src="rightPal2" id="pal2"/>
                <img v-bind:src="rightPal3" id="pal3"/>
            </div>

        </div>
        <!--div class="progress-div">
            {{buildsFinished}}
            /
            {{buildsTotal}}
             builds calculated
        </div-->
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
                rightPal: require('../assets/palicos/0000.png'),
                rightPal1: require('../assets/palicos/0001.png'),
                rightPal2: require('../assets/palicos/0002.png'),
                rightPal3: require('../assets/palicos/0003.png'),
                
                leftPal: require('../assets/palicos/0002mirror.png'),
                leftPal1: require('../assets/palicos/0003mirror.png'),
                leftPal2: require('../assets/palicos/0000mirror.png'),
                leftPal3: require('../assets/palicos/0001mirror.png'),

                rotator: 0,
                timer: null
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss">
    .loadingDiv{
        height: 100vh;
        width: 100vw;
        background: rgb(9,25,55, 0.9);
        color: var(--mh-green);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:center;
        position: absolute;
        top: 0px;
        left: 0px;
        text-align: center;
        overflow: hidden;
    }

    .workingHard{
        border: 10px outset var(--mh-orange);
        border-radius: 35%;
        font-size: 3em;
        
        width: 95%;
        height: 70%;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content:space-around;
       
    }
    .loadingHeader{
        border: 4px dashed var(--mh-dark-yellow);
        font-size: 7vw;
        
        width: 40%;
        height: 40%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:space-around;
        padding: 10px;
       
    }
    .progress-div{
        font-size: 4vw;
    }
    .imgDivCss{
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .imgDivCss img {     
        position: fixed;
        top: 40%;
        animation-name: switch;
        animation-iteration-count: infinite;
        animation-duration: 1.2s;
    }
    @keyframes switch{
        0% {opacity: 1;}
        25% {opacity: 1;}
        26% {opacity: 0;}
        100% {opacity: 0;}
    }

    #pal{
        width: 20%;
        object-fit: cover;
    }
    #pal1{
        animation-delay: -300ms;
        width: 20%;
        object-fit: cover;
    }
    #pal2{
        animation-delay: -600ms;
        width: 20%;
        object-fit: cover;
    }
    #pal3{
        animation-delay: -900ms;
        width: 20%;
        object-fit: cover;
    }
    
</style>