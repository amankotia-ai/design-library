import entries from './film-data.json';
export const filmEntries=entries;
export const filmSkillDownload='/film-motion/software-film-director-v3.4.zip';
export const filmCategories=[...new Set(entries.map(entry=>entry.category))];
