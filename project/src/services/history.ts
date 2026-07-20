import type { QrHistoryItem } from '../types';
import { HISTORY_STORAGE_KEY, MAX_HISTORY_ITEMS } from '../constants';

export function loadHistory(): QrHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as QrHistoryItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, MAX_HISTORY_ITEMS);
  } catch {
    return [];
  }
}

export function saveHistoryItem(item: QrHistoryItem): QrHistoryItem[] {
  const current = loadHistory();
  const updated = [item, ...current].slice(0, MAX_HISTORY_ITEMS);
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Storage may be full (data URLs are large) — drop oldest and retry.
    if (updated.length > 1) {
      const trimmed = updated.slice(0, Math.ceil(updated.length / 2));
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
        return trimmed;
      } catch {
        /* give up silently */
      }
    }
  }
  return updated;
}

export function deleteHistoryItem(id: string): QrHistoryItem[] {
  const updated = loadHistory().filter((item) => item.id !== id);
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    /* ignore */
  }
  return updated;
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
