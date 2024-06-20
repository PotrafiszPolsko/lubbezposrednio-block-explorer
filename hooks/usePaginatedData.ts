import { FetchBcError, FetchBcSuccess } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFirstRender } from "./useFirstRender";

export function usePaginatedData<T>({
  method,
  onData,
  onError,
  key,
  keyValue
}: {
  method: string;
  key?: string;
  keyValue?: string;
  onData: (res: FetchBcSuccess) => T;
  onError: (res: FetchBcError) => T;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const isFirstRender = useFirstRender();

  async function fetchData() {
    setIsLoading(true);

    const res = await fetch("/api/getPaginatedData", {
      method: "POST",
      body: JSON.stringify({
        method,
        offset: router.query.page || 1,
        key,
        keyValue
      })
    });

    const data: FetchBcError | FetchBcSuccess = await res.json();

    if (data.ok) {
      onData(data);
    } else {
      onError(data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!isFirstRender) {
      fetchData();
    }
  }, [router.query.page]);

  return isLoading;
}
