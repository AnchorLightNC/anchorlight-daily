const DATA_URL='daily.json';

async function loadDaily(){
 const res=await fetch(DATA_URL);
 const data=await res.json();

 const now=new Date();
 const start=new Date(now.getFullYear(),0,0);
 const day=Math.floor((now-start)/86400000);

 const item=data[(day-1)%data.length];

 date.textContent=now.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
 title.textContent=item.title||'';
 quote.textContent='“'+item.quote+'”';
 reflection.textContent=item.reflection;
 challenge.textContent=item.challenge;

 if(item.verse){
   verse.textContent=item.verse;
   verseBox.style.display='block';
 }

 window.currentQuote=item.quote;
}

function copyQuote(){
 navigator.clipboard.writeText(window.currentQuote||'');
 alert('Quote copied!');
}

function shareQuote(){
 const txt=window.currentQuote||'';
 if(navigator.share){
   navigator.share({title:'AnchorLight Daily',text:txt,url:location.href});
 }else{
   window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href));
 }
}

loadDaily().catch(console.error);
