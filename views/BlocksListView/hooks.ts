import { usePaginatedData } from "@/hooks/usePaginatedData";
import { useSearchQueryFetcher } from "@/hooks/useSearchQueryFetcher";
import { Block } from "@/types";
import { blockMapper } from "@/utils";
import { Dispatch, SetStateAction } from "react";

export const useBlocksListSearchQueryFetcher = () =>
  useSearchQueryFetcher<Block>({
    method: "get_block_by_id_without_txs_and_signs",
    key: "block_id",
    onData: res => {
      if (res.data?.result?.data) {
        const block = res.data.result?.data;
        const mappedBlock: Block = {
          id: block.actual_hash,
          date: new Date(block.block_time * 1000).toISOString().split("T")[0],
          transactionsAmount: block.number_of_transactions
        };

        return mappedBlock;
      }

      return;
    },
    onError: res => {
      console.log("onError", res);
    }
  });

export const useBlocksListPaginatedData = (
  setBlocksData: Dispatch<SetStateAction<Block[]>>
) =>
  usePaginatedData({
    method: "get_sorted_blocks_per_page",
    onData: res => {
      setBlocksData(res.data.result.data.blocks.map(blockMapper));
    },
    onError: res => {
      console.log("paginated data error", res);
    }
  });
