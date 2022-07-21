<template>
    <div class="borderWrapperGuide">
        <div class="guideWindow">
            <button class="close" type="submit" @click="close">X</button>
            <div v-if="page == 0" class="guidePage">
                <div class="borderWrapperHeading">
                    <div class="guideHeading">Guide</div>
                </div>
                <div  class="contentDiv">
                    <p>Welcome Hunter!</p>
                    <p>this <span class="keyword">Guide</span> is here to help you get a grasp configuring your setup,</p>
                    <p>so our palicos can get to work assembling the perfect build for your hunting needs.</p>
                    <p>If you ever need some refresher how to use the components of this site,</p>
                    <p>just click the button titled "<span class="keyword">Guide</span>" in the upper right</p>
                    <p>and this window will reopen for you.</p>
                    <br><p></p>
                    <p>Let's get to it on the next page!</p>
                </div>
            </div>
            <div v-if="page == 1" class="guidePage">
                <div class="borderWrapperHeading">
                    <div class="guideHeading">Wishlist</div>
                </div>
                <div class="contentDiv">
                    <p>page2</p>
                    <p>next line</p>
                </div>
            </div>
            <div v-if="page == 2" class="guidePage" >
                <div class="borderWrapperHeading">
                    <div class="guideHeading">Talisman config</div>
                </div>
                <div class="contentDiv">
                    <p>page3</p>
                </div>
            </div>
            <div v-if="page == 3" class="guidePage">
                <div class="borderWrapperHeading">
                    <div class="guideHeading">Build options & table</div>
                </div>
                <div class="contentDiv">
                    <p>page4 rumor has it, some wild Palicos come out to help those, </p>
                    <p>who brave the onslaught of options...</p>
                </div>
            </div>
            <div class="nav">
                <button class="skip" type="submit" @click="prevPage" v-if="page > 0">back</button>
                <button class="skip" type="submit" @click="nextPage" v-if="page < 3">next</button>
            </div>
            <div class="pageCount">{{page + 1}} / 4</div>
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
                this.page = (this.page + 1) % 4
                console.log(this.page)
            },
            prevPage(){
                this.page = (this.page - 1) % 4
                console.log(this.page)
            }
            

        }
    }
</script>
<style lang="scss">
    .borderWrapperGuide{
        height: 40vh;
        width: 50vw;
        border: 3px solid var(--mh-gray);
        background: linear-gradient(var(--mh-dark-yellow), var(--mh-yellow));
        color: var(--mh-white);
        position: absolute;
        top: 30vh;
        left: 25vw;
        text-align: center;
        padding: 5px, 5px,5px,5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5%;
    }
    .guideWindow{
        background: linear-gradient(black, var(--mh-gray));
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 98%;
        width: 98%;
        border-radius: 1%;       
    }
    .guideWindow > div{
        width: 100%;
        font-family: "sans-serif";
    }
    .guideWindow > p{
        height: 1em;
    }
    .close{
        align-self: flex-end;
    }
    .guidePage{
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .guideHeading{
        clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%);
        background: linear-gradient(var(--mh-dark-blue), var(--mh-light-blue));
        border: 1px solid var(--mh-dark-yellow);
        width: 100%;
        text-align: center;
        
    }
    
    .borderWrapperHeading{
        clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%);
        padding: 0px 5px 0px 5px;
        position: relative;
        background: radial-gradient(var(--mh-yellow), var(--mh-dark-yellow));  
        display: flex;
        width: 50%;
        margin: 3px;
    }
    .contentDiv{
        width: 95%;
        flex: 3;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border: 4px solid orange;
        text-align: left;
    }
    .contentDiv > p{
        border-bottom: 2px dashed rgba(128, 128, 128, 0.245);
        width: 100%;
        margin: 0px;
    }
    .nav{
        height: min-content;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 3px,3px,3px,3px;
    }
    .pageCount{
    }
    .keyword{
        color: var(--mh-orange);
    }
</style>