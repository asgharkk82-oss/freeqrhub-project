import { useCallback, useEffect, useState } from 'react';
import type { QrHistoryItem } from '../types';
import {
  clearHistory,
  deleteHistoryItem,
  loadHistory,
  saveHistoryItem,
} from '../services/history';

export function useQrHistory() {
  const [history, setHistory] = useState<QrHistoryItem[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const addItem = useCallback((item: QrHistoryItem) => {
    setHistory(saveHistoryItem(item));
  }, []);

  const removeItem = useCallback((id: string) => {
    setHistory(deleteHistoryItem(id));
  }, []);

  const clear = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  return { history, addItem, removeItem, clear };
}
