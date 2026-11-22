(function(){
var $=function(s){return document.querySelector(s)};
var page=document.body.dataset.page;
document.querySelectorAll('nav a').forEach(function(a){if(a.dataset.p===page)a.classList.add('on')});
var y=$('#y');if(y)y.textContent=new Date().getFullYear();

// Nome com entrada letra a letra (página inicial)
var h1=$('h1[data-name]');
if(h1){var parts=['Licon Abrão','Nhatave'],i=0;h1.setAttribute('aria-label','Licon Abrão Nhatave');
parts.forEach(function(p,k){var s=document.createElement('span');s.className='l'+(k+1);s.setAttribute('aria-hidden','true');
p.split('').forEach(function(ch){var b=document.createElement('b');b.textContent=ch===' '?'\u00a0':ch;b.style.setProperty('--i',i++);s.appendChild(b)});h1.appendChild(s)})}

// Faixa de áreas
var tk=$('#tk');
if(tk){var a=['Identidade visual','Design gráfico','Modelação 3D','UI / UX','HTML · CSS · JavaScript','Design editorial'];
tk.innerHTML=a.concat(a,a,a).map(function(t){return '<span>'+t+'</span>'}).join('')}

// Foto / 3D no topo
var v3=$('#v3d');
if(v3){v3.addEventListener('click',function(){var f=$('#fig'),m=f.querySelector('model-viewer'),img=f.querySelector('img');
if(m){m.remove();img.hidden=false;v3.textContent='Ver em 3D';return}
if(!window.mv){var s=document.createElement('script');s.type='module';s.src='https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/model-viewer.min.js';document.head.appendChild(s);window.mv=1}
m=document.createElement('model-viewer');m.setAttribute('src',v3.dataset.model);m.setAttribute('camera-controls','');m.setAttribute('auto-rotate','');m.setAttribute('alt','Modelo 3D do Licon');
img.hidden=true;f.insertBefore(m,v3);v3.textContent='Ver foto'})}

// Habilidades
var cols=$('#cols');
if(cols){var sk=[['Photoshop','Ps',92,''],['Illustrator','Ai',85,''],['InDesign','Id',85,''],['After Effects','Ae',15,'learn'],['Figma','UI/UX',50,'learn'],['Blender','3D',70,''],['HTML','estrutura',80,''],['CSS','estilo',75,''],['JavaScript','interação',55,'learn']];
sk.forEach(function(s){var d=document.createElement('div');d.className='col '+s[3];
d.innerHTML='<div class="bar" role="img" aria-label="'+s[0]+' '+s[2]+'%"><i style="--v:'+s[2]+'%"></i></div><b>'+s[0]+'</b><span>'+s[1]+'</span>';cols.appendChild(d)});
new IntersectionObserver(function(es,o){if(es[0].isIntersecting){Array.prototype.forEach.call(cols.children,function(c,i){setTimeout(function(){c.classList.add('on')},i*90)});o.disconnect()}},{threshold:.3}).observe(cols)}

// Código a escrever-se
var pre=$('#code');
if(pre){var seg=[['/* a ideia ganha vida no navegador */\n','c'],['const','k'],[' ideia = '],['"a tua marca"','s'],[';\n'],['const','k'],[' resultado = design(ideia)\n  .com('],['"HTML"','s'],[', '],['"CSS"','s'],[', '],['"JavaScript"','s'],[')\n  .e('],['"cuidado em cada detalhe"','s'],[');']];
function render(n){var out='',left=n;seg.forEach(function(p){if(left<=0)return;var t=p[0].slice(0,left);left-=t.length;t=t.replace(/&/g,'&amp;').replace(/</g,'&lt;');out+=p[1]?'<span class="'+p[1]+'">'+t+'</span>':t});return out}
var total=seg.reduce(function(a,p){return a+p[0].length},0);
new IntersectionObserver(function(es,o){if(!es[0].isIntersecting)return;o.disconnect();
if(matchMedia('(prefers-reduced-motion: reduce)').matches){pre.innerHTML=render(total);return}
var n=0,t=setInterval(function(){n+=2;pre.innerHTML=render(n)+'<span class="caret"></span>';if(n>=total){clearInterval(t);pre.innerHTML=render(total)}},28)},{threshold:.5}).observe(pre)}

// Fotos que ainda não existem: mostra instrução
document.querySelectorAll('.gal img').forEach(function(im){im.addEventListener('error',function(){var f=im.parentNode;f.textContent='Coloca aqui a foto: '+im.getAttribute('src').replace('../','')})});

// Contacto → WhatsApp
var f=$('#f');
if(f)f.addEventListener('submit',function(e){e.preventDefault();var n=$('#n').value.trim(),m=$('#m').value.trim(),fb=$('#fb');
if(!n||!m){fb.textContent='Escreve o teu nome e uma breve mensagem para continuar.';return}
window.open('https://api.whatsapp.com/send?phone=258871867072&text='+encodeURIComponent('Olá! Chamo-me '+n+', '+m),'_blank','noopener,noreferrer');fb.textContent='A tua mensagem está pronta no WhatsApp.'});
})();
