
function saveConfig(){
 localStorage.setItem('dbUrl',document.getElementById('dbUrl').value.trim());
}
function loadData(){
 let url=document.getElementById('dbUrl').value.trim();
 let secret=document.getElementById('dbSecret').value.trim();
 if(!url){alert('Isi URL');return;}
 fetch(url+'.json?auth='+secret).then(r=>r.json()).then(d=>{
   let out='';
   if(d){
     Object.keys(d).forEach(k=>{
        out += `<div><input type='checkbox' class='ck' data-key='${k}'> ${k}</div>`;
     });
   }
   document.getElementById('userList').innerHTML=out;
 });
}
function getSel(){return [...document.querySelectorAll('.ck:checked')].map(e=>e.dataset.key);}
function openMultiEdit(){
 if(getSel().length===0){alert('Pilih data');return;}
 document.getElementById('multiModal').style.display='flex';
}
function closeMulti(){document.getElementById('multiModal').style.display='none';}
function applyMultiEdit(){
 let url=document.getElementById('dbUrl').value.trim();
 let secret=document.getElementById('dbSecret').value.trim();
 let u=document.getElementById('multi_username').value.trim();
 let p=document.getElementById('multi_password').value.trim();
 let e=document.getElementById('multi_expiry').value.trim();
 getSel().forEach(k=>{
   let payload={};
   if(u) payload.username=u;
   if(p) payload.password=p;
   if(e) payload.expiry=e;
   fetch(url+'/'+k+'.json?auth='+secret,{method:'PATCH',body:JSON.stringify(payload)});
 });
 closeMulti();
 loadData();
}
