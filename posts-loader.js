/**
 * Универсальный загрузчик карточек статей.
 * Читает js/posts.json и рендерит карточки в контейнер [data-posts-grid].
 *
 * Атрибуты сетки:
 *   data-json-base — путь к posts.json относительно страницы (по умолчанию "js/posts.json");
 *   data-limit     — максимальное число выводимых карточек (0/нет = все).
 *
 * Новая статья = новая запись в js/posts.json + HTML-файл по указанному url.
 */
(function () {
  'use strict';

  var grid = document.querySelector('[data-posts-grid]');
  if (!grid) return;

  var jsonBase = grid.dataset.jsonBase || 'js/posts.json';
  var limit = parseInt(grid.dataset.limit || '0', 10) || 0;

  fetch(jsonBase)
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (posts) {
      if (!Array.isArray(posts)) throw new Error('bad json');
      if (limit > 0) posts = posts.slice(0, limit);

      var frag = document.createDocumentFragment();
      posts.forEach(function (p) {
        var meta = [];
        if (p.date) meta.push(p.date);
        if (p.read) meta.push(p.read);

        var a = document.createElement('a');
        a.className = 'post-card';
        a.href = p.url || '#';
        a.innerHTML =
          '<article class="post-card__inner">' +
            '<h3 class="post-card__title">' + p.title + '</h3>' +
            (p.excerpt ? '<p class="post-card__excerpt">' + p.excerpt + '</p>' : '') +
            (meta.length ? '<div class="post-card__meta">' + meta.join(' · ') + '</div>' : '') +
            '<span class="post-card__more">Читать →</span>' +
          '</article>';
        frag.appendChild(a);
      });

      grid.appendChild(frag);
    })
    .catch(function () {
      grid.innerHTML = '<p class="posts-empty">Статей пока нет.</p>';
    });
})();