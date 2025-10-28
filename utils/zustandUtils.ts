// utils/zustandUtils.ts

type ZustandSet<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;

/**
 * Utility to wrap an async function, handling the setting of loading and error states.
 * @param set - The Zustand 'set' function from the store.
 * @param loadingKey - The key in the state object to track loading (e.g., 'loadingTasks').
 * @param errorKey - The key in the state object to track errors (e.g., 'errorTasks').
 * @param asyncFunction - The asynchronous action function to execute.
 */
export const withAsyncStateHandling = <TState extends object>(
  set: ZustandSet<TState>,
  loadingKey: keyof TState,
  errorKey: keyof TState,
  asyncFunction: () => Promise<void>
) => {
  // 1. Set the initial loading state synchronously.
  set({ [loadingKey]: true, [errorKey]: null } as Partial<TState>);

  // 2. Execute the async function and handle its resolution with .then() and .catch().
  // This ensures the main function itself is synchronous and does not return a promise.
  asyncFunction()
    .then(() => {
      // 3. On success, turn off loading.
      set({ [loadingKey]: false } as Partial<TState>);
    })
    .catch((error) => {
      // 4. On failure, turn off loading and set the error message.
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      set({ [loadingKey]: false, [errorKey]: errorMessage } as Partial<TState>);
      console.error(`Async action failed for ${String(loadingKey)}:`, error);
      // We don't re-throw here to avoid unhandled promise rejections in useEffect callers.
    });
};
