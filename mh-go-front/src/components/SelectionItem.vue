<template>
    <ul style="padding-left:0px">
        <li style="display: inline;">{{skillPrio}}</li>
        <li style="display: inline; flex: 3;">{{skillName}}</li>
        <li style="display: inline;">{{skillLvl}}</li>
        <button style="display: inline;" @click="click">X</button>
    </ul>
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
        border-radius: 25px;
        border: 2px solid black;
        padding: 5px 10px 5px 5px;

    }
    li{
        flex: 1;
        border-right: black;    
    }
    /*
    button{

    }*/
</style>
