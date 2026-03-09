# Plan migracji: HTML/JS → WordPress (backend) + React (frontend)

## Analiza obecnego projektu

**Portal rekrutacyjny Uniwersytetu Gdańskiego 2026/2027** — statyczna strona HTML/CSS/JS:
- ~230 kierunków studiów (dane wklejone jako tekst w `script.js`)
- 11 wydziałów z informacjami kontaktowymi
- System filtrowania i paginacji kierunków
- Chatbot z predefiniowanymi odpowiedziami
- FAQ, timeline, formularz kontaktowy (nieaktywny)
- Strona szczegółów kierunku (`opis-kierunku.html`) z parametrami URL

## Architektura docelowa

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND (React)              │
│  Vite + React 18 + React Router                 │
│  Hosting: Vercel / Netlify / serwer UG          │
│                                                  │
│  Strony:                                         │
│    /              → Strona główna (hero, CTA)    │
│    /kierunki      → Lista kierunków + filtry     │
│    /kierunek/:slug → Szczegóły kierunku          │
│    /wydzialy      → Lista wydziałów             │
│    /rekrutacja    → Timeline + dokumenty         │
│    /kontakt       → Formularz + dane kontaktowe  │
│    /faq           → FAQ (accordion)              │
└──────────────────┬──────────────────────────────┘
                   │ REST API (JSON)
                   │ GET /wp-json/wp/v2/kierunek
                   │ GET /wp-json/wp/v2/wydzial
                   │ GET /wp-json/ug/v1/faq
                   │ POST /wp-json/ug/v1/kontakt
                   │ POST /wp-json/ug/v1/chatbot
┌──────────────────┴──────────────────────────────┐
│              BACKEND (WordPress)                 │
│  WordPress 6.x jako Headless CMS                │
│  Hosting: serwer UG / WP Engine                  │
│                                                  │
│  Custom Post Types:                              │
│    kierunek  → nazwa, wydział, poziom, tryb,     │
│                język, kategorie, opis, slug       │
│    wydzial   → nazwa, lokalizacja, opis, ikona   │
│    faq       → pytanie, odpowiedź, kolejność     │
│                                                  │
│  Plugin: ug-rekrutacja (custom)                  │
│    - Rejestruje CPT + taksonomie                 │
│    - REST API endpointy                          │
│    - Import danych z CSV/JSON                    │
│    - Obsługa formularza kontaktowego             │
│    - Chatbot endpoint                            │
└─────────────────────────────────────────────────┘
```

## Etapy migracji

### Etap 1: WordPress — Custom Plugin `ug-rekrutacja`

**1.1 Custom Post Types (CPT):**

| CPT | Pola (ACF / meta) | Taksonomie |
|-----|-------------------|------------|
| `kierunek` | slug, opis_krotki, opis_pelny, perspektywy_zatrudnienia, kryteria_przyjecia | `wydzial` (tax), `poziom_studiow`, `tryb_studiow`, `jezyk_studiow`, `kategoria_kierunku` |
| `faq` | pytanie (title), odpowiedz (content), kolejnosc (menu_order) | — |

**1.2 Taksonomie:**
- `wydzial` — 11 wydziałów (z meta: lokalizacja, liczba_kierunkow, ikona)
- `poziom_studiow` — I stopień, II stopień, jednolite magisterskie, doktoranckie, podyplomowe
- `tryb_studiow` — stacjonarne, zaoczne, wieczorowe, SEA-EU
- `jezyk_studiow` — polski, angielski
- `kategoria_kierunku` — ścisłe/techniczne, biologiczne, ekonomiczne, społeczne/prawne, medyczne/pedagogiczne

**1.3 REST API endpointy:**

```
GET  /wp-json/wp/v2/kierunek?
       wydzial=<term_id>&
       poziom_studiow=<term_id>&
       tryb_studiow=<term_id>&
       jezyk_studiow=<term_id>&
       kategoria_kierunku=<term_id>&
       search=<query>&
       per_page=12&page=1

GET  /wp-json/wp/v2/kierunek/<id>

GET  /wp-json/wp/v2/wydzial   (taxonomy terms z meta)

GET  /wp-json/wp/v2/faq?orderby=menu_order&order=asc

POST /wp-json/ug/v1/kontakt
     { imie, email, temat, wiadomosc }

POST /wp-json/ug/v1/chatbot
     { message }
