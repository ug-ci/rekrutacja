const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

async function fetchAPI(endpoint, params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== 'all') {
      query.set(key, value);
    }
  });

  const url = `${STRAPI_URL}/api${endpoint}?${query.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// --- Kierunki ---

export async function getKierunki({ page = 1, pageSize = 12, search, kategoria, poziom, tryb, jezyk } = {}) {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'populate': '*',
  };

  if (search) params['filters[nazwa][$containsi]'] = search;
  if (kategoria && kategoria !== 'all') params['filters[kategoria][slug][$eq]'] = kategoria;
  if (poziom && poziom !== 'all') params['filters[poziom][$eq]'] = poziom;
  if (tryb && tryb !== 'all') params['filters[tryb][$eq]'] = tryb;
  if (jezyk && jezyk !== 'all') params['filters[jezyk][$eq]'] = jezyk;

  return fetchAPI('/kierunki', params);
}

export async function getKierunek(slug) {
  const data = await fetchAPI('/kierunki', {
    'filters[slug][$eq]': slug,
    'populate': '*',
  });
  return data?.data?.[0] || null;
}

// --- Wydzialy ---

export async function getWydzialy() {
  return fetchAPI('/wydzialy', { 'populate': '*' });
}

// --- FAQ ---

export async function getFaq() {
  return fetchAPI('/faqs', { 'sort': 'kolejnosc:asc' });
}

// --- Kontakt ---

export async function sendKontakt({ imie, email, temat, wiadomosc }) {
  const response = await fetch(`${STRAPI_URL}/api/kontakt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { imie, email, temat, wiadomosc } }),
  });

  if (!response.ok) {
    throw new Error('Nie udało się wysłać wiadomości');
  }

  return response.json();
}

// --- Chatbot ---

export async function sendChatMessage(message) {
  const response = await fetch(`${STRAPI_URL}/api/chatbot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Chatbot error');
  }

  return response.json();
}
