/*import { useState } from 'react';
import { TopicNode, KnowledgeEntry } from '../types';
import { ChevronRightIcon, ChevronDownIcon, ArrowLeftIcon, Bars3Icon } from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  knowledgeBase: TopicNode[];
  onSelectEntry: (entry: KnowledgeEntry) => void;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, knowledgeBase, onSelectEntry, toggleSidebar }: SidebarProps) => {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleTopic = (topicPath: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicPath)) {
      newExpanded.delete(topicPath);
    } else {
      newExpanded.add(topicPath);
    }
    setExpandedTopics(newExpanded);
  };

  const renderTopic = (topic: TopicNode, path: string = '') => {
    const currentPath = path ? `${path}/${topic.name}` : topic.name;
    const isExpanded = expandedTopics.has(currentPath);

    return (
      <div key={currentPath} className="pl-2">
        <div
          className="flex items-center py-1.5 px-2 rounded-md cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 gap-1 text-gray-700 dark:text-gray-200"
          onClick={() => toggleTopic(currentPath)}
        >
          {topic.children.length > 0 && (
            isExpanded ? (
              <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
            )
          )}
          {isOpen && (
            <span className="text-sm font-medium truncate">{topic.name}</span>
          )}
        </div>
        {isExpanded && (
          <div className="ml-2 border-l border-gray-200 dark:border-gray-700 pl-2">
            {topic.children.map((child) => renderTopic(child, currentPath))}
            {topic.entries.map((entry, index) => (
              <div
                key={index}
                className="py-1.5 px-2 rounded-md cursor-pointer text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors"
                onClick={() => onSelectEntry(entry)}
              >
                {isOpen ? (
                  <span className="truncate block">{entry.object}</span>
                ) : (
                  <span className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full block mx-auto" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="flex flex-col h-full">
      
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isOpen ? (
            <ArrowLeftIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Bars3Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>
        {isOpen && (
          <div className="text-lg font-semibold text-gray-900 dark:text-white ml-3 truncate">
            Knowledge Base
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {knowledgeBase.map((topic) => renderTopic(topic))}
      </nav>
    </aside>
  );
};

export default Sidebar;*/
// components/Sidebar.js
import './ui/Sidebar.css';

function Sidebar({ 
  isOpen, 
  toggleSidebar, 
  knowledgeData, 
  selectedMainTopic,
  selectedTopic,
  onMainTopicSelect,
  onTopicSelect,
  onObjectSelect
}: any) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'mini'}`}>
      {isOpen ? (
        // Sidebar completa
        <>
          <div className="sidebar-header">
            <button className="toggle-sidebar-button" onClick={toggleSidebar}>
              ◀
            </button>
          </div>
          
          <div className="history-container">
            <div className="knowledge-tree">
              <h3 className="tree-title">Knowledge Base</h3>
              
              {/* Main Topics */}
              {Object.keys(knowledgeData).map(mainTopic => (
                <div key={mainTopic} className="tree-item">
                  <div 
                    className={`main-topic ${selectedMainTopic === mainTopic ? 'selected' : ''}`}
                    onClick={() => onMainTopicSelect(mainTopic)}
                  >
                    {mainTopic}
                  </div>
                  
                  {/* Topics (mostrati solo se il main-topic è selezionato) */}
                  {selectedMainTopic === mainTopic && (
                    <div className="topic-list">
                      {Object.keys(knowledgeData[mainTopic]).map(topic => (
                        <div key={topic} className="tree-item">
                          <div 
                            className={`topic ${selectedTopic === topic ? 'selected' : ''}`}
                            onClick={() => onTopicSelect(topic)}
                          >
                            {topic}
                          </div>
                          
                          {/* Objects (mostrati solo se il topic è selezionato) */}
                          {selectedTopic === topic && (
                            <div className="object-list">
                              {knowledgeData[mainTopic][topic].map((item: any) => (
                                <div 
                                    className="object"
                                    onClick={() => onObjectSelect(item.object)}
                                    //data-tooltip={item.object}  // Aggiungiamo il testo completo come attributo
                                >
                                    {item.object}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">U</div>
              <div className="user-name">Utente</div>
            </div>
          </div>
        </>
      ) : (
        // Sidebar mini
        <div className="sidebar-mini">
          <button className="toggle-sidebar-button-mini" onClick={toggleSidebar}>
            ▶
          </button>
          <div className="user-avatar mini-avatar">U</div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;