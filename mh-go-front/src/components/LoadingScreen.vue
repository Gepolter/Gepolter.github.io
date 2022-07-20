<template>
    <div class="loadingDiv">
        <!--div class="content-bundle"></div-->
        <div class="workingHard">
            <div class="imgDiv">
                <img v-bind:src="leftPal" class="left-pal"/>
            </div>
            <div class="loadingHeader">
                <p>
                    Pawcessing Builds
                </p>
            </div>
            <div class="imgDiv">
                <img v-bind:src="rightPal" class="right-pal"/>
            </div>

        </div>
        <div class="progress-div">
            {{buildsFinished}}
            /
            {{buildsTotal}}
             builds calculated
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
                palicoArrayRight:[
                    {frame: 0, image: require('../assets/palicos/0000.png')},
                    {frame: 1, image: require('../assets/palicos/0001.png')},
                    {frame: 2, image: require('../assets/palicos/0002.png')},
                    {frame: 3, image: require('../assets/palicos/0003.png')},                    
                ],
                palicoArrayLeft:[
                    {frame: 0, image: require('../assets/palicos/0001mirror.png')},
                    {frame: 1, image: require('../assets/palicos/0002mirror.png')},
                    {frame: 2, image: require('../assets/palicos/0003mirror.png')},
                    {frame: 3, image: require('../assets/palicos/0000mirror.png')},                    
                ],
                rightPal: require('../assets/palicos/0000.png'),
                leftPal: require('../assets/palicos/0002mirror.png'),

                rotator: 0,
                timer: null
            }
        },
        methods: {
            loop: async function(){
                while(this.rotator == this.rotator){
                    setTimeout(() =>{
                        this.toggleImages()
                    }, 300)

                }
            },
            toggleImages: function(){
                this.rotator = (this.rotator + 1) % 4
                this.leftPal = this.palicoArrayLeft[this.rotator].image
                this.rightPal = this.palicoArrayRight[this.rotator].image
            }
        },
        mounted: function () {
            this.timer = setInterval(() => {
                this.toggleImages()
            }, 300)
        },
        beforeUnmount() {
            clearInterval(this.timer)
        }
    }
</script>

<style lang="scss">
    .loadingDiv{
        height: 100vh;
        width: 100vw;
        background: rgb(9,25,55, 0.7);
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
        border: 4px dashed var(--mh-dark-red);
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
    .left-pal{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .right-pal{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .imgDiv{
        width: 30%;
    }
    .progress-div{
        font-size: 4vw;
    }
</style>