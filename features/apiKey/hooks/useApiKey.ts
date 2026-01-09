"use client";

import { useCallback, useEffect, useState } from "react";

const API_KEY_STORAGE_KEY = "ghibli_user_api_key";

export function useApiKey() {
  const [apiKey, setApiKeyState] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load API key from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedKey) {
      setApiKeyState(storedKey);
    }
    setIsLoaded(true);
  }, []);

  const setApiKey = useCallback((key: string) => {
    const trimmedKey = key.trim();
    setApiKeyState(trimmedKey);
    if (trimmedKey) {
      localStorage.setItem(API_KEY_STORAGE_KEY, trimmedKey);
    } else {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    }
  }, []);

  const clearApiKey = useCallback(() => {
    setApiKeyState("");
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }, []);

  const hasApiKey = Boolean(apiKey && apiKey.length > 0);

  return {
    apiKey,
    setApiKey,
    clearApiKey,
    hasApiKey,
    isLoaded,
  };
}
