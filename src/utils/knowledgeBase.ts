import { KnowledgeEntry } from '../types';
import { KnowledgeData, TopicMap, KnowledgeItem } from '../types/KnowledgeData';

export const addEntryToKnowledgeBase = (
  knowledgeBase: KnowledgeData,
  entry: KnowledgeEntry
): KnowledgeData => {
  const newBase = { ...knowledgeBase };

  // Initialize main topic if it doesn't exist
  if (!newBase[entry["main-topic"]]) {
    newBase[entry["main-topic"]] = {};
  }

  // Initialize topic if it doesn't exist
  if (!newBase[entry["main-topic"]][entry.topic]) {
    newBase[entry["main-topic"]][entry.topic] = [];
  }

  // Add the entry
  newBase[entry["main-topic"]][entry.topic].push({
    object: entry.object,
    answer: entry.answer
  });

  return newBase;
};

export const searchKnowledgeBase = (
  knowledgeBase: KnowledgeData,
  keyword: string
): KnowledgeEntry[] => {
  const results: KnowledgeEntry[] = [];
  const keywordLower = keyword.toLowerCase();

  // Iterate through main topics
  Object.entries(knowledgeBase).forEach(([mainTopic, topics]) => {
    // Iterate through topics
    Object.entries(topics as TopicMap).forEach(([topic, items]) => {
      // Search in items
      items.forEach((item: KnowledgeItem) => {
        if (
          item.object.toLowerCase().includes(keywordLower) ||
          item.answer.toLowerCase().includes(keywordLower)
        ) {
          results.push({
            "main-topic": mainTopic,
            topic,
            object: item.object,
            answer: item.answer
          });
        }
      });
    });
  });

  return results;
};

export const exportKnowledgeBase = (knowledgeBase: KnowledgeData): string => {
  const entries: KnowledgeEntry[] = [];

  // Convert KnowledgeData back to flat array of KnowledgeEntry
  Object.entries(knowledgeBase).forEach(([mainTopic, topics]) => {
    Object.entries(topics as TopicMap).forEach(([topic, items]) => {
      items.forEach((item: KnowledgeItem) => {
        entries.push({
          "main-topic": mainTopic,
          topic,
          object: item.object,
          answer: item.answer
        });
      });
    });
  });

  return JSON.stringify(entries, null, 2);
}; 