<template>
    <div class="borderWrapperGuide">
        <div class="guideWindow">
            <div v-if="page == 0" class="guidePage">
                <div class="headingOneLine">
                    <div class="borderWrapperHeading">
                        <div class="guideHeading">Guide</div>
                    </div>
                    <button class="close" type="submit" @click.self="close">X</button>
                </div>
                <div class="contentDiv">
                    <div class="contentText">
                        <p>Welcome Hunter!</p>
                        <p>If you like optimizing builds,</p>
                        <p>or want to work around not owning any god level Talismans yet</p>
                        <p>you've come to the right place!</p>
                        <br><p></p>
                        <p>This <span class="keyword">Guide</span> is here to explain the basics of the Pawcessor</p>
                        <p>and help you to get a grasp on configuring your wishlists and talismans,</p>
                        <p>so our palicos can get to work assembling the purrfect build for your hunting needs.</p>
                        <br><p></p>
                        <p>If you ever need some refresher on how to use any of the components,</p>
                        <p>just click the button titled "<span class="keyword">Guide</span>" in the upper right and this panel will reopen for you.</p>
                        <br><p></p>
                        <p>Let's get to it on the next page!</p>
                    </div>
                    
                </div>
            </div>
            <div v-if="page == 1" class="guidePage">
                <div class="headingOneLine">
                    <div class="borderWrapperHeading">
                        <div class="guideHeading">Wishlist</div>
                    </div>
                    <button class="close" type="submit" @click.self="close">X</button>
                </div>
                <div class="contentDiv">
                    <div class="contentText">
                        <p>Here you choose the skills you want for your build.</p>
                        <p>Use dropdown and slider to choose the skills and levels you want.</p>
                        <p>The button "Add Skill" will add a new item to your <span class="keyword">Wishlist</span>.</p>
                        <p>Their order is important though!</p>
                        <p>You can drag & drop the skill items to change their priority.</p>
                        <p>This heavily affects how the palicos *cough* algorithm *cough*</p>
                        <p>look for the right gear and decos for your build.</p>
                        
                    </div>
                    <div class="contentImg">
                        <img v-bind:src="wlExample">
                    </div>
                </div>
            </div>
            <div v-if="page == 2" class="guidePage" >
                <div class="headingOneLine">
                    <div class="borderWrapperHeading">
                        <div class="guideHeading">Talisman config</div>
                    </div>
                    <button class="close" type="submit" @click.self="close">X</button>
                </div>
                <div class="contentDiv">
                    <div class="contentText">
                        <p>This component is quite similar to the Wishlist.</p>
                        <p>There is no priority here though.</p>
                        <p>To configure the slots of a <span class="keyword">Talisman</span>, just click the buttons with the decos images</p>
                        <p>until the their slots match your talisman.</p>
                        <p>If your <span class="keyword">Talisman</span> has less than three slots,</p>
                        <p>select the ones it has from left to right and leave the "empty" ones on the white symbol,</p>
                        <p>just like in the picture. That's it!</p>


                    </div>
                    <div class="contentImg">
                        <img v-bind:src="talExample">
                    </div>
                </div>
            </div>
            <div v-if="page == 3" class="guidePage">
                <div class="headingOneLine">
                    <div class="borderWrapperHeading">
                        <div class="guideHeading">Build options & table</div>
                    </div>
                    <button class="close" type="submit" @click.self="close">X</button>
                </div>
                <div class="contentDiv">
                    <div class="contentText">
                        <p>Everything that's left to do is select your wishlist</p>
                        <p>and the decoration slots of the weapon you want to use.</p>
                        <p>The <span class="keyword">Calculate Build</span> button will pass your order along</p>
                        <p>and our Palicos will hurry along to assemble your custom taylored mixed set</p>
                        <p>faster than a Zinogre can charge up</p>
                        <br><p></p>
                        <p>...while beeing clobbered on, if you're here on your mobile.</p>
                        <p>seriously though, the calculation will need about a minute</p>
                        <br><p></p>
                        <p>Lastly, if you like the builder please consider disabling your Adblocker,</p>
                        <p>as I'm planning to host some ads on this page,</p>
                        <p>to help pay for the hosting costs.</p>
                    </div>
                    <div class="contentImg">
                        <img v-bind:src="buildExample">
                    </div>
                </div>
            </div>
            <div class="nav">
                <button class="skip" type="submit" @click.self="prevPage" v-if="page > 0">back</button>
                <button class="skip" type="submit" @click.self="nextPage" v-if="page < 3">next</button>
            </div>
            <div class="pageCount">{{page + 1}} / 4</div>
        </div>
    </div>

    
</template>
<script>
    export default {
        data(){
            return{
                page: 0,
                buildExample: require('../assets/Build-Example.png'),
                wlExample: require('../assets/Wishlist-example.png'),
                talExample: require('../assets/Talisman-Example.png')

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
        height: 50vh;
        border: 3px solid var(--mh-gray);
        background: linear-gradient(var(--mh-dark-yellow), var(--mh-yellow));
        color: var(--mh-white);
        position: absolute;
        top: 30vh;
        align-self: center;
        text-align: center;
        padding: 5px, 5px,5px,5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1%;
        box-shadow: 5px 10px 5px black;
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
    .close{
        align-self: flex-end;
        justify-self: center;
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
    .headingOneLine{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

    }
    .headingOneLine > button{
        
    }
    .borderWrapperHeading{
        clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%);
        padding: 0px 5px 0px 5px;
        position: relative;
        background: radial-gradient(var(--mh-yellow), var(--mh-dark-yellow));  
        display: flex;
        width: 50%;
        margin: 3px;
        margin-left: 25%;
    }
    .contentDiv{
        width: 95%;
        max-height: 40vh;
        flex: 3;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        overflow-y: scroll;
    }
    .contentDiv > p{
        border-bottom: 2px dashed rgba(128, 128, 128, 0.245);
        width: 100%;
        max-height: 40vh;
        margin: 0px;
    }
    .contentText{
        text-align: left;
        flex: 1;
        max-height: 100%;
        
    }.contentText > p{
        border-bottom: 2px dashed rgba(128, 128, 128, 0.245);
        width: 100%;
        margin: 0px;
        flex: 1;
    }
    .contentImg{
        flex: 1;
    }
    .contentImg > img{
        max-height: 40vh;
        max-width: 100%;
        object-fit: cover;
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