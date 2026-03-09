const nav = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('mobileMenu')?.classList.toggle('open');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu')?.classList.remove('open');
    });
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function fallback(value, defaultValue) {
    return value && value.trim() ? value.trim() : defaultValue;
}

const params = new URLSearchParams(window.location.search);
const kierunek = fallback(params.get('kierunek'), 'Informatyka');
const wydzial = fallback(params.get('wydzial'), 'Wydział Matematyki, Fizyki i Informatyki');
const poziom = fallback(params.get('poziom'), 'I stopnia');
const tryb = fallback(params.get('tryb'), 'stacjonarne');
const jezyk = fallback(params.get('jezyk'), 'polski');

const nameEl = document.getElementById('kierunekName');
if (nameEl) nameEl.textContent = kierunek;

const facultyEl = document.getElementById('kierunekFaculty');
if (facultyEl) facultyEl.textContent = wydzial;

const facultySummaryEl = document.getElementById('kierunekFacultySummary');
if (facultySummaryEl) facultySummaryEl.textContent = wydzial;

const levelEl = document.getElementById('kierunekLevel');
if (levelEl) levelEl.textContent = poziom;

const modeEl = document.getElementById('kierunekMode');
if (modeEl) modeEl.textContent = tryb;

const langEl = document.getElementById('kierunekLang');
if (langEl) langEl.textContent = jezyk;

const modeLangEl = document.getElementById('kierunekTrybJezyk');
if (modeLangEl) modeLangEl.textContent = `${tryb} · ${jezyk}`;

document.title = `${kierunek} — Opis kierunku | UG Rekrutacja 2026/2027`;
