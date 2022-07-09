<template>
    <div class="borderWrapper">
        <div class="selectionBox">
            <ul style="padding-left:0px">
                <li style="display: inline;">{{skillPrio}}</li>
                <li style="display: inline; flex: 3;">{{skillName}}</li>
                <li style="display: inline;">{{skillLvl}}</li>
                <button class="selectionButton" @click="click">X</button>
            </ul>
        </div>
    </div>
</template>

<script>
    
    export default{
       
        props:{
            skillName: String,
            skillLvl: Number,
            skillPrio: Number
        },
        methods:{
            click(){
                this.$emit('send', this.skillName)
            }
        }
    }
</script>
<style>
    ul{
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*border-radius: 25px;
        border: 2px solid black;
        padding: 5px 10px 5px 5px;*/
        padding: 5px 25px 5px 5px;

    }
    li{
        flex: 1; 
    }
    .selectionButton{
        display: inline;
        background-color: var(--mh-dark-red);
        color: white;
    }
    .selectionBox{
        clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%);
        background: black;
        
    }
    .borderWrapper{
        clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%);
        padding: 0px 5px 0px 5px;
        position: relative;
        background: radial-gradient(var(--mh-yellow), var(--mh-dark-yellow));

        
    }
    /*
    button{

    }*/
</style>
