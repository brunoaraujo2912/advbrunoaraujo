(function(){
  var btn=document.getElementById('menu-btn'),menu=document.getElementById('menu');
  if(btn&&menu){
    btn.addEventListener('click',function(){var o=menu.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
    menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');btn.setAttribute('aria-expanded','false')}});
  }
  document.querySelectorAll('.copy').forEach(function(b){
    b.addEventListener('click',function(){
      var el=document.getElementById(b.dataset.copy),t=el.textContent;
      function sel(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r)}
      try{navigator.clipboard.writeText(t).then(function(){b.textContent='Copiado';setTimeout(function(){b.textContent='Copiar'},1800)},sel)}catch(e){sel()}
    });
  });
  var form=document.getElementById('form');
  if(form){
    var send=document.getElementById('f-send'),err=document.getElementById('f-err');
    var n=document.getElementById('f-nome'),c=document.getElementById('f-contato'),d=document.getElementById('f-desc');
    var build=function(){
      var msg='Olá, Dr. Bruno. Gostaria de informações sobre atendimento.\n\nNome: '+n.value.trim()+'\nContato: '+c.value.trim()+'\nSituação: '+d.value.trim();
      send.href='https://wa.me/5592981024849?text='+encodeURIComponent(msg);
    };
    [n,c,d].forEach(function(f){f.addEventListener('input',function(){build();err.hidden=true})});
    send.addEventListener('click',function(e){
      if(!n.value.trim()||!c.value.trim()||!d.value.trim()){e.preventDefault();err.hidden=false;(!n.value.trim()?n:!c.value.trim()?c:d).focus();return}
      build();
    });
    form.addEventListener('submit',function(e){e.preventDefault();send.click()});
  }
  /* Consentimento e medição (Google Analytics) */
  var GA='G-LGZMCXLQNN',KEY='ba_consent',loaded=false;
  function getC(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function setC(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  function loadGA(){
    if(loaded)return;loaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments)};
    gtag('js',new Date());gtag('config',GA);
    var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA;document.head.appendChild(s);
  }
  function banner(){
    if(document.getElementById('cookie-bar'))return;
    var d=document.createElement('div');d.id='cookie-bar';d.setAttribute('role','region');d.setAttribute('aria-label','Aviso de cookies');
    d.innerHTML='<p>Este site usa cookies do Google Analytics para medir visitas e melhorar o conteúdo, somente com a sua autorização. <a href="/#privacidade">Política de privacidade</a></p><div class="cb-actions"><button type="button" class="cb-no">Recusar</button><button type="button" class="cb-yes">Aceitar</button></div>';
    document.body.appendChild(d);
    d.querySelector('.cb-yes').addEventListener('click',function(){setC('yes');d.remove();loadGA()});
    d.querySelector('.cb-no').addEventListener('click',function(){setC('no');d.remove()});
  }
  var c0=getC(); if(c0==='yes')loadGA(); else if(c0!=='no')banner();
  var legal=document.querySelector('footer .legal');
  if(legal){var pb=document.createElement('button');pb.type='button';pb.className='cookie-pref';pb.textContent='Preferências de cookies';pb.addEventListener('click',banner);legal.appendChild(document.createTextNode(' | '));legal.appendChild(pb)}
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href*="wa.me"]');
    if(a&&loaded&&window.gtag){gtag('event','generate_lead',{method:'whatsapp',tema:a.dataset.tema||'',pagina:location.pathname})}
  });
})();