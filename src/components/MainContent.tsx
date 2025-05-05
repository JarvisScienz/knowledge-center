/*import { KnowledgeEntry } from '../types';

interface MainContentProps {
  entry: KnowledgeEntry | null;
}

const MainContent = ({ entry }: MainContentProps) => {
  if (!entry) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <h2 className="text-2xl font-semibold mb-2">Select an entry</h2>
          <p>Choose a topic from the sidebar or search for specific content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full py-6 px-4">
      <div className="mb-6">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {entry['main-topic']} / {entry.topic}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{entry.object}</h1>
        <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-4"></div>
      </div>
      
      <div className="prose dark:prose-invert">
        {entry.answer.split('\n').map((paragraph, idx) => (
          paragraph ? (
            <p key={idx} className="mb-4 text-gray-700 dark:text-gray-300">
              {paragraph}
            </p>
          ) : <div key={idx} className="h-2"></div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;*/
// components/MainContent.js
import ChatInput from './ChatInput';
import './ui/MainContent.css';
import { KnowledgeEntry } from '../types';

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
                    <p className="search-result-answer">{result.answer}</p>
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
                  {message.content.split('\n').map((line: any, i: any) => (
                    <p key={i}>{line}</p>
                  ))}
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