```

**1.4 Skrypt importu danych:**
- Konwersja `kierunkiRawData` z script.js → JSON
- WP-CLI skrypt do bulk-import kierunków i wydziałów

### Etap 2: React Frontend

**2.1 Stack technologiczny:**
- **Vite** — bundler
- **React 18** — UI
- **React Router v7** — routing
- **TanStack Query (React Query)** — fetching + cache danych z WP API
- **CSS Modules** lub **Tailwind CSS** — stylowanie (migracja z istniejącego style.css)
- **Lucide React** — ikony (już używane w wersji CDN)

**2.2 Struktura projektu React:**

```
src/
├── api/
│   └── wordpress.js          # Klient API (fetch wrapper)
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── kierunki/
│   │   ├── KierunekCard.jsx
│   │   ├── KierunkiGrid.jsx
│   │   ├── KierunkiFilters.jsx
│   │   └── Pagination.jsx
│   ├── chatbot/
│   │   └── Chatbot.jsx
│   ├── faq/
│   │   └── FaqAccordion.jsx
│   ├── common/
│   │   ├── CountdownTimer.jsx
│   │   └── RevealOnScroll.jsx
│   └── kontakt/
│       └── ContactForm.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── KierunkiPage.jsx
│   ├── KierunekDetailPage.jsx
│   ├── FaqPage.jsx
│   └── KontaktPage.jsx
├── hooks/
│   ├── useKierunki.js         # React Query hook
│   ├── useWydzialy.js
│   └── useFaq.js
├── App.jsx
├── main.jsx
└── index.css
```

**2.3 Mapowanie obecnych funkcji → komponenty React:**

| Obecna funkcja (script.js) | Komponent React | Źródło danych |
|----------------------------|-----------------|---------------|
| `parseKierunkiData()` + `renderKierunkiCards()` | `KierunkiGrid` + `KierunekCard` | `GET /wp-json/wp/v2/kierunek` |
| `filterKierunki()` + filtry HTML | `KierunkiFilters` | Taksonomie z WP |
| `renderPagination()` | `Pagination` | `X-WP-TotalPages` header |
| Chatbot (dictionary lookup) | `Chatbot` | `POST /ug/v1/chatbot` |
| FAQ accordion | `FaqAccordion` | `GET /wp-json/wp/v2/faq` |
| `updateCountdown()` | `CountdownTimer` | Ustawienia WP (deadline) |
| IntersectionObserver reveal | `RevealOnScroll` | Czysto frontendowe |
| Formularz kontaktowy | `ContactForm` | `POST /ug/v1/kontakt` |
| URL params → opis-kierunku | React Router `useParams()` | `GET /wp-json/wp/v2/kierunek/:slug` |

### Etap 3: Integracja i deploy

**3.1 CORS:**
WordPress plugin dodaje nagłówki CORS dla domeny frontendu React.

**3.2 SEO:**
- React z SSR (Next.js) lub pre-rendering (react-snap) dla SEO
- Alternatywa: Vite + react-helmet-async dla meta tagów

**3.3 Deployment:**
```
WordPress: wp.rekrutacja.ug.edu.pl  (API only, panel admina)
React:     rekrutacja.ug.edu.pl     (frontend publiczny)
```

## Korzyści migracji

| Aspekt | Teraz (HTML/JS) | Po migracji (WP + React) |
|--------|-----------------|--------------------------|
| Edycja treści | Wymaga edycji kodu | Panel WordPress (WYSIWYG) |
| Dodanie kierunku | Edycja script.js | Formularz w panelu WP |
| Formularz kontaktowy | Nie działa | Pełna obsługa (email + zapis) |
| Chatbot | 5 hardcoded odpowiedzi | Rozszerzalny przez panel WP |
| SEO | Ograniczone | Pełne (meta, OG, sitemap) |
| Wielojęzyczność | Brak | WPML / Polylang |
| Wydajność | Szybka (statyczna) | Cache API + React SPA |
| Skalowalność | Niska | Wysoka (API + CDN) |

## Priorytet implementacji

1. **WordPress plugin** — CPT, taksonomie, REST API
2. **Import danych** — skrypt migracji 230 kierunków
3. **React scaffold** — Vite, Router, API client
4. **Strona główna** — hero, countdown, CTA
5. **Lista kierunków** — filtry, paginacja, karty
6. **Szczegóły kierunku** — dynamiczny routing
7. **FAQ + Kontakt** — formularze, accordion
8. **Chatbot** — integracja z WP endpoint
9. **Stylowanie** — migracja CSS → CSS Modules/Tailwind
10. **Deploy + CORS + SEO**
