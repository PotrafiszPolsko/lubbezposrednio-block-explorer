import { blockMapper, fetchBc, transactionMapper, votingMapper } from "@/utils";

export const getNumberOfAllVotings = fetchBc("get_number_of_all_votings", {
  errorMapper: () => 0,
  mapper: res => res.data.result.data
});

export const getNumberOfAllAddedVotes = fetchBc(
  "get_number_of_all_added_votes",
  {
    errorMapper: () => 0,
    mapper: res => res.data.result.data
  }
);

export const getNumberOfAllActiveVotings = fetchBc(
  "get_number_of_all_active_votings",
  {
    errorMapper: () => 0,
    mapper: res => res.data.result.data
  }
);

export const getNumberOfAllInactiveVotings = fetchBc(
  "get_number_of_all_inactive_votings",
  {
    errorMapper: () => 0,
    mapper: res => res.data.result.data
  }
);

export const getNumberOfAllVoters = fetchBc("get_number_of_all_voters", {
  errorMapper: () => 0,
  mapper: res => res.data.result.data.number_of_all_voters
});

export const getNumberOfMiners = fetchBc("get_number_of_miners", {
  errorMapper: res => 0,
  mapper: res => res.data.result.data.number_of_miners
});

export const getNumberOfAllTransactions = fetchBc(
  "get_number_of_all_transactions",
  {
    errorMapper: () => 0,
    mapper: res => res.data.result.data
  }
);

export const getLast5Blocks = fetchBc("get_last_5_blocks", {
  errorMapper: () => [],
  mapper: res => res.data.result.data.map(blockMapper)
});

export const getLast5Transactions = fetchBc("get_last_5_transactions", {
  errorMapper: res => [],
  mapper: res => res.data.result.data.map(transactionMapper)
});

export const getLast5Votings = fetchBc("get_last_5_votings", {
  errorMapper: res => [],
  mapper: res => res.data.result.data.map(votingMapper)
});
