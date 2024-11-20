"use client";
import React from "react";
type UseActionType = <T extends (...args: any[]) => Promise<any>>(
  action: T
) => {
  pending: boolean;
  data: Awaited<ReturnType<T>> | null;
  error: Error | null;
  execute: (
    ...args: Parameters<T>
  ) => Promise<{ data: Awaited<ReturnType<T>> } | { error: string }>;
};
const useAction: UseActionType = (action) => {
  const [{ pending, data, error }, setState] = React.useState<
    Omit<ReturnType<UseActionType>, "execute">
  >({
    pending: false,
    data: null,
    error: null,
  });

  const setPending = () => setState({ pending: true, data: null, error: null });
  const setData = (data: any) =>
    setState({ pending: false, data, error: null });
  const setError = (error: Error) =>
    setState({ pending: false, data: null, error });
  const execute = async (...args: any[]) => {
    setPending();
    try {
      const data = await action(...args);
      setData(data);
      return data;
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };
  return { pending, data, error, execute };
};

export default useAction;
