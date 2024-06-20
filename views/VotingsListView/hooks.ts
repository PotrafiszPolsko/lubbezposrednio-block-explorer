import { usePaginatedData } from "@/hooks/usePaginatedData";
import { useSearchQueryFetcher } from "@/hooks/useSearchQueryFetcher";
import { Voting } from "@/types";
import { votingMapper } from "@/utils";
import { Dispatch, SetStateAction } from "react";

export const useVotingsListPaginatedData = (
  setVotingsData: Dispatch<SetStateAction<Voting[]>>
) =>
  usePaginatedData({
    method: "get_votings_per_page",
    onData: res => {
      setVotingsData(res.data.result.data.votings.map(votingMapper));
    },
    onError: res => {
      console.log("paginated data error", res);
    }
  });

export const useVotingsListSearchQueryFetcher = () =>
  useSearchQueryFetcher<{
    totalCount: number;
    votings: Voting[];
  }>({
    method: "get_votings_by_name_or_id",
    key: "voting_name_or_id",
    useOffset: true,
    onData: res => {
      console.log(res.data);

      if (res.data?.result?.data) {
        return {
          votings: res.data?.result?.data?.votings.map(votingMapper),
          totalCount: res.data?.result?.data["total number votings"]
        };
      }

      return undefined;
    },
    onError: res => {
      return {
        votings: [],
        totalCount: 0
      };
    }
  });
