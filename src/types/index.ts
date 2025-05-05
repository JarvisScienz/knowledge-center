export interface KnowledgeEntry {
  "main-topic": string;
  topic: string;
  object: string;
  answer: string;
}

export interface TopicNode {
  name: string;
  children: TopicNode[];
  entries: KnowledgeEntry[];
}

export type CommandType = 
  | '@show'
  | '@search'
  | '@add'
  | '@edit'
  | '@delete'
  | '@export'
  | '@help';

export interface Command {
  type: CommandType;
  args: string[];
} 