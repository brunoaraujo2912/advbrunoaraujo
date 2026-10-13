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
})();