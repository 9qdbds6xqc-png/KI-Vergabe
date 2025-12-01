/**
 * Backlog Storage System
 * Stores all chat messages, questions, and answers
 */

export interface BacklogEntry {
  id: string;
  timestamp: number;
  pdfFileName?: string;
  question: string;
  answer: string;
  isPricingQuestion: boolean;
  sessionId: string;
}

const BACKLOG_KEY = 'trafosanf_chat_backlog';
const SESSION_KEY = 'trafosanf_session_id';

/**
 * Get or create session ID
 */
export function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Get all backlog entries
 */
export function getBacklogEntries(): BacklogEntry[] {
  try {
    const stored = localStorage.getItem(BACKLOG_KEY);
    if (!stored) return [];
    
    const entries: BacklogEntry[] = JSON.parse(stored);
    // Sort by timestamp, newest first
    return entries.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error reading backlog:', error);
    return [];
  }
}

/**
 * Add entry to backlog
 */
export function addBacklogEntry(
  question: string,
  answer: string,
  pdfFileName?: string,
  isPricingQuestion: boolean = false
): void {
  try {
    const entries = getBacklogEntries();
    const sessionId = getSessionId();
    
    const newEntry: BacklogEntry = {
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      pdfFileName,
      question,
      answer,
      isPricingQuestion,
      sessionId,
    };
    
    entries.unshift(newEntry); // Add to beginning
    
    // Keep only last 1000 entries to prevent storage issues
    const maxEntries = 1000;
    const trimmedEntries = entries.slice(0, maxEntries);
    
    localStorage.setItem(BACKLOG_KEY, JSON.stringify(trimmedEntries));
  } catch (error) {
    console.error('Error saving to backlog:', error);
    // Storage might be full, try to clear old entries
    try {
      const entries = getBacklogEntries();
      const recentEntries = entries.slice(0, 500); // Keep only 500 most recent
      localStorage.setItem(BACKLOG_KEY, JSON.stringify(recentEntries));
      // Retry adding the entry
      const sessionId = getSessionId();
      const newEntry: BacklogEntry = {
        id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        pdfFileName,
        question,
        answer,
        isPricingQuestion,
        sessionId,
      };
      recentEntries.unshift(newEntry);
      localStorage.setItem(BACKLOG_KEY, JSON.stringify(recentEntries.slice(0, 500)));
    } catch (retryError) {
      console.error('Failed to save to backlog after cleanup:', retryError);
    }
  }
}

/**
 * Clear all backlog entries
 */
export function clearBacklog(): void {
  try {
    localStorage.removeItem(BACKLOG_KEY);
  } catch (error) {
    console.error('Error clearing backlog:', error);
  }
}

/**
 * Export backlog as JSON
 */
export function exportBacklog(): string {
  const entries = getBacklogEntries();
  return JSON.stringify(entries, null, 2);
}

/**
 * Get entries filtered by session
 */
export function getEntriesBySession(sessionId: string): BacklogEntry[] {
  const entries = getBacklogEntries();
  return entries.filter(entry => entry.sessionId === sessionId);
}

/**
 * Get entries filtered by PDF
 */
export function getEntriesByPDF(pdfFileName: string): BacklogEntry[] {
  const entries = getBacklogEntries();
  return entries.filter(entry => entry.pdfFileName === pdfFileName);
}

/**
 * Format timestamp to readable date
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

