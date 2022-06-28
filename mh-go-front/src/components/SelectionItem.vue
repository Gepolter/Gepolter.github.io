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
    }
    li{
        flex: 1;
        border-right: black;    
    }
    button{flex: 1;}
</style>
