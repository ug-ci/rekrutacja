import { useState } from 'react';
import { Send } from 'lucide-react';
import { sendKontakt } from '../../api/strapi';

export default function ContactForm() {
  const [form, setForm] = useState({ imie: '', email: '', temat: '', wiadomosc: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      await sendKontakt(form);
      setStatus('success');
      setForm({ imie: '', email: '', temat: '', wiadomosc: '' });
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="imie">Imię i nazwisko</label>
        <input id="imie" name="imie" value={form.imie} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="temat">Temat</label>
        <select id="temat" name="temat" value={form.temat} onChange={handleChange} required>
          <option value="">Wybierz temat...</option>
          <option value="rekrutacja">Rekrutacja</option>
          <option value="kierunki">Kierunki studiów</option>
          <option value="dokumenty">Dokumenty</option>
          <option value="inne">Inne</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="wiadomosc">Wiadomość</label>
        <textarea id="wiadomosc" name="wiadomosc" rows={5} value={form.wiadomosc} onChange={handleChange} required />
      </div>

      <button type="submit" className="btn btn-cta" disabled={sending}>
        <Send size={16} />
        {sending ? 'Wysyłanie...' : 'Wyślij'}
      </button>

      {status === 'success' && <p className="form-status success">Wiadomość wysłana!</p>}
      {status === 'error' && <p className="form-status error">Nie udało się wysłać. Spróbuj ponownie.</p>}
    </form>
  );
}
