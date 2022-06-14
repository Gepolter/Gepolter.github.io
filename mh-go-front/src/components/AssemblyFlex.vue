<template>
    <div class="flex-container">
        <div class="flex-component2">
            Build Display
        </div>
        
        <div class="flex-component2">
           <SelectionFormWl/>
        </div>
        <div class="flex-component3">
            <SelectionFormTal/>
        </div>
    
    </div>
</template>


<script>
//import SelectionFormVue from './SelectionForm.vue'
import SelectionFormWl from './SelectionFormWl.vue'
import SelectionFormTal from './SelectionFormTal.vue';
    export default {
    data() {
        return {
        /*
        componentArray:[
            SelectionFormVue,
            SelectionFormVue,
            SelectionFormVue
        ]
        */
        };
    },
    components: { 
        SelectionFormWl,
        SelectionFormTal
    }
}
</script>

<style>
    .flex-container{
        display: flex;
        

    }

    .flex-component1{
        flex:3;
        padding-left: 5%;
        padding-right: 5%;
    }
    .flex-component2{
        flex:1;
        padding-left: 5%;
        padding-right: 5%;
    }
    .flex-component3{
        flex:1;
        padding-left: 5%;
        padding-right: 5%;
    }
</style>