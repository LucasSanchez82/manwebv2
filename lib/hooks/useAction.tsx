"use client";
import React from "react";
type UseActionType = <T extends (...args: any[]) => Promise<any>>(
  action: T
) => {
  pending: boolean;
  data: Awaited<ReturnType<T>> | null;
  error: Error | null;
  execute: (...args: Parameters<T>) => Promise<void>;
};
const useAction: UseActionType = (action) => {
  const [{ pending, data, error }, setState] = React.useState<{
    pending: boolean;
    data: any;
    error: Error | null;
  }>({
    pending: false,
    data: null,
    error: null,
  });
  const setPending = React.useCallback(
    () => setState({ pending: true, data: null, error: null }),
    []
  );
  const setNotPending = React.useCallback(
    () => setState({ pending: false, data: null, error: null }),
    []
  );
  const setData = React.useCallback(
    (data: any) => setState({ pending: false, data, error: null }),
    []
  );
  const setError = React.useCallback(
    (error: Error) => setState({ pending: false, data: null, error }),
    []
  );

  const execute = React.useCallback(async (...args: any[]) => {
    setPending();
    try {
      const data = await action(...args);
      setData(data);
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
    }
  }, []);
  return { pending, data, error, execute };
};

export default useAction;
