(()=>{'use strict';
// Keep the site's native interactions; add minimal cinematic scroll behavior.
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('editorial-visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.model-panel,.gallery-tile').forEach(e=>{e.classList.add('editorial-enter');io.observe(e)})}
const hero=document.querySelector('.hero-media img');if(hero){hero.addEventListener('error',()=>{hero.src='assets/p1-hero.webp'},{once:true})}
})();