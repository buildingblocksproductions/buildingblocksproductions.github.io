(function(){
  var views = Array.prototype.slice.call(document.querySelectorAll('[data-view]'));
  var names = views.map(function(v){ return v.getAttribute('data-view'); });
  var titles = {
    'home':'Building Blocks Productions',
    'films':'Films · Building Blocks Productions',
    'survive':'Survive: The Game · Building Blocks Productions',
    'road-to-recovery':'Road to Recovery · Building Blocks Productions',
    'building-blocks':'Building Blocks (short) · Building Blocks Productions',
    'company':'Company · Building Blocks Productions',
    'press':'Press · Building Blocks Productions',
    'industry':'Industry · Building Blocks Productions',
    'contact':'Contact · Building Blocks Productions'
  };
  var section = {'survive':'films','road-to-recovery':'films','building-blocks':'films'};
  var header = document.querySelector('header.site');
  var menuBtn = document.getElementById('menu-btn');

  function show(){
    var raw = (location.hash || '').replace('#','').split('?');
    var h = raw[0];
    var qs = new URLSearchParams(raw[1] || '');
    var topic = qs.get('topic');
    var sel = document.getElementById('c-topic'), msg = document.getElementById('c-msg');
    if (h === 'contact' && sel && msg) {
      if (topic) { sel.value = topic; }
      var pre = qs.get('msg');
      if (pre && (!msg.value || msg.getAttribute('data-auto'))) { msg.value = pre; msg.setAttribute('data-auto','1'); }
      if (!topic && !pre && msg.getAttribute('data-auto')) { msg.value = ''; msg.removeAttribute('data-auto'); sel.value = 'General'; }
    }
    if (names.indexOf(h) === -1) h = 'home';
    views.forEach(function(v){ v.classList.toggle('on', v.getAttribute('data-view') === h); });
    var active = section[h] || h;
    document.querySelectorAll('[data-nav]').forEach(function(a){
      if (a.getAttribute('data-nav') === active) a.setAttribute('aria-current','page');
      else a.removeAttribute('aria-current');
    });
    document.title = titles[h];
    header.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
    window.scrollTo(0,0);
  }
  var cm = document.getElementById('c-msg');
  if (cm) cm.addEventListener('input', function(){ cm.removeAttribute('data-auto'); });
  window.addEventListener('hashchange', show);
  show();

  menuBtn.addEventListener('click', function(){
    var open = header.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.querySelectorAll('.js-form').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var note = document.getElementById(form.getAttribute('data-note'));
      if (note) note.textContent = 'Preview only: this form isn’t connected yet, so nothing was sent.';
    });
  });
})();
