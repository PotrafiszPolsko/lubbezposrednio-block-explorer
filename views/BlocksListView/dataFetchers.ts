import { FetchBcSuccess } from "@/types";
import { blockMapper, fetchBc } from "@/utils";

export const getBlocksListData = () =>
  fetchBc("get_sorted_blocks_per_page", {
    params: { offset: 1 },
    errorMapper: () => ({ latest10Blocks: [], totalCount: 0 }),
    mapper: (res: FetchBcSuccess) => {
      return {
        latest10Blocks: res.data.result.data.blocks.map(blockMapper),
        totalCount: res.data.result.data["total_number_blocks"]
      };
    }
  });
