// hooks/useZustandAsync.ts

// A generic type for a Zustand store hook, like `useTaskStore`
type ZustandStoreHook<T> = <U>(selector: (state: T) => U) => U;

/**
 * Custom hook to easily select and consume the standardized [loading, error] tuple
 * from a Zustand store.
 * @param storeHook - The Zustand store hook (e.g., useTaskStore).
 * @param selector - A function to select the [loading, error] tuple from the store state.
 * @returns A tuple: [isLoading: boolean, errorMessage: string | null].
 */
export function useZustandAsync<T>(
  storeHook: ZustandStoreHook<T>,
  selector: (state: T) => [boolean, string | null]
): [boolean, string | null] {
  return storeHook(selector);
}
