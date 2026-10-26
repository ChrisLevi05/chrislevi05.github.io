// Клиентский поиск: загружает data/search-index.json и ищет по заголовкам и описаниям
(function () {
  var root = document.body.getAttribute('data-root') || '';
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var index = null;

  function load() {
    if (index) return Promise.resolve(index);
    return fetch(root + 'data/search-index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; return data; });
  }

  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.innerHTML = ''; return; }
    load().then(function (data) {
      var found = data.filter(function (p) {
        return (p.title + ' ' + p.description + ' ' + p.keywords).toLowerCase().indexOf(q) !== -1;
      }).slice(0, 6);
      results.innerHTML = found.length
        ? found.map(function (p) {
            return '<li><a href="' + root + p.url + '">' + p.title + '<small>' + p.description + '</small></a></li>';
          }).join('')
        : '<li><a>Ничего не найдено</a></li>';
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.search')) results.innerHTML = '';
  });
})();
