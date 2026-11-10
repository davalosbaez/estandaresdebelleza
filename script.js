const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const feedPosts = [
  {user:"@sofia.17", likes:"1.248", text:"Hoy finalmente me siento linda 💗", tag:"selfie · filtro", cls:""},
  {user:"@valen.r", likes:"3.872", text:"Necesito cambiar algunas cosas de mi cuerpo 😭", tag:"outfit · edit", cls:"two"},
  {user:"@micaela", likes:"928", text:"Mi rutina para una piel perfecta ✨", tag:"skincare · rutina", cls:"three"},
  {user:"@agus.c", likes:"2.106", text:"¿Qué opinan de este look? ♡", tag:"beauty · tendencia", cls:""},
];
function renderFeed(){
  const wrap=$("#feedCards");
  wrap.innerHTML=feedPosts.map(p=>`
    <article class="feed-card">
      <div class="feed-photo ${p.cls}">
        <div class="fake-face"></div>
        <div class="photo-tag">${p.tag}</div>
      </div>
      <div class="feed-info">
        <strong>${p.user}</strong>
        <p>${p.text}</p>
        <div class="feed-actions">♡　⌁　☻ <span style="margin-left:auto;font-size:10px">${p.likes} likes</span></div>
      </div>
    </article>`).join("");
}
renderFeed();

$("#startBtn").addEventListener("click",()=>{$("#intro").classList.add("hidden"); setTimeout(()=>$("#feed").scrollIntoView({behavior:"smooth"}),450)});

$$(".choice").forEach(btn=>btn.addEventListener("click",()=>{
  $$(".choice").forEach(x=>x.classList.remove("selected"));
  btn.classList.add("selected");
  const result=$("#choiceResult");
  result.hidden=false;
  result.innerHTML=`Elegiste <strong>${btn.dataset.choice}</strong>. No es una prueba: es una pausa para notar qué pasa cuando una imagen ajena se convierte en medida para vos.`;
}));

$("#revealBtn").addEventListener("click",()=>{
  $("#analysisPanel").classList.add("revealed");
  $("#revealBtn").textContent="✓ Ya viste lo que había detrás";
  $("#revealBtn").disabled=true;
});

const counters=$$(".stat-number");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el=e.target; const target=parseFloat(el.dataset.target); let start=0; const duration=1100; const t0=performance.now();
    function tick(t){
      const p=Math.min((t-t0)/duration,1); const eased=1-Math.pow(1-p,3);
      el.textContent=(target*eased).toFixed(1);
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick); observer.unobserve(el);
  });
},{threshold:.4});
counters.forEach(c=>observer.observe(c));

const influenceText={
 social:{title:"Redes sociales",text:"La exposición constante a imágenes editadas, filtros, comparación social y búsqueda de validación digital puede favorecer la internalización de ideales estéticos."},
 media:{title:"Medios",text:"Publicidad, contenidos audiovisuales y tendencias pueden repetir determinados modelos de belleza hasta hacerlos parecer naturales o universales."},
 family:{title:"Familia",text:"El discurso familiar puede reforzar estándares rígidos, pero también puede funcionar como factor de protección al promover aceptación y diversidad."},
 culture:{title:"Cultura",text:"Los rasgos considerados bellos no aparecen en el vacío: están atravesados por normas culturales, históricas y sociales."}
};
$$(".influence-node").forEach(btn=>btn.addEventListener("click",()=>{
  const d=influenceText[btn.dataset.influence];
  $("#influenceInfo").innerHTML=`<h3>${d.title}</h3><p>${d.text}</p>`;
}));

const sortItems=[
  ["Me cuido la piel porque disfruto mi rutina.","care"],
  ["Hago ejercicio porque siento que si no lo hago, mi cuerpo no es suficiente.","pressure"],
  ["Me maquillo porque me divierte experimentar.","care"],
  ["Evito comer porque quiero parecerme a alguien de internet.","pressure"],
  ["Me arreglo porque me gusta cómo me siento cuando lo hago.","care"],
  ["Cambio mi ropa para que nadie piense que me veo mal.","pressure"]
];
let sortIndex=0, score=0;
function showSort(){
  if(sortIndex>=sortItems.length){
    $("#sortQuote").innerHTML=`¡Terminaste!<br><small style="font:600 12px Inter;color:#6a838b">La diferencia no siempre está en lo que hacemos, sino en desde dónde lo hacemos.</small>`;
    $(".sort-actions").style.display="none"; $("#sortProgress").style.width="100%";
    return;
  }
  $("#sortQuote").textContent=sortItems[sortIndex][0];
  $("#sortProgress").style.width=`${(sortIndex/sortItems.length)*100}%`;
  $("#sortFeedback").textContent="";
}
$$(".sort-btn").forEach(btn=>btn.addEventListener("click",()=>{
  if(sortIndex>=sortItems.length)return;
  const correct=btn.dataset.sort===sortItems[sortIndex][1];
  if(correct){score++;$("#sortFeedback").textContent="✓ Buena lectura. El motivo importa."}
  else{$("#sortFeedback").textContent="↺ Mirá de nuevo la frase: ¿hay elección o miedo a no encajar?"}
  sortIndex++; setTimeout(showSort,650);
}));
showSort();

$("#mirrorBtn").addEventListener("click",()=>document.querySelector(".reflection-section").scrollIntoView({behavior:"smooth"}));

$$(".word-cloud button").forEach(b=>b.addEventListener("click",()=>addWallMessage(b.textContent)));
$("#addMessage").addEventListener("click",()=>{
  const input=$("#messageInput"); const value=input.value.trim(); if(!value)return; addWallMessage(value); input.value="";
});
$("#messageInput").addEventListener("keydown",e=>{if(e.key==="Enter")$("#addMessage").click()});
function addWallMessage(text){
  const span=document.createElement("span"); span.textContent=text; $("#messageWall").prepend(span);
}

const modal=$("#modal");
function openModal(html){$("#modalContent").innerHTML=html;modal.classList.add("open");modal.setAttribute("aria-hidden","false")}
$("#closeModal").addEventListener("click",()=>modal.classList.remove("open"));
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});
$("#restartBtn").addEventListener("click",()=>location.reload());

$("#menuBtn").addEventListener("click",()=>{
  const nav=$(".topbar nav");
  nav.style.display=nav.style.display==="flex"?"none":"flex";
  if(nav.style.display==="flex"){nav.style.position="absolute";nav.style.top="64px";nav.style.left="0";nav.style.right="0";nav.style.padding="20px";nav.style.background="rgba(253,249,250,.96)";nav.style.flexDirection="column";}
});
