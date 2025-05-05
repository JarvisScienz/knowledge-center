/*import { useState } from 'react';
import { Command } from '../types';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ChatInputProps {
  onCommand: (command: Command) => void;
}

const ChatInput = ({ onCommand }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parts = input.trim().split(' ');
    const commandType = parts[0];
    const args = parts.slice(1);

    if (commandType.startsWith('@')) {
      onCommand({ type: commandType as Command['type'], args });
    } else {
      // Handle non-command text as search
      onCommand({ type: '@search', args: [input.trim()] });
    }
    
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a command (e.g., @show java) or search term"
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
      />
      <button
        type="submit"
        className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Send"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </button>
    </form>
  );
};

export default ChatInput;*/
// components/ChatInput.js
import { useState, useEffect, useRef } from 'react';
import './ui/ChatInput.css';
import { Command } from '../types';

interface ChatInputProps {
  onCommand: (command: Command) => void;
}

const AVAILABLE_COMMANDS = ['show', 'search', 'add', 'export', 'help'];

const ChatInput = ({ onCommand }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState<string[]>([]);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.includes('@')) {
      const afterAt = value.split('@')[1] || '';
      const filtered = AVAILABLE_COMMANDS.filter(cmd => 
        cmd.toLowerCase().startsWith(afterAt.toLowerCase())
      );
      setFilteredCommands(filtered);
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleCommandSelect = (command: string) => {
    const parts = input.split('@');
    const newInput = parts[0] + '@' + command + ' ';
    setInput(newInput);
    setShowAutocomplete(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parts = input.trim().split(' ');
    const commandType = parts[0];
    const args = parts.slice(1);

    if (commandType.startsWith('@')) {
      onCommand({ type: commandType as Command['type'], args });
    } else {
      // Handle non-command text as search
      onCommand({ type: '@search', args: [input.trim()] });
    }
    
    setInput('');
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Scrivi un messaggio..."
            rows={1}
            className="chat-textarea"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={!input.trim()}
          >
            ➤
          </button>
        </div>
        {showAutocomplete && filteredCommands.length > 0 && (
          <div 
            ref={autocompleteRef}
            className="autocomplete-container"
          >
            {filteredCommands.map((command) => (
              <div
                key={command}
                className="autocomplete-item"
                onClick={() => handleCommandSelect(command)}
              >
                @{command}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default ChatInput;