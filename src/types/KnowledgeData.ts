export interface KnowledgeItem {
    object: string;
    answer: string;
  }
  
  export interface TopicMap {
    [topic: string]: KnowledgeItem[];
  }
  
  export interface KnowledgeData {
    [mainTopic: string]: TopicMap;
  }