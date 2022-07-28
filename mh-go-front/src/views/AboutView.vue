<template>
  <div class="about">
    <h1>About</h1>
    <hr/>
    <p>Hey there,<br>
     thank you for trying out the Gear Optimizer!<br>
     I hope you can get some use out of this project.
     If you find any bugs, problems, or have some ideas about how to make the site more intuitive,<br>
     please let me know via <a rel="stylesheet" href="mailto: mhGearOptimizer@gmail.com" target="_blank">mhGearOptimizer@gmail.com</a>. Any kind of feedback is welcome, really.<br>
    <br>
     This Website kinda grew out of an idea I had, when I was first learning how to code in 2020,<br>
     Back then, I wrote a small algorithm for setting decorations that displayed its results in the console 
     With that in mind, please be patient with updates to this site, as i can't guarantee that progress will be fast 'n steady,<br>
     but I'd love to keep working on expanding the builder to support further titles of the Monster Hunter Series and features,
     if there is some interest. <br> 
     For more details on what I'm playing around with atm, have a look at the "roadmap" section further down. 
     
     Thanks again for stopping by, and have a blast Hunting! <br><br>
     Sincerely, Dominik
     
    </p>
  </div>
  <div class="roadmap">
    <hr>
    <h2>roadmap</h2>
    <hr>
    <p>Next steps in development are:
      <ul>
        <li>Adding user registration, so you can save your talisman and wishlist configurations</li>
        <li>Make the page more intuitive, especially on mobile devices.<br>
          Therefore I'd like to overhaul some of the styling and add animations to make expanding/shrinking dropdowns less confusing</li>
        <li>Expand the Database, so i can make builders for other titles, beginning with Iceborn</li>
        <li>Afterwards I would love to add a sidebar to navigate builers for different titles</li>
        <li>More puns, better cat animations</li>
      </ul>
    </p>
  </div>
  <div class="toolsUsed">
    <h2>Tools Used</h2>
    <p>For everyone interested in the Coding process,</p>
    <p>I would also like to give Credit to the Creators of the packages I used:</p>
    <ul>
      <li><a href="https://github.com/dafcoe/vue-collapsible-panel" target="_blank">Vue-Collapsible-Panel by dafcoe</a></li>
      <li><a href="https://www.npmjs.com/package/vue-slider-component" target="_blank">Vue-Slider-Component by NightCatSama</a></li>
    </ul>
  </div>
  
</template>

<style scoped>
  .about{
    text-align: left;
    background: linear-gradient(180deg, rgba(9,25,55,1) 0%, rgba(19,48,90,1) 100%);
  }
  .roadmap{
    text-align: left;
    background: linear-gradient(var(--mh-dark-green),var(--mh-green));
  }
  .toolsUsed{
    text-align: left;
    background: linear-gradient(var(--mh-dark-red),var(--mh-red));
  }
  .about > p{
    font-family: sans-serif;
    padding: 0 1em 1em 1em;
  }
  .roadmap > p{
    font-family: sans-serif;
    padding: 0 1em 1em 1em;    
  }
  .toolsUsed > p{
    font-family: sans-serif;
    padding: 0 1em 1em 1em;    
  }
  li {
    font-family: sans-serif;
    padding: 0 1em 1em 1em;   
  }
  ul {
    display: block;
    list-style-type: square;
    padding-left: 2em;
  }
  a{
    color: var(--mh-orange);
  }
  

</style>
