'use strict';

const replies = {
  'Programowanie': 'Świetny wybór! Polecam <strong>Informatykę</strong> (12 os./miejsce!) lub <strong>Informatykę i ekonometrię</strong> na WMFiI. Chcesz poznać progi punktowe?',
  'Nauka i badania': 'Polecam <strong>Biotechnologię</strong>, <strong>Chemię medyczną</strong> lub <strong>Oceanografię</strong> — unikatowe kierunki z dostępem do nowoczesnych laboratoriów. Który obszar Cię fascynuje?',
  'Prawo': 'Mamy <strong>Prawo</strong> (jedn. mag.), popularną <strong>Kryminologię</strong> (11 os./miejsce!) i <strong>Administrację</strong>. Wszystko na Wydziale Prawa. Co Cię bardziej interesuje?',
  'Języki i świat': 'Polecam <strong>Japonistykę</strong>, <strong>Lingwistykę stosowaną</strong>, <strong>Global Studies</strong> (po angielsku!) lub <strong>Skandynawistykę</strong>. Chcesz wyjechać na Erasmus?',
  'Biznes i finanse': 'Wydział Ekonomiczny w Sopocie to świetny wybór! <strong>Finanse i rachunkowość</strong>, <strong>Zarządzanie</strong>, <strong>Logistyka</strong> lub nowy <strong>Logistics and Mobility</strong> po angielsku. Co Cię bardziej interesuje?',
};

const defaults = [
  'Rozumiem! Powiedz mi więcej — bardziej interesują Cię nauki ścisłe, humanistyczne czy społeczne?',
  'Ciekawe! A jak wyglądają Twoje wyniki z matury? Pytam, żeby dobrać kierunek z realną szansą na dostanie się.',
];

module.exports = {
  async chat(ctx) {
    const { message } = ctx.request.body;

    if (!message || typeof message !== 'string') {
      return ctx.badRequest('Message is required');
    }

    const reply = replies[message.trim()] ||
      defaults[Math.floor(Math.random() * defaults.length)];

    return { reply };
  },
};
