<template>
<fieldset class="cyclestate" id="x">
    <legend></legend>
    <input id="one" type="radio" name="r" checked>
    <label for="one">
        <img src="../assets/mhw-decorations-wiki.png"/>
    </label>
    <input id="two" type="radio" name="r">
    <label for="two">
        <img src="../assets/gem_level_1.png"/>   
    </label>
    <input id="three" type="radio" name="r">
    <label for="three">
        <img src="../assets/gem_level_2.png"/>
    </label>
    <input id="four" type="radio" name="r">
    <label for="four">
        <img src="../assets/gem_level_3.png"/>
    </label>
</fieldset>
</template>

<script>

</script>

<style>
    .cyclestate {
    display: inline-grid;
    }
    .cyclestate label {
    grid-area: 1 / 1;
    background-color: rgba(121, 112, 112, 0.596); 
    color: black;
    z-index: 0;
    opacity: 0;
    }
    .cyclestate input {
    position: absolute;
    z-index: -1;
    }
    .cyclestate input:checked + label {
    opacity: 1;
    }
    .cyclestate input:first-of-type + label {
    z-index: 2;
    }
    .cyclestate input:checked + label + input + label {
    opacity: 0;
    z-index: 2;
    }
    /* -- Unrelated and accessibility -- */
    .cyclestate { border: none; padding: 0; }
    .cyclestate legend { position: absolute; }
    /*previous padding = 1em*/
    .cyclestate label { padding: 1px; text-align: center; display: inline-block; cursor: pointer; user-select: none;
    }
    .cyclestate label::before { content: '← '; }
    .cyclestate label::after { content: ' →'; }
    .cyclestate label::before, label::after { color: transparent; }
    .cyclestate input:focus-visible + label { outline: solid; }
    .cyclestate input:focus-visible + label::before,
    .cyclestate input:focus-visible + label::after { color: currentcolor; }
</style>