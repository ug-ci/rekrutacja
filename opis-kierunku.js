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
const kierunek = 'Biologia';
const wydzial = fallback(params.get('wydzial'), 'Wydział Biologii UG');
const poziom = fallback(params.get('poziom'), 'I stopnia');
const tryb = fallback(params.get('tryb'), 'stacjonarne');
const jezyk = fallback(params.get('jezyk'), 'polski / angielski');
const rok = fallback(params.get('rok'), '2025/26');

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

const metaLevelEl = document.getElementById('metaLevel');
if (metaLevelEl) metaLevelEl.textContent = poziom;

const metaModeEl = document.getElementById('metaMode');
if (metaModeEl) metaModeEl.textContent = tryb;

const metaFacultyEl = document.getElementById('metaFaculty');
if (metaFacultyEl) metaFacultyEl.textContent = wydzial;

const metaYearEl = document.getElementById('metaYear');
if (metaYearEl) metaYearEl.textContent = rok;

document.title = `${kierunek} — Opis kierunku | UG Rekrutacja ${rok}`;
