import React, { useState } from 'react';
import { Bot, Send, Mic, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: "Hi, I'm Pillmate AI. Ask me anything about your medications, schedule, or side effects!"
    },
    {
      id: 'm2',
      sender: 'user',
      text: "Is it safe to take Lisinopril with grapefruit juice?"
    },
    {
      id: 'm3',
      sender: 'bot',
      text: "Yes, Lisinopril does not have a direct interaction with grapefruit juice (unlike some other blood pressure drugs like statins). However, it is always recommended to drink water instead. Let me know if you take other medications like Atorvastatin."
    }
  ]);
  
  const [inputText, setInputText] = useState('');

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate Bot response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `That's a helpful question. For your current schedule, please make sure to follow the dosage instructions precisely. Let me know if you need specific alerts or information about interactions.`
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const suggestionChips = [
    "Side effects of Lisinopril?",
    "I missed a dose today",
    "How does my smart dispenser work?"
  ];

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 relative overflow-hidden">
      
      {/* Scrollable Conversation History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div key={msg.id} className={`flex items-start gap-2.5 ${!isBot ? 'flex-row-reverse' : ''}`}>
              {/* Avatar Icon */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-sm ${
                isBot ? 'bg-teal-600 border-teal-700 text-white' : 'bg-white border-slate-200 text-slate-600'
              }`}>
                {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[75%] p-3.5 rounded-2xl shadow-sm border text-xs leading-relaxed ${
                isBot 
                  ? 'bg-white border-slate-100 text-slate-800' 
                  : 'bg-teal-600 border-teal-700 text-white font-medium'
              }`}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggestion Chips and Text Input Bar Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent space-y-3 z-30">
        
        {/* Horizontal Scroll Suggestion Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {suggestionChips.map((chip, index) => (
            <button
              key={index}
              onClick={() => handleSend(chip)}
              className="flex-shrink-0 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-bold text-[10px] px-3.5 py-1.5 rounded-full shadow-sm transition-all"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Text Input Block */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
          <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition-colors">
            <Mic className="w-4.5 h-4.5" />
          </button>
          
          <input 
            type="text" 
            placeholder="Ask anything about medicines..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent text-xs font-semibold text-slate-700 outline-none px-2"
          />

          <button 
            onClick={() => handleSend()}
            className="w-8 h-8 bg-teal-600 hover:bg-teal-700 text-white rounded-xl flex items-center justify-center shadow-md transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AIChat;
