"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useCustomSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const pushQuery = useCallback(
    (name: string, value: string) => {
      router.push(`${pathname}?${createQueryString(name, value)}`);
    },
    [createQueryString, pathname, router]
  );
  const removeQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );
  const getQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      return params.get(name);
    },
    [searchParams]
  );
  return { pushQuery, removeQuery, getQuery };
};

export default useCustomSearchParams;
