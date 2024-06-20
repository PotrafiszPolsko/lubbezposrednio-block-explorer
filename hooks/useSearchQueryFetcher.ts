import { FetchBcError, FetchBcSuccess } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useSearchQueryFetcher<T>({
  method,
  key,
  onData,
  useOffset = false,
  onError
}: {
  method: string;
  key: string;
  useOffset?: boolean;
  onData: (res: FetchBcSuccess) => T | undefined;
  onError: (res: FetchBcError) => void;
}) {
  const [isSearchLoading, setIsSerachLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<T>();
  const [searchError, setSearchError] = useState(false);

  const router = useRouter();

  async function fetchData() {
    console.log("fetching data", {
      method,
      key,
      query: router.query.query,
      offset: router.query.page
    });
    setIsSerachLoading(true);
    const res = await fetch("/api/getSearchResult", {
      method: "POST",
      body: JSON.stringify({
        method,
        key,
        query: router.query.query,
        ...(useOffset ? { offset: router.query.page || 1 } : {})
      })
    });

    const data: FetchBcError | FetchBcSuccess = await res.json();

    if (data.ok) {
      const mapped = onData(data);
      setSearchResult(mapped);
      if (!mapped) setSearchError(true);
    } else {
      onError(data);
      setSearchResult(undefined);
      setSearchError(true);
    }

    setIsSerachLoading(false);
  }

  useEffect(() => {
    if (router.query.query) {
      setSearchError(false);
      setIsSerachLoading(false);
      fetchData();
    } else {
      setSearchResult(undefined);
      setSearchError(false);
      setIsSerachLoading(false);
    }
  }, [router.query.query, router.query.page, method]);

  return { isSearchLoading, searchResult, searchError };
}
