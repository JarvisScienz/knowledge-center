import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { KnowledgeEntry, Command } from './types';
import { KnowledgeData } from './types/KnowledgeData';
import { addEntryToKnowledgeBase, searchKnowledgeBase, exportKnowledgeBase } from './utils/knowledgeBase';
import initialData from './data/knowledge-base.json';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [knowledgeData, setKnowledgeData] = useState<KnowledgeData>({});
  const [selectedMainTopic, setSelectedMainTopic] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [, setSelectedEntry] = useState<KnowledgeEntry | null>(null);
  const [searchResults, setSearchResults] = useState<KnowledgeEntry[]>([]);
  const [, setSelectedObject] = useState<string | null>(null);
  const [, setCurrentAnswer] = useState("");
  const [, setChatMessages] = useState<{type: 'command' | 'result', content: string}[]>([]);
  
  interface Message {
    id: number;
    role: 'system' | 'user' | 'assistant';
    content: string;
  }
  
  const [messages, setMessages] = useState<Message[]>([]);

  // Organize data for hierarchical display
  useEffect(() => {
    const processData = (data: any[]): KnowledgeData => {
      const mainTopics: KnowledgeData = {};
      
      // Group by main-topic, topic, object
      data.forEach((item) => {
        const mainTopic = item["main-topic"];
        const topic = item.topic;
        const object = item.object;
        const answer = item.answer;
        
        if (!mainTopics[mainTopic]) {
          mainTopics[mainTopic] = {};
        }
        
        if (!mainTopics[mainTopic][topic]) {
          mainTopics[mainTopic][topic] = [];
        }
        
        mainTopics[mainTopic][topic].push({
          object,
          answer
        });
      });
      
      return mainTopics;
    };
    
    const processedData = processData(initialData);
    setKnowledgeData(processedData);
  }, []);

  const handleMainTopicSelect = (mainTopic: string) => {
    setSelectedMainTopic(mainTopic);
    setSelectedTopic(null);
    setSelectedObject(null);
    setCurrentAnswer("");
    
    // Add a message showing all topics for this main-topic
    const topicsList = Object.keys(knowledgeData[mainTopic]);
    setMessages([{
      id: 1,
      role: 'system',
      content: `Here are all topics for "${mainTopic}":\n${topicsList.map(t => `- ${t}`).join('\n')}`
    }]);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setSelectedObject(null);
    setCurrentAnswer("");
    
    if (!selectedMainTopic) {
      console.error('Main topic is null');
      return;
    }
    
    const objectsList = knowledgeData[selectedMainTopic][topic].map(item => item.object);
    setMessages([{
      id: 1,
      role: 'system',
      content: `Here are all objects for "${topic}":\n${objectsList.map(o => `- ${o}`).join('\n')}`
    }]);
  };

  const handleObjectSelect = (object: string) => {
    setSelectedObject(object);

    if (!selectedMainTopic || !selectedTopic) {
      console.error('Main topic or topic is null');
      return;
    }
    
    // Find the answer corresponding to the selected object
    const selectedItem = knowledgeData[selectedMainTopic][selectedTopic].find(
      item => item.object === object
    );
    
    if (selectedItem) {
      setCurrentAnswer(selectedItem.answer);
      setMessages([{
        id: 1,
        role: 'system',
        content: `${object}\n\n${selectedItem.answer}`
      }]);
    }
  };

  const handleCommand = (command: Command) => {
    // Add command to chat history
    setChatMessages(prev => [...prev, {type: 'command', content: `${command.type} ${command.args.join(' ')}`}]);
    
    switch (command.type) {
      case '@show':
      case '@search':
        if (command.args.length > 0) {
          const results = searchKnowledgeBase(knowledgeData, command.args[0]);
          setSearchResults(results);
          if (results.length > 0) {
            setSelectedEntry(results[0]);
            setChatMessages(prev => [...prev, {
              type: 'result', 
              content: `Found ${results.length} results for "${command.args[0]}"`
            }]);
          } else {
            setChatMessages(prev => [...prev, {
              type: 'result', 
              content: `No results found for "${command.args[0]}"`
            }]);
          }
        }
        break;
      case '@add':
        if (command.args.length >= 4) {
          const newEntry: KnowledgeEntry = {
            "main-topic": command.args[0],
            topic: command.args[1],
            object: command.args[2],
            answer: command.args.slice(3).join(' '),
          };
          setKnowledgeData(prev => addEntryToKnowledgeBase(prev, newEntry));
          setChatMessages(prev => [...prev, {
            type: 'result', 
            content: `Added new entry under ${command.args[0]} > ${command.args[1]}: ${command.args[2]}`
          }]);
        } else {
          setChatMessages(prev => [...prev, {
            type: 'result', 
            content: `Error: @add requires at least 4 arguments`
          }]);
        }
        break;
      case '@export':
        const jsonData = exportKnowledgeBase(knowledgeData);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'knowledge-base.json';
        a.click();
        URL.revokeObjectURL(url);
        setChatMessages(prev => [...prev, {
          type: 'result', 
          content: `Knowledge base exported successfully`
        }]);
        break;
      case '@help':
        setChatMessages(prev => [...prev, {
          type: 'result', 
          content: `Available commands: @show, @search, @add, @edit, @delete, @export, @help`
        }]);
        break;
      default:
        setChatMessages(prev => [...prev, {
          type: 'result', 
          content: `Unknown command: ${command.type}`
        }]);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar}
        knowledgeData={knowledgeData}
        selectedMainTopic={selectedMainTopic}
        selectedTopic={selectedTopic}
        onMainTopicSelect={handleMainTopicSelect}
        onTopicSelect={handleTopicSelect}
        onObjectSelect={handleObjectSelect}
      />
      <MainContent 
        sidebarOpen={sidebarOpen}
        messages={messages} 
        onSendMessage={handleCommand}
        searchResults={searchResults}
      />
    </div>
  );
}

export default App;