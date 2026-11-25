(function () {
  'use strict';

  var speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  var idx = 2; // 1x

  function video() {
    return document.querySelector('video');
  }

  function apply() {
    var v = video();
    if (v) v.playbackRate = speeds[idx];
  }

  function notify(text) {
    try { Lampa.Noty.show(text); } catch (e) {}
  }

  // Повторно применяем скорость: плеер любит сбрасывать её при перемотке и старте
  setInterval(apply, 1000);

  document.addEventListener('keydown', function (e) {
    var k = e.keyCode;
    // Жёлтая (405) — быстрее, синяя (406) — медленнее
    if (k !== 405 && k !== 406) return;

    var v = video();
    if (!v) {
      notify('Видеоэлемент не найден: видео играет не в Lampa');
      return;
    }
    idx = Math.max(0, Math.min(speeds.length - 1, idx + (k === 405 ? 1 : -1)));
    apply();
    notify('Скорость: ' + speeds[idx] + 'x (реально: ' + v.playbackRate + 'x)');
  });
})();