import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send } from 'lucide-react';
import { sendChatMessage } from '../../api/strapi';

const quickTopics = [
  'Programowanie',
  'Nauka i badania',
  'Prawo',
  'Języki i świat',
  'Biznes i finanse',
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Cześć! Pomogę Ci wybrać kierunek studiów. Wybierz temat lub napisz, co Cię interesuje.',
    },
  ]);
  const [input, setInput] = useState('');
  const [showTopics, setShowTopics] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(text) {
    if (!text.trim()) return;

    const userMsg = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setShowTopics(false);
    setInput('');

    try {
      const response = await sendChatMessage(text.trim());
      setMessages((prev) => [...prev, { role: 'bot', text: response.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Przepraszam, wystąpił błąd. Spróbuj ponownie.' },
      ]);
    }
  }

  return (
    <div className="chatbot">
      <div className="chat-header">
        <Bot size={20} />
        <span>Doradca kierunków</span>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg-row ${msg.role}`}>
            <div className={`chat-av ${msg.role}`}>
              {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div
              className={`chat-bubble ${msg.role}`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showTopics && (
        <div className="chat-topics">
          {quickTopics.map((topic) => (
            <button key={topic} className="chat-topic-btn" onClick={() => handleSend(topic)}>
              {topic}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input-row">
        <input
          type="text"
          className="chat-input"
          placeholder="Napisz wiadomość..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
        />
        <button className="chat-send-btn" onClick={() => handleSend(input)}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
