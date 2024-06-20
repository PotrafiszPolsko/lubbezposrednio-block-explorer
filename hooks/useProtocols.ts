import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useProtocols() {
  const [isLoading, setIsLoading] = useState(false);
  const [protocols, setProtocols] = useState([]);
  const router = useRouter();

  async function fetchData(search?: string) {
    setIsLoading(true);

    const res = await fetch(`/api/getProtocols?search=${search ?? ""}`, {
      method: "GET"
    });

    const data = await res.json();

    const dataToSave = data.payload.map(
      ({ resolutionCreatedAt, ...protocol }: any) => ({
        ...protocol,
        date: new Date(resolutionCreatedAt).toISOString().split("T")[0]
      })
    );
    setProtocols(dataToSave);

    setIsLoading(false);
  }

  useEffect(() => {
    fetchData(router.query.query as string);
  }, [router.query.query]);

  return { protocols, isLoading };
}
