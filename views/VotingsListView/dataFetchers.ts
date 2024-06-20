import { FetchBcSuccess } from "@/types";
import { fetchBc, votingMapper } from "@/utils";

export const getPaginatedVotings = () =>
  fetchBc("get_votings_per_page", {
    params: { offset: 1 },
    errorMapper: () => ({ last10Votings: [], totalCount: 0 }),
    mapper: (res: FetchBcSuccess) => {
      return {
        last10Votings: res.data.result.data.votings.map(votingMapper),
        totalCount: res.data.result.data["total_number_votings"]
      };
    }
  });
