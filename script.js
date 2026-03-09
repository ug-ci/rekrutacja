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
            pageSize: 6
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

            let html = `<button type="button" class="pagination-btn" data-page="${paginationState.currentPage - 1}" ${paginationState.currentPage === 1 ? 'disabled' : ''}>Poprzednia</button>`;

            for (let page = 1; page <= totalPages; page++) {
                html += `<button type="button" class="pagination-btn ${page === paginationState.currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`;
            }

            html += `<button type="button" class="pagination-btn" data-page="${paginationState.currentPage + 1}" ${paginationState.currentPage === totalPages ? 'disabled' : ''}>Następna</button>`;
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