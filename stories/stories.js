fetch('stories.json').then(r=>r.json()).then(data=>{
const f=document.getElementById('featured-story');
const c=document.getElementById('stories-container');
data.forEach(s=>{
const html=`<div class="story-card"><h3>${s.title}</h3><p>${s.story}</p><small>${s.author} • ${s.recovery}</small></div>`;
if(s.featured){f.innerHTML=html}else{c.innerHTML+=html}
});
});