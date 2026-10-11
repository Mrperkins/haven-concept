(()=>{'use strict';
const assets={graphite:'haven-black-gold.svg',silver:'haven-arctic-white.svg',blue:'haven-midnight-blue.svg',red:'haven-crimson-red.svg',bronze:'haven-frosted-bronze.svg',obsidian:'haven-obsidian-black.svg',white:'haven-arctic-white.svg',green:'haven-deep-green.svg'};
const car=document.getElementById('configCar');if(!car)return;
const stage=car.closest('.config-stage');if(stage)stage.classList.add('reference-mode');
const apply=(color)=>{if(!assets[color])return;car.src='assets/'+assets[color];car.alt='HAVEN '+color+' photographic concept reference';};
document.querySelectorAll('[data-color]').forEach(b=>b.addEventListener('click',()=>{apply(b.dataset.color)}));
const selected=document.querySelector('[data-color][aria-pressed="true"]');apply(selected?.dataset.color||'graphite');
})();