<template>
    <ul style="padding-left:0px">
        <li style="display: inline;">{{skillPrio}}</li>
        <li style="display: inline;">{{skillName}}</li>
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
