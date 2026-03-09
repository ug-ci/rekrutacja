  // Navbar scroll
        const nav = document.getElementById('navbar');
        window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

        // Hamburger
        document.getElementById('hamburger').addEventListener('click', () =>
            document.getElementById('mobileMenu').classList.toggle('open'));
        document.querySelectorAll('.mobile-menu a').forEach(a =>
            a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open')));

        // Reveal
        const ro = new IntersectionObserver(entries =>
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

        // FAQ
        function toggleFaq(el) {
            const item = el.parentElement;
            const was = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!was) item.classList.add('open');
        }

        const kierunkiRawData = `
Studia interdyscyplinarne
Studia stacjonarne
Indywidualne Studia Międzydziedzinowe , studia stacjonarne I stopnia
Indywidualne Studia Międzydziedzinowe, studia stacjonarne II stopnia
Międzyuczelniany Wydział Biotechnologii UG i GUMed
Studia stacjonarne
Biotechnologia, studia stacjonarne I stopnia
Biotechnologia, studia stacjonarne II stopnia
Wydział Biologii
Studia stacjonarne
Biologia, studia stacjonarne I stopnia
Biologia, studia stacjonarne II stopnia
Biologia medyczna, studia stacjonarne I stopnia
Biologia medyczna, studia stacjonarne II stopnia
Genetyka i biologia eksperymentalna, studia stacjonarne I stopnia
Ochrona zasobów przyrodniczych, studia stacjonarne I stopnia
Wydział Chemii
Studia stacjonarne
Analityka kryminalistyczna, studia stacjonarne I stopnia
Biznes chemiczny, studia stacjonarne II stopnia
Biznes chemiczny studia inżynierskie, studia stacjonarne I stopnia
Chemia, studia stacjonarne I stopnia
Chemia, studia stacjonarne II stopnia
Chemia, specjalność Digital Chemistry, studia stacjonarne II stopnia
Ochrona środowiska, studia stacjonarne I stopnia
Ochrona środowiska, studia stacjonarne II stopnia
Wydział Ekonomiczny
Studia stacjonarne
Biznes i technologia ekologiczna, studia stacjonarne II stopnia
Ekonomia, studia stacjonarne I stopnia
Ekonomia, studia stacjonarne II stopnia
International Business, studia stacjonarne I stopnia
International Business, studia stacjonarne II stopnia
Logistics and mobility, studia stacjonarne I stopnia
Logistics and Mobility, studia stacjonarne II stopnia
Międzynarodowe stosunki gospodarcze, studia stacjonarne I stopnia
Międzynarodowe stosunki gospodarcze, studia stacjonarne II stopnia
Studia niestacjonarne - zaoczne
Ekonomia, studia niestacjonarne - zaoczne I stopnia
Ekonomia, studia niestacjonarne - zaoczne II stopnia
Międzynarodowe stosunki gospodarcze, studia niestacjonarne - zaoczne I stopnia
Międzynarodowe stosunki gospodarcze, studia niestacjonarne - zaoczne II stopnia
Wydział Filologiczny
Studia stacjonarne
Amerykanistyka, studia stacjonarne I stopnia
Amerykanistyka, studia stacjonarne II stopnia
Cultural Communication, studia stacjonarne I stopnia
Etnofilologia kaszubska, studia stacjonarne I stopnia
Filologia angielska, studia stacjonarne I stopnia
Filologia angielska, studia stacjonarne II stopnia
Filologia germańska, studia stacjonarne I stopnia
Filologia germańska, studia stacjonarne II stopnia
Filologia klasyczna, studia stacjonarne I stopnia
Filologia klasyczna, studia stacjonarne II stopnia
Filologia polska, studia stacjonarne I stopnia
Filologia polska, studia stacjonarne II stopnia
Filologia romańska (z drugim językiem romańskim), studia stacjonarne I stopnia
Filologia romańska i iberystyka, studia stacjonarne II stopnia
Filologia rosyjska, studia stacjonarne I stopnia
Filologia rosyjska, studia stacjonarne II stopnia
Iberystyka, studia stacjonarne I stopnia
Japonistyka, studia stacjonarne I stopnia
Kulturoznawstwo, studia stacjonarne I stopnia
Kulturoznawstwo, studia stacjonarne II stopnia
Lingwistyka stosowana, studia stacjonarne I stopnia
Lingwistyka stosowana, studia stacjonarne II stopnia
Logopedia, studia stacjonarne jednolite magisterskie
Produkcja form audiowizualnych, studia stacjonarne I stopnia
Rosjoznawstwo, studia stacjonarne I stopnia
Sinologia, studia stacjonarne I stopnia
Skandynawistyka - duńska lub fińska ścieżka językowa, studia stacjonarne I stopnia
Skandynawistyka - norweska lub szwedzka ścieżka językowa, studia stacjonarne I stopnia
Skandynawistyka, studia stacjonarne II stopnia
Slawistyka, studia stacjonarne I stopnia
Slawistyka, studia stacjonarne II stopnia
Studia bałkańskie, studia stacjonarne I stopnia
Studia wschodnie, studia stacjonarne I stopnia
Sztuka kreatywnego pisania, studia stacjonarne I stopnia
Wiedza o filmie i kulturze audiowizualnej, studia stacjonarne I stopnia
Wiedza o filmie i kulturze audiowizualnej, studia stacjonarne II stopnia
Wiedza o teatrze, studia stacjonarne I stopnia
Zarządzanie i komunikacja w sztukach scenicznych, studia stacjonarne II stopnia
Zarządzanie instytucjami artystycznymi, specjalność menedżerska, studia stacjonarne I stopnia
Studia niestacjonarne - zaoczne
Filologia angielska, studia niestacjonarne - zaoczne II stopnia
Filologia germańska, studia niestacjonarne - zaoczne I stopnia
Lingwistyka stosowana, studia niestacjonarne - zaoczne I stopnia
Logopedia, studia niestacjonarne - zaoczne II stopnia
Produkcja form audiowizualnych, studia niestacjonarne - zaoczne I stopnia
Wiedza o filmie i kulturze audiowizualnej, studia niestacjonarne - zaoczne I stopnia
Wydział Historyczny
Studia stacjonarne
Archeologia, studia stacjonarne I stopnia
Archeologia, studia stacjonarne II stopnia
Etnologia, studia stacjonarne I stopnia
Etnologia, studia stacjonarne II stopnia
Historia, studia stacjonarne I stopnia
Historia, studia stacjonarne II stopnia
Historia sztuki, studia stacjonarne I stopnia
Historia sztuki, studia stacjonarne II stopnia
Krajoznawstwo i turystyka historyczna, studia stacjonarne I stopnia
Krajoznawstwo i turystyka historyczna, studia stacjonarne II stopnia
Niemcoznawstwo, studia stacjonarne I stopnia
Ochrona dóbr kultury i muzealnictwo, studia stacjonarne I stopnia
Projektowanie gier historycznych, studia stacjonarne I stopnia
Religioznawstwo, studia stacjonarne I stopnia
Religioznawstwo, studia stacjonarne II stopnia
Studia niestacjonarne - zaoczne
Historia, studia niestacjonarne - zaoczne I stopnia
Historia, studia niestacjonarne - zaoczne II stopnia
Historia sztuki, studia niestacjonarne - zaoczne I stopnia
Wydział Matematyki, Fizyki i Informatyki
Studia stacjonarne
Bezpieczeństwo jądrowe i ochrona radiologiczna, studia stacjonarne I stopnia
Bioinformatyka, studia stacjonarne I stopnia
Fizyka, studia stacjonarne I stopnia
Fizyka, studia stacjonarne II stopnia
Fizyka medyczna, studia stacjonarne I stopnia
Fizyka medyczna, studia stacjonarne II stopnia
Informatyka, profil ogólnoakademicki, studia stacjonarne I stopnia
Informatyka, profil ogólnoakademicki, studia stacjonarne II stopnia
Informatyka, profil praktyczny, studia stacjonarne I stopnia
Matematyka, studia stacjonarne I stopnia
Matematyka, studia stacjonarne II stopnia
Modelowanie matematyczne i analiza danych, studia stacjonarne I stopnia
Modelowanie matematyczne i analiza danych, studia stacjonarne II stopnia
Quantum Information Technology, studia stacjonarne II stopnia
Studia niestacjonarne - zaoczne
Informatyka, profil ogólnoakademicki, studia niestacjonarne - zaoczne I stopnia
Informatyka, profil ogólnoakademicki, studia niestacjonarne - zaoczne II stopnia
Wydział Nauk Społecznych
Studia stacjonarne
Bezpieczeństwo narodowe, studia stacjonarne I stopnia
Bezpieczeństwo narodowe, studia stacjonarne II stopnia
Dyplomacja, studia stacjonarne I stopnia
Dziennikarstwo i komunikacja społeczna, studia stacjonarne I stopnia
Dziennikarstwo i komunikacja społeczna, studia stacjonarne II stopnia
Filozofia, studia stacjonarne I stopnia
Filozofia, studia stacjonarne II stopnia
Geografia społeczno-ekonomiczna z elementami GIS, studia stacjonarne II stopnia
Global Studies, studia stacjonarne II stopnia
Gospodarka przestrzenna, studia stacjonarne I stopnia
Gospodarka przestrzenna, studia stacjonarne II stopnia
Pedagogika, studia stacjonarne I stopnia
Pedagogika, studia stacjonarne II stopnia
Pedagogika przedszkolna i wczesnoszkolna, studia stacjonarne jednolite magisterskie
Pedagogika specjalna, studia stacjonarne jednolite magisterskie
Politologia, studia stacjonarne I stopnia
Politologia, studia stacjonarne II stopnia
Praca socjalna, studia stacjonarne I stopnia
Praca socjalna, studia stacjonarne II stopnia
Psychologia, studia stacjonarne jednolite magisterskie
Socjologia, studia stacjonarne I stopnia
Socjologia, studia stacjonarne II stopnia
Solidarity Studies, studia stacjonarne II stopnia
Tourism and Hospitality, studia stacjonarne II stopnia
Wydział Oceanografii i Geografii
Studia stacjonarne
Akwakultura - biznes i technologia, studia stacjonarne I stopnia
Geografia, studia stacjonarne I stopnia
Geografia fizyczna z geoinformacją, studia stacjonarne II stopnia
Geologia, studia stacjonarne I stopnia
Gospodarka wodna i ochrona zasobów wód, studia stacjonarne I stopnia
Hydrografia morska studia inżynierskie, studia stacjonarne I stopnia
Marine Biotechnology, studia stacjonarne II stopnia
Oceanografia, studia stacjonarne I stopnia
Oceanografia, studia stacjonarne II stopnia
Wydział Prawa i Administracji
Studia stacjonarne
Administracja, studia stacjonarne I stopnia
Administracja, studia stacjonarne II stopnia
Criminology and Criminal Justice, studia stacjonarne I stopnia
Kryminologia, studia stacjonarne I stopnia
Kryminologia, studia stacjonarne II stopnia
Podatki i doradztwo podatkowe, studia stacjonarne I stopnia
Prawo, studia stacjonarne jednolite magisterskie
Prawo w sporcie, studia stacjonarne I stopnia
Studia niestacjonarne - zaoczne
Administracja, studia niestacjonarne - zaoczne I stopnia
Kryminologia, studia niestacjonarne - zaoczne I stopnia
Kryminologia, studia niestacjonarne - zaoczne II stopnia
Podatki i doradztwo podatkowe, studia niestacjonarne - zaoczne I stopnia
Podatki i doradztwo podatkowe, studia niestacjonarne - zaoczne II stopnia
Prawo, studia niestacjonarne - zaoczne jednolite magisterskie
Prawo w administracji i gospodarce, studia niestacjonarne - zaoczne II stopnia
Wydział Zarządzania
Studia stacjonarne
Finanse i rachunkowość, studia stacjonarne I stopnia
Finanse i rachunkowość, specjalność Financial Analyst, studia stacjonarne I stopnia
Finanse i rachunkowość, studia stacjonarne II stopnia
Finanse i rachunkowość, specjalność Finance and Accounting, studia stacjonarne II stopnia
Informatyka i ekonometria, studia stacjonarne I stopnia
Informatyka i ekonometria, studia stacjonarne II stopnia
Informatyka i ekonometria specjalność: Digital Transformation, studia stacjonarne II stopnia
Zarządzanie, studia stacjonarne I stopnia
Zarządzanie, studia stacjonarne II stopnia
Zarządzanie instytucjami służby zdrowia, studia stacjonarne I stopnia
Zarządzanie w sporcie - studia menedżerskie, studia stacjonarne I stopnia
Zarządzanie, specjalność Management, studia stacjonarne II stopnia
Studia niestacjonarne - zaoczne
Finanse i rachunkowość, studia niestacjonarne - zaoczne I stopnia
Finanse i rachunkowość, studia niestacjonarne - zaoczne II stopnia
Informatyka i ekonometria, studia niestacjonarne - zaoczne I stopnia
Informatyka i ekonometria, studia niestacjonarne - zaoczne II stopnia
Zarządzanie, studia niestacjonarne - zaoczne I stopnia
Zarządzanie, studia niestacjonarne - zaoczne II stopnia
`;

        function escapeHtml(text) {
            return text
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;')
                .replaceAll("'", '&#39;');
        }

        function inferCategories(faculty, name) {
            const categories = new Set();
            const facultyText = `${faculty} ${name}`;

            if (/Matematyki|Fizyki|Informatyki|Chemii/i.test(facultyText)) categories.add('scisle-techniczne');
            if (/Biologii|Oceanografii|Biotechnologii|Geologii|Geografia/i.test(facultyText)) categories.add('biologiczne-przyrodnicze');
            if (/Ekonomiczny|Zarządzania|ekonom/i.test(facultyText)) categories.add('ekonomiczne');
            if (/Prawa|Filologiczny|Historyczny|Nauk Społecznych|interdyscyplinarne/i.test(facultyText)) categories.add('spoleczne-prawne');
            if (/Pedagogika|Psychologia|medyczna|Logopedia|służby zdrowia/i.test(facultyText)) categories.add('medyczne-pedagogiczne');

            if (!categories.size) categories.add('spoleczne-prawne');
            return Array.from(categories);
        }

        function inferLanguage(name) {
            return /(International|Logistics|Mobility|Global Studies|Tourism and Hospitality|Solidarity Studies|Criminology and Criminal Justice|Quantum Information Technology|Marine Biotechnology|Cultural Communication|Financial Analyst|Finance and Accounting|Management|Digital Transformation)/i.test(name)
                ? 'angielski'
                : 'polski';
        }

        function parseKierunkiData(rawData) {
            const programs = [];
            const lines = rawData.split('\n').map(line => line.trim()).filter(Boolean);
            let currentFaculty = 'Oferta UG';
            let currentMode = 'stacjonarne';

            lines.forEach(line => {
                if (/^Wydział|^Międzyuczelniany Wydział|^Studia interdyscyplinarne$/i.test(line)) {
                    currentFaculty = line;
                    return;
                }

                if (/^Studia stacjonarne$/i.test(line)) {
                    currentMode = 'stacjonarne';
                    return;
                }

                if (/^Studia niestacjonarne - zaoczne$/i.test(line)) {
                    currentMode = 'zaoczne';
                    return;
                }

                if (/^Studia niestacjonarne - wieczorowe$/i.test(line)) {
                    currentMode = 'wieczorowe';
                    return;
                }

                if (!/studia/i.test(line)) return;

                const level = /jednolite magisterskie/i.test(line)
                    ? 'jednolite'
                    : /II stopnia/i.test(line)
                        ? 'ii'
                        : /I stopnia/i.test(line)
                            ? 'i'
                            : 'i';

                const mode = /niestacjonarne - zaoczne/i.test(line)
                    ? 'zaoczne'
                    : /niestacjonarne - wieczorowe/i.test(line)
                        ? 'wieczorowe'
                        : /stacjonarne/i.test(line)
                            ? 'stacjonarne'
                            : currentMode;

                const name = line.replace(/,\s*studia.*$/i, '').replace(/\s+,/g, ',').trim();
                const categories = inferCategories(currentFaculty, name);
                const lang = inferLanguage(name);
                const modeValues = [mode];

                if (lang === 'angielski' && /(International|Logistics|Global Studies|Tourism and Hospitality|Marine Biotechnology|Criminology and Criminal Justice|Solidarity Studies)/i.test(name)) {
                    modeValues.push('sea-eu');
                }

                programs.push({
                    faculty: currentFaculty,
                    name,
                    level,
                    mode: modeValues,
                    lang,
                    categories
                });
            });

            return programs;
        }

        function levelLabel(level) {
            if (level === 'i') return 'I stopnia';
            if (level === 'ii') return 'II stopnia';
            if (level === 'jednolite') return 'jednolite magisterskie';
            if (level === 'doktoraty') return 'doktoraty';
            if (level === 'podyplomowe') return 'podyplomowe';
            return level;
        }

        function modeLabel(values) {
            if (values.includes('wieczorowe')) return 'niestacjonarne - wieczorowe';
            if (values.includes('zaoczne')) return 'niestacjonarne - zaoczne';
            if (values.includes('sea-eu')) return 'studia wspólne SEA-EU';
            return 'stacjonarne';
        }

        function renderKierunkiCards() {
            const grid = document.getElementById('kierunkiGrid');
            if (!grid) return;

            const programs = parseKierunkiData(kierunkiRawData);

            grid.innerHTML = programs.map(program => `
                <div class="k-card reveal" data-category="${program.categories.join(',')}" data-level="${program.level}" data-mode="${program.mode.join(',')}" data-lang="${program.lang}">
                    <div class="k-faculty">${escapeHtml(program.faculty)}</div>
                    <div class="k-name">${escapeHtml(program.name)}</div>
                    <div class="k-meta">
                        <span class="k-badge badge-deg">${escapeHtml(levelLabel(program.level))}</span>
                        <span class="k-badge badge-pop">${escapeHtml(modeLabel(program.mode))}</span>
                    </div>
                    <div class="k-footer">
                        <div class="k-points">Język: <strong>${escapeHtml(program.lang)}</strong></div>
                        <div class="k-arrow"><svg viewBox="0 0 24 24" fill="none">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg></div>
                    </div>
                </div>
            `).join('');

            grid.querySelectorAll('.reveal').forEach(el => ro.observe(el));
        }

        renderKierunkiCards();

        // Kierunki filters + search
        const kierunkiState = {
            category: 'all',
            level: 'all',
            mode: 'all',
            lang: 'all',
            query: ''
        };

        const paginationState = {
            currentPage: 1,
            pageSize: 12
        };

        function matchesFilter(values, selected) {
            if (selected === 'all') return true;
            return values.includes(selected);
        }

        function getMatchingCards() {
            return Array.from(document.querySelectorAll('.k-card')).filter(card => {
                const text = card.textContent.toLowerCase();
                const categories = (card.dataset.category || '').split(',').map(v => v.trim()).filter(Boolean);
                const levels = (card.dataset.level || '').split(',').map(v => v.trim()).filter(Boolean);
                const modes = (card.dataset.mode || '').split(',').map(v => v.trim()).filter(Boolean);
                const langs = (card.dataset.lang || 'polski').split(',').map(v => v.trim()).filter(Boolean);

                const queryMatch = !kierunkiState.query || text.includes(kierunkiState.query);
                const categoryMatch = matchesFilter(categories, kierunkiState.category);
                const levelMatch = matchesFilter(levels, kierunkiState.level);
                const modeMatch = matchesFilter(modes, kierunkiState.mode);
                const langMatch = matchesFilter(langs, kierunkiState.lang);

                return queryMatch && categoryMatch && levelMatch && modeMatch && langMatch;
            });
        }

        function renderPagination(totalItems, totalPages) {
            const container = document.getElementById('kierunkiPagination');
            if (!container) return;

            if (totalItems <= paginationState.pageSize) {
                container.innerHTML = '';
                container.style.display = 'none';
                return;
            }

            container.style.display = 'flex';

            const pageItems = [];
            const current = paginationState.currentPage;

            if (totalPages <= 7) {
                for (let page = 1; page <= totalPages; page++) pageItems.push(page);
            } else {
                if (current <= 3) {
                    pageItems.push(1, 2, 3, 'dots', totalPages);
                } else if (current >= totalPages - 2) {
                    pageItems.push(1, 'dots', totalPages - 2, totalPages - 1, totalPages);
                } else {
                    pageItems.push(1, 'dots', current - 1, current, current + 1, 'dots', totalPages);
                }
            }

            let html = `<button type="button" class="pagination-btn" data-page="${current - 1}" ${current === 1 ? 'disabled' : ''}>Poprzedni</button>`;

            pageItems.forEach((item, index) => {
                if (item === 'dots') {
                    html += `<span class="pagination-sep" aria-hidden="true">...</span>`;
                } else {
                    html += `<button type="button" class="pagination-btn ${item === current ? 'active' : ''}" data-page="${item}">${item}</button>`;
                }

                if (index < pageItems.length - 1) {
                    html += `<span class="pagination-sep" aria-hidden="true">|</span>`;
                }
            });

            html += `<button type="button" class="pagination-btn" data-page="${current + 1}" ${current === totalPages ? 'disabled' : ''}>Następny</button>`;
            container.innerHTML = html;
        }

        function applyKierunkiFilters(resetPage = false) {
            if (resetPage) {
                paginationState.currentPage = 1;
            }

            const cards = Array.from(document.querySelectorAll('.k-card'));
            const matchingCards = getMatchingCards();
            const totalPages = Math.max(1, Math.ceil(matchingCards.length / paginationState.pageSize));

            if (paginationState.currentPage > totalPages) {
                paginationState.currentPage = totalPages;
            }

            const start = (paginationState.currentPage - 1) * paginationState.pageSize;
            const end = start + paginationState.pageSize;
            const visibleCards = new Set(matchingCards.slice(start, end));

            cards.forEach(card => {
                card.style.display = visibleCards.has(card) ? '' : 'none';
            });

            renderPagination(matchingCards.length, totalPages);
        }

        document.querySelectorAll('.filter-tabs[data-filter-group]').forEach(group => {
            const groupName = group.dataset.filterGroup;
            const activeTab = group.querySelector('.filter-tab.active');
            if (activeTab) {
                kierunkiState[groupName] = activeTab.dataset.filterValue || 'all';
            }
            group.querySelectorAll('.filter-tab').forEach(tab => {
                tab.setAttribute('tabindex', '0');
                tab.setAttribute('role', 'button');

                const toggleFilter = () => {
                    const isActive = tab.classList.contains('active');

                    if (isActive) {
                        tab.classList.remove('active');
                        kierunkiState[groupName] = 'all';
                        applyKierunkiFilters(true);
                        return;
                    }

                    group.querySelectorAll('.filter-tab').forEach(x => x.classList.remove('active'));
                    tab.classList.add('active');
                    kierunkiState[groupName] = tab.dataset.filterValue || 'all';
                    applyKierunkiFilters(true);
                };

                tab.addEventListener('click', toggleFilter);
                tab.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        toggleFilter();
                    }
                });
            });
        });

        document.getElementById('searchInput')?.addEventListener('input', function () {
            kierunkiState.query = this.value.toLowerCase().trim();
            applyKierunkiFilters(true);
        });

        document.getElementById('toggleFilters')?.addEventListener('click', () => {
            const panel = document.getElementById('filtersPanel');
            const button = document.getElementById('toggleFilters');
            if (!panel || !button) return;

            const isHidden = panel.hasAttribute('hidden');
            if (isHidden) {
                panel.removeAttribute('hidden');
                button.setAttribute('aria-expanded', 'true');
            } else {
                panel.setAttribute('hidden', '');
                button.setAttribute('aria-expanded', 'false');
            }
        });

        document.getElementById('resetFilters')?.addEventListener('click', () => {
            document.querySelectorAll('.filter-tabs[data-filter-group] .filter-tab.active')
                .forEach(tab => tab.classList.remove('active'));

            kierunkiState.category = 'all';
            kierunkiState.level = 'all';
            kierunkiState.mode = 'all';
            kierunkiState.lang = 'all';

            applyKierunkiFilters(true);
        });

        document.getElementById('kierunkiPagination')?.addEventListener('click', (event) => {
            const target = event.target.closest('.pagination-btn[data-page]');
            if (!target || target.disabled) return;

            const page = Number(target.dataset.page);
            if (!Number.isNaN(page) && page > 0) {
                paginationState.currentPage = page;
                applyKierunkiFilters(false);
            }
        });

        applyKierunkiFilters(true);

        // Countdown to July 14
        const cd1 = document.getElementById('cd1');
        if (cd1) {
            const diff = Math.ceil((new Date('2026-07-14') - new Date()) / 864e5);
            cd1.textContent = diff > 0 ? diff : '–';
        }

        // Chatbot
        const replies = {
            'Programowanie': 'Świetny wybór! Polecam <strong>Informatykę</strong> (12 os./miejsce!) lub <strong>Informatykę i ekonometrię</strong> na WMFiI. Chcesz poznać progi punktowe?',
            'Nauka i badania': 'Polecam <strong>Biotechnologię</strong>, <strong>Chemię medyczną</strong> lub <strong>Oceanografię</strong> — unikatowe kierunki z dostępem do nowoczesnych laboratoriów. Który obszar Cię fascynuje?',
            'Prawo': 'Mamy <strong>Prawo</strong> (jedn. mag.), popularną <strong>Kryminologię</strong> (11 os./miejsce!) i <strong>Administrację</strong>. Wszystko na Wydziale Prawa. Co Cię bardziej interesuje?',
            'Języki i świat': 'Polecam <strong>Japonistykę</strong>, <strong>Lingwistykę stosowaną</strong>, <strong>Global Studies</strong> (po angielsku!) lub <strong>Skandynawistykę</strong>. Chcesz wyjechać na Erasmus?',
            'Biznes i finanse': 'Wydział Ekonomiczny w Sopocie to świetny wybór! <strong>Finanse i rachunkowość</strong>, <strong>Zarządzanie</strong>, <strong>Logistyka</strong> lub nowy <strong>Logistics and Mobility</strong> po angielsku. Co Cię bardziej interesuje?',
        };
        const def = [
            'Rozumiem! Powiedz mi więcej — bardziej interesują Cię nauki ścisłe, humanistyczne czy społeczne?',
            'Ciekawe! A jak wyglądają Twoje wyniki z matury? Pytam, żeby dobrać kierunek z realną szansą na dostanie się.',
        ];

        function chatSend(el) {
            const txt = el.textContent.trim();
            const msgs = document.getElementById('chatMsgs');
            msgs.innerHTML += `<div class="chat-msg-row user" style="display:flex;flex-direction:row-reverse;gap:9px;margin-bottom:14px"><div class="chat-av usr" style="width:32px;height:32px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.14)"><svg viewBox="0 0 24 24" fill="none" style="width:16px;height:16px;stroke:white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-width="2"/><circle cx="12" cy="7" r="4" stroke-width="2"/></svg></div><div class="chat-bubble usr" style="max-width:80%;padding:11px 15px;font-size:13px;background:var(--blue);color:white;border-radius:14px 4px 14px 14px;margin-left:auto">${txt}</div></div>`;
            document.getElementById('chatOpts').style.display = 'none';
            const reply = replies[txt] || def[Math.floor(Math.random() * def.length)];
            setTimeout(() => {
                msgs.innerHTML += `<div class="chat-msg-row" style="display:flex;gap:9px;margin-bottom:14px"><div class="chat-av bot" style="width:32px;height:32px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--blue)"><svg viewBox="0 0 24 24" fill="none" style="width:16px;height:16px;stroke:white"><rect x="3" y="11" width="18" height="10" rx="2" stroke-width="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="15" x2="12" y2="17" stroke-width="2" stroke-linecap="round"/></svg></div><div class="chat-bubble bot" style="max-width:80%;padding:11px 15px;font-size:13px;background:rgba(255,255,255,0.1);color:white;border-radius:4px 14px 14px 14px;line-height:1.55">${reply}</div></div>`;
                msgs.scrollTop = msgs.scrollHeight;
            }, 600);
            msgs.scrollTop = msgs.scrollHeight;
        }

        function chatSendText() {
            const inp = document.getElementById('chatInput');
            if (!inp.value.trim()) return;
            const dummy = { textContent: inp.value }; inp.value = '';
            chatSend(dummy);
        }
        document.getElementById('chatInput')?.addEventListener('keydown', e => {
            if (e.key === 'Enter') chatSendText();
        });