const MONTHS=['january','february','march','april','may','june','july','august','september','october','november','december'];
async function loadDaily(){const n=new Date();const month=MONTHS[n.getMonth()];const res=await fetch(month+'.json');const data=await res.json();const item=data[Math.min(n.getDate()-1,data.length-1)];
date.textContent=n.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
title.textContent=item.title||'';quote.textContent='“'+item.quote+'”';reflection.textContent=item.reflection;challenge.textContent=item.challenge;
if(item.verse){verse.textContent=item.verse;verseBox.hidden=false;}
window.current=item;}
function copyQuote(){navigator.clipboard.writeText(window.current?.quote||'');alert('Copied!');}
function shareQuote(){const t=window.current?.quote||'';if(navigator.share){navigator.share({title:'AnchorLight Daily',text:t,url:location.href});}else{window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href));}}
function toggleFavorite(){if(!window.current)return;let f=JSON.parse(localStorage.getItem('al_favorites')||'[]');if(!f.find(x=>x.title===window.current.title)){f.push(window.current);localStorage.setItem('al_favorites',JSON.stringify(f));alert('Saved to favorites');}else{alert('Already saved');}}
loadDaily().catch(console.error);
