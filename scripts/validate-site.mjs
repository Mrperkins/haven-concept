import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=process.cwd();
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const dupes=ids.filter((x,i)=>ids.indexOf(x)!==i);
assert.equal(dupes.length,0,'Duplicate ids: '+dupes.join(', '));
const urls=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1])
  .filter(u=>!u.startsWith('#') && !/^(https?:|data:|mailto:|tel:)/.test(u));
for(const url of urls){assert(fs.existsSync(path.join(root,url.split('?')[0])),`Broken local reference: ${url}`);}
for(const f of ['docs/HAVEN_Investor_Deck.pdf','docs/HAVEN_Manufacturing_Partner_Deck.pdf',
 'docs/HAVEN_Investor_Deck.pptx','docs/HAVEN_Manufacturing_Partner_Deck.pptx',
 'assets/p1-hero.webp','assets/p1r-cinematic.webp','css/site.css','js/site.js']){
 assert(fs.statSync(path.join(root,f)).size>100,`${f} missing or too small`);
}
for(const section of ['models','philosophy','architecture','configure','studio','collaborate']){
 assert(ids.includes(section),`Missing section: ${section}`);
}
assert(html.includes('EARLY-STAGE DISCLOSURE') && html.includes('not a current vehicle manufacturer'),'Missing concept disclaimer');
console.log(`HAVEN static QA passed: ${ids.length} unique ids, ${urls.length} local asset links, 6 required sections, 2 decks.`);
