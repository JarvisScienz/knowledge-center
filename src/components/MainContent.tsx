// components/MainContent.js
import ChatInput from './ChatInput';
import './ui/MainContent.css';
import { KnowledgeEntry } from '../types';
import ReactMarkdown from 'react-markdown';

interface MainContentProps {
  sidebarOpen: boolean;
  messages: any[];
  onSendMessage: (command: any) => void;
  searchResults?: KnowledgeEntry[];
}

function MainContent({ sidebarOpen, messages, onSendMessage, searchResults }: MainContentProps) {
  return (
    <div className={`main-content ${sidebarOpen ? '' : 'expanded'}`}>
      <div className="chat-container">
        <h1 className="app-title">Knowledge Base Assistant</h1>
        <p className="app-subtitle">Seleziona un argomento dalla sidebar o digita una domanda</p>
        
        <div className="messages-container">
          {searchResults && searchResults.length > 0 ? (
            <div className="search-results">
              <h2 className="search-results-title">Risultati della ricerca:</h2>
              <ul className="search-results-list">
                {searchResults.map((result, index) => (
                  <li key={index} className="search-result-item">
                    <div className="search-result-header">
                      <span className="search-result-topic">
                        {result['main-topic']} / {result.topic}
                      </span>
                      <h3 className="search-result-title">{result.object}</h3>
                    </div>
                    <div className="search-result-answer">
                      <ReactMarkdown>{result.answer}</ReactMarkdown>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : messages.length > 0 ? (
            messages.map((message: any) => (
              <div 
                key={message.id} 
                className={`message ${message.role === 'user' ? 'user-message' : 'system-message'}`}
              >
                <div className="message-avatar">
                  {message.role === 'user' ? 'U' : 'AI'}
                </div>
                <div className="message-content">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))
          ) : (
            <div className="welcome-message">
              <p>Benvenuto! Seleziona un argomento dalla sidebar per iniziare.</p>
            </div>
          )}
        </div>
        <ChatInput onCommand={onSendMessage} />
      </div>
    </div>
  );
}

export default MainContent;