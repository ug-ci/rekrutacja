/**
 * Seed script: migrates kierunkiRawData from the original HTML/JS project into Strapi.
 *
 * Usage:
 *   1. Start Strapi:  npm run develop
 *   2. Create an API token in Strapi admin (Settings → API Tokens)
 *   3. Run:  STRAPI_TOKEN=<your-token> node scripts/seed.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('Error: STRAPI_TOKEN environment variable is required.');
  console.error('Create a Full Access API token in Strapi admin → Settings → API Tokens');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${STRAPI_TOKEN}`,
};

// ---------- Original data (copied from script.js) ----------

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
Zarządzanie, studia niestacjonarne - zaoczne II stopnia`;

// ---------- Parsing logic (same as original script.js) ----------

function inferCategories(faculty, name) {
  const text = `${faculty} ${name}`;
  if (/Matematyki|Fizyki|Informatyki|Chemii/i.test(text)) return 'scisle-techniczne';
  if (/Biologii|Oceanografii|Biotechnologii|Geologii|Geografia/i.test(text)) return 'biologiczne-przyrodnicze';
  if (/Ekonomiczny|Zarządzania|ekonom/i.test(text)) return 'ekonomiczne';
  if (/Pedagogika|Psychologia|medyczna|Logopedia|służby zdrowia/i.test(text)) return 'medyczne-pedagogiczne';
  return 'spoleczne-prawne';
}

function inferLanguage(name) {
  return /(International|Logistics|Mobility|Global Studies|Tourism and Hospitality|Solidarity Studies|Criminology and Criminal Justice|Quantum Information Technology|Marine Biotechnology|Cultural Communication|Financial Analyst|Finance and Accounting|Management|Digital Transformation)/i.test(name)
    ? 'angielski'
    : 'polski';
}

function parseKierunkiData(rawData) {
  const programs = [];
  const lines = rawData.split('\n').map(l => l.trim()).filter(Boolean);
  let currentFaculty = 'Oferta UG';
  let currentMode = 'stacjonarne';

  for (const line of lines) {
    if (/^Wydział|^Międzyuczelniany Wydział|^Studia interdyscyplinarne$/i.test(line)) {
      currentFaculty = line;
      continue;
    }
    if (/^Studia stacjonarne$/i.test(line)) { currentMode = 'stacjonarne'; continue; }
    if (/^Studia niestacjonarne - zaoczne$/i.test(line)) { currentMode = 'zaoczne'; continue; }
    if (/^Studia niestacjonarne - wieczorowe$/i.test(line)) { currentMode = 'wieczorowe'; continue; }
    if (!/studia/i.test(line)) continue;

    const level = /jednolite magisterskie/i.test(line) ? 'jednolite'
      : /II stopnia/i.test(line) ? 'ii'
      : 'i';

    const mode = /niestacjonarne - zaoczne/i.test(line) ? 'zaoczne'
      : /niestacjonarne - wieczorowe/i.test(line) ? 'wieczorowe'
      : /stacjonarne/i.test(line) ? 'stacjonarne'
      : currentMode;

    const name = line.replace(/,\s*studia.*$/i, '').replace(/\s+,/g, ',').trim();

    programs.push({
      nazwa: name,
      wydzialNazwa: currentFaculty,
      poziom: level,
      tryb: mode,
      jezyk: inferLanguage(name),
      kategoria: inferCategories(currentFaculty, name),
    });
  }

  return programs;
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ---------- Strapi API helpers ----------

async function strapiPost(endpoint, data) {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`POST ${endpoint} failed (${res.status}): ${err}`);
  }

  return res.json();
}

async function strapiGet(endpoint) {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, { headers });
  if (!res.ok) throw new Error(`GET ${endpoint} failed (${res.status})`);
  return res.json();
}

// ---------- Seed functions ----------

async function seedWydzialy(faculties) {
  const wydzialMap = {};
  console.log(`\nSeeding ${faculties.length} wydziały...`);

  for (const nazwa of faculties) {
    try {
      const result = await strapiPost('/wydzialy', {
        nazwa,
        slug: slugify(nazwa),
      });
      const id = result.data?.id;
      wydzialMap[nazwa] = id;
      console.log(`  + ${nazwa} (id: ${id})`);
    } catch (err) {
      // May already exist
      console.log(`  ~ ${nazwa} (skipped or error: ${err.message})`);
    }
  }

  // Fetch all to get IDs for already-existing ones
  const all = await strapiGet('/wydzialy?pagination[pageSize]=100');
  for (const w of all.data || []) {
    const attrs = w.attributes || w;
    wydzialMap[attrs.nazwa] = w.id;
  }

  return wydzialMap;
}

async function seedKierunki(programs, wydzialMap) {
  console.log(`\nSeeding ${programs.length} kierunki...`);
  let created = 0;
  let skipped = 0;

  for (const p of programs) {
    const slug = slugify(`${p.nazwa}-${p.poziom}-${p.tryb}`);
    const wydzialId = wydzialMap[p.wydzialNazwa];

    try {
      await strapiPost('/kierunki', {
        nazwa: p.nazwa,
        slug,
        poziom: p.poziom,
        tryb: p.tryb,
        jezyk: p.jezyk,
        kategoria: p.kategoria,
        wydzialNazwa: p.wydzialNazwa,
        wydzial: wydzialId || undefined,
      });
      created++;
      if (created % 20 === 0) console.log(`  ... ${created} created`);
    } catch (err) {
      skipped++;
      console.log(`  ~ Skipped: ${p.nazwa} (${err.message})`);
    }
  }

  console.log(`  Done: ${created} created, ${skipped} skipped`);
}

async function seedFaq() {
  const faqs = [
    { pytanie: 'Jakie dokumenty są potrzebne do rekrutacji?', odpowiedz: 'Do rekrutacji na studia I stopnia potrzebne są: świadectwo dojrzałości, zdjęcie w formie elektronicznej, dowód opłaty rekrutacyjnej. Na studia II stopnia dodatkowo dyplom ukończenia studiów I stopnia.', kolejnosc: 1 },
    { pytanie: 'Ile wynosi opłata rekrutacyjna?', odpowiedz: 'Opłata rekrutacyjna wynosi 85 zł za każdy wybrany kierunek studiów. Opłatę wnosi się na indywidualny numer konta wygenerowany w systemie IRK.', kolejnosc: 2 },
    { pytanie: 'Czy mogę aplikować na więcej niż jeden kierunek?', odpowiedz: 'Tak, możesz aplikować na dowolną liczbę kierunków studiów. Każdy kierunek wymaga oddzielnej opłaty rekrutacyjnej.', kolejnosc: 3 },
    { pytanie: 'Kiedy rozpoczyna się rekrutacja na rok 2026/27?', odpowiedz: 'Rejestracja w systemie IRK rozpoczyna się 26 maja 2026 roku i trwa do 14 lipca 2026 roku.', kolejnosc: 4 },
    { pytanie: 'Czy obcokrajowcy mogą studiować na UG?', odpowiedz: 'Tak! Uniwersytet Gdański oferuje kierunki w języku angielskim, m.in. International Business, Global Studies, Marine Biotechnology. Obcokrajowcy rekrutują się przez system IRK lub program Erasmus+.', kolejnosc: 5 },
  ];

  console.log(`\nSeeding ${faqs.length} FAQ entries...`);
  for (const faq of faqs) {
    try {
      await strapiPost('/faqs', faq);
      console.log(`  + ${faq.pytanie.substring(0, 50)}...`);
    } catch (err) {
      console.log(`  ~ Skipped FAQ: ${err.message}`);
    }
  }
}

// ---------- Main ----------

async function main() {
  console.log('=== UG Rekrutacja — Strapi Seed Script ===');
  console.log(`Target: ${STRAPI_URL}`);

  const programs = parseKierunkiData(kierunkiRawData);
  console.log(`Parsed ${programs.length} programs from raw data`);

  // Unique faculties
  const faculties = [...new Set(programs.map(p => p.wydzialNazwa))];
  console.log(`Found ${faculties.length} unique faculties`);

  const wydzialMap = await seedWydzialy(faculties);
  await seedKierunki(programs, wydzialMap);
  await seedFaq();

  console.log('\n=== Seed complete! ===');
}

main().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
