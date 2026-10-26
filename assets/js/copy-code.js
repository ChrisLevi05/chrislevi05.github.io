// Кнопка «Копировать» для каждого блока кода
document.querySelectorAll('pre').forEach(function (pre) {
  var btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'Копировать';
  btn.addEventListener('click', function () {
    navigator.clipboard.writeText(pre.innerText.replace('Копировать', '').trim()).then(function () {
      btn.textContent = 'Скопировано';
      setTimeout(function () { btn.textContent = 'Копировать'; }, 1500);
    });
  });
  pre.appendChild(btn);
});
