/* ==========================================================================
   Portfolio de Chloé Charon - script unique

   CE FICHIER CONTIENT :
   1. le menu et le pied de page (pour les changer partout d'un coup, modifie NAV ici)
   2. l'adresse du dépôt GitHub (REPO) utilisée par les liens "Voir les fichiers"
   3. le sommaire "Sur cette page" des pages longues
   4. les filtres de la page Projets
   ========================================================================== */
(function () {
  'use strict';

  // 1. A MODIFIER si ton dépôt GitHub a un autre nom
  var REPO = 'https://github.com/AkiraValk/Portfolio_site';

  // Le menu : [identifiant de page, texte affiché, fichier]
  var NAV = [
    ['alternance',  'Alternance',  'alternance.html'],
    ['stage',       'Stage',       'stage.html'],
    ['projets',     'Projets',     'projets.html'],
    ['formation',   'Formation',   'formation.html'],
    ['competences', 'Compétences', 'competences.html'],
    ['parcours',    'Parcours',    'parcours.html'],
    ['contact',     'Contact',     'contact.html']
  ];

  var body = document.body;
  var base = body.getAttribute('data-base') || '';   // chemin vers le dossier fr/
  var current = body.getAttribute('data-nav') || '';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;'); }

  // ---- Menu ----
  var header = document.getElementById('site-header');
  if (header) {
    var links = NAV.map(function (n) {
      var cur = n[0] === current ? ' aria-current="page"' : '';
      return '<a href="' + esc(base + n[2]) + '"' + cur + '>' + n[1] + '</a>';
    }).join('');
    header.className = 'site-header';
    header.innerHTML =
      '<nav class="pill" aria-label="Navigation principale">' +
      '<a class="brand" href="' + esc(base + 'index.html') + '"><span class="pr">$</span>chloe.charon</a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links">Menu</button>' +
      '<div class="nav-links" id="nav-links">' + links +
      '<a class="cv" href="' + esc(base + 'contact.html#cv') + '">Mon CV</a></div>' +
      '</nav>';
    var toggle = header.querySelector('.nav-toggle');
    var panel = header.querySelector('.nav-links');
    toggle.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // ---- Pied de page ----
  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="wrap"><span>© 2026 Chloé Charon</span>' +
      '<span><a href="' + esc(base + 'contact.html') + '">Contact</a> · ' +
      '<a href="https://github.com/AkiraValk" rel="noopener">GitHub</a> · version française</span></div>';
  }

  // ---- 2. Liens vers le dépôt : <a data-repo="assets/BUT1/SAE1.02_IRI"> ----
  Array.prototype.forEach.call(document.querySelectorAll('a[data-repo]'), function (a) {
    a.href = REPO + '/tree/main/' + a.getAttribute('data-repo');
    a.rel = 'noopener';
    a.target = '_blank';
  });

  // ---- 3. Sommaire "Sur cette page" ----
  var toc = document.querySelector('[data-toc]');
  if (toc) {
    var heads = document.querySelectorAll('.prose > section[id] > h2');
    if (heads.length > 1) {
      var items = '';
      Array.prototype.forEach.call(heads, function (h) {
        items += '<li><a href="#' + h.parentNode.id + '">' + h.textContent + '</a></li>';
      });
      toc.innerHTML = '<p>// sur cette page</p><ol>' + items + '</ol>';
      if ('IntersectionObserver' in window) {
        var anchors = toc.querySelectorAll('a');
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              Array.prototype.forEach.call(anchors, function (a) {
                a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
              });
            }
          });
        }, { rootMargin: '0px 0px -70% 0px' });
        Array.prototype.forEach.call(heads, function (h) { io.observe(h.parentNode); });
      }
    } else {
      toc.parentNode.classList.add('no-toc');
      toc.remove();
    }
  }

  // ---- 4. Filtres de la page Projets ----
  var list = document.getElementById('project-list');
  if (list) {
    var cards = Array.prototype.slice.call(list.querySelectorAll('.pcard'));
    var state = { year: 'all', comp: 'all', q: '' };
    var count = document.getElementById('project-count');
    var search = document.getElementById('project-search');

    function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

    function apply() {
      var shown = 0;
      cards.forEach(function (c) {
        var okYear = state.year === 'all' || c.getAttribute('data-year') === state.year;
        var okComp = state.comp === 'all' || (' ' + c.getAttribute('data-comps') + ' ').indexOf(' ' + state.comp + ' ') > -1;
        var okQ = !state.q || norm(c.textContent).indexOf(state.q) > -1;
        var ok = okYear && okComp && okQ;
        c.hidden = !ok;
        if (ok) shown++;
      });
      count.textContent = shown + (shown > 1 ? ' projets affichés' : ' projet affiché');
    }

    Array.prototype.forEach.call(document.querySelectorAll('[data-filter]'), function (b) {
      b.addEventListener('click', function () {
        var key = b.getAttribute('data-filter');
        state[key] = b.getAttribute('data-value');
        Array.prototype.forEach.call(document.querySelectorAll('[data-filter="' + key + '"]'), function (o) {
          o.setAttribute('aria-pressed', o === b ? 'true' : 'false');
        });
        apply();
      });
    });
    if (search) {
      search.addEventListener('input', function () { state.q = norm(search.value.trim()); apply(); });
    }
    apply();
  }
})();
