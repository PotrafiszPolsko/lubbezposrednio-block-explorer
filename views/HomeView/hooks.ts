import { useSearchQueryFetcher } from "@/hooks/useSearchQueryFetcher";
import { Transaction, Voting, Block, AuthUser } from "@/types";
import { transactionMapper, votingMapper } from "@/utils";
import { AUTH_VOTER_TYPE, SEARCH_ENDPOINTS } from "./constants";
import { FetchBcError, FetchBcSuccess } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useHomeViewSearchQueryFetcher = () => {
  const {
    isSearchLoading: isTransactionsSearchLoading,
    searchResult: transactionsSearchResult,
    searchError: transactionsSearchError
  } = useSearchQueryFetcher<Transaction>({
    method: SEARCH_ENDPOINTS.transactions.name,
    key: SEARCH_ENDPOINTS.transactions.key,
    useOffset: false,
    onData: res => {
      if (res.data.result?.data) {
        return transactionMapper(res.data.result.data);
      }

      return undefined;
    },
    onError: res => {
      console.log("onError", res);
    }
  });

  const {
    isSearchLoading: isBlocksSearchLoading,
    searchResult: blocksSearchResult,
    searchError: blocksSearchError
  } = useSearchQueryFetcher<Block>({
    method: SEARCH_ENDPOINTS.blocks.name,
    key: SEARCH_ENDPOINTS.blocks.key,
    useOffset: false,
    onData: res => {
      if (res.data.result?.data) {
        const block = res.data.result?.data;
        const mappedBlock: Block = {
          id: block.actual_hash,
          date: new Date(block.block_time * 1000).toISOString().split("T")[0],
          transactionsAmount: block.number_of_transactions
        };

        return mappedBlock;
      }

      return undefined;
    },
    onError: res => {
      console.log("onError", res);
    }
  });
  const {
    isSearchLoading: isVotingsSearchLoading,
    searchResult: votingsSearchResult,
    searchError: votingsSearchError
  } = useSearchQueryFetcher<{ votings: Voting[]; totalCount: number }>({
    method: SEARCH_ENDPOINTS.votings.name,
    key: SEARCH_ENDPOINTS.votings.key,
    useOffset: true,
    onData: res => {
      if (res.data.result?.data) {
        console.log(res.data.result.data);
        return {
          votings: (res.data.result?.data.votings || []).map(votingMapper),
          totalCount: res.data?.result?.data["total_number_votings"]
        };
      }

      return undefined;
    },
    onError: res => {
      console.log("onError", res);
    }
  });

  const {
    isSearchLoading: isUserSearchLoading,
    searchResult: usersSearchResult,
    searchError: usersSearchError
  } = useSearchUserPermissions();

  console.log("ttt", usersSearchResult);

  const isSearchLoading =
    isTransactionsSearchLoading ||
    isBlocksSearchLoading ||
    isVotingsSearchLoading ||
    isUserSearchLoading;
  const searchError =
    transactionsSearchError &&
    blocksSearchError &&
    votingsSearchError &&
    usersSearchError;

  return {
    isSearchLoading,
    searchResult: {
      transactionsSearchResult,
      blocksSearchResult,
      votingsSearchResult,
      usersSearchResult
    },
    searchError
  };
};

export function useSearchUserPermissions() {
  const [isSearchLoading, setIsSerachLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<AuthUser>();
  const [searchError, setSearchError] = useState(false);

  const router = useRouter();

  async function fetchData() {
    console.log("fetching data", {
      method: SEARCH_ENDPOINTS.users.name,
      key: SEARCH_ENDPOINTS.users.key,
      query: router.query.query,
      offset: router.query.page
    });
    setIsSerachLoading(true);
    const res = await fetch("/api/getSearchResult", {
      method: "POST",
      body: JSON.stringify({
        method: SEARCH_ENDPOINTS.users.name,
        key: SEARCH_ENDPOINTS.users.key,
        query: router.query.query
      })
    });

    const data: FetchBcError | FetchBcSuccess = await res.json();

    if (!data.ok) {
      console.log("onError", data);
      setSearchResult(undefined);
      setSearchError(true);
      setIsSerachLoading(false);
      return;
    }

    const authData = data.data?.result?.data?.authorizations_data?.[0];
    const authType = authData?.type_of_authorized;
    const txId = authData?.txid;

    if (authType !== AUTH_VOTER_TYPE || !txId) {
      setIsSerachLoading(false);
      return;
    }

    const txRes = await fetch("/api/getSearchResult", {
      method: "POST",
      body: JSON.stringify({
        method: SEARCH_ENDPOINTS.transactions.name,
        key: SEARCH_ENDPOINTS.transactions.key,
        query: txId
      })
    });

    const txData: FetchBcError | FetchBcSuccess = await txRes.json();

    if (!txData.ok) {
      console.log("onError", txData);
      setSearchResult(undefined);
      setSearchError(true);
      setIsSerachLoading(false);
      return;
    }

    const blockRes = await fetch("/api/getSearchResult", {
      method: "POST",
      body: JSON.stringify({
        method: "get_block_by_txid",
        key: "txid",
        query: txId
      })
    });

    const blockData: FetchBcError | FetchBcSuccess = await blockRes.json();

    if (!blockData.ok) {
      console.log("onError", blockData);
      setSearchResult(undefined);
      setSearchError(true);
      setIsSerachLoading(false);
      return;
    }
    console.log("ppp", blockData);

    const authkRes = await fetch("/api/getSearchResult", {
      method: "POST",
      body: JSON.stringify({
        method: "get_authorize_level_of_voter",
        key: "pk",
        query: router.query.query
      })
    });

    const authkData: FetchBcError | FetchBcSuccess = await authkRes.json();

    if (!authkData.ok) {
      console.log("onError", authkData);
      setSearchResult(undefined);
      setSearchError(true);
      setIsSerachLoading(false);
      return;
    }
    console.log("rrr", authkData);

    const permissionGranter = txData?.data?.result?.data?.vin?.[0]?.pk;

    const transactionTime = new Date(
      blockData?.data?.result?.data?.header?.block_time * 1000
    )
      .toISOString()
      .split("T")[0];
    const [authOrganisation, authLevel] =
      Object.entries(
        authkData?.data?.result?.data?.authorization_level ?? {}
      )?.[0] ?? [];

    setSearchResult({
      id: router.query.query as string,
      authOrganisation,
      authLevel: authLevel as number,
      permissionGranter,
      transactionTime
    });
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
  }, [router.query.query, router.query.page]);

  return { isSearchLoading, searchResult, searchError };
}
