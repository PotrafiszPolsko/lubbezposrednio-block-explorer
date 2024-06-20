import { AuthUser, Block, Transaction, Voting } from "@/types";

export type SearchResult =
  | Transaction
  | Block
  | AuthUser
  | {
      votings: Voting[];
      totalCount: number;
    }
  | undefined;

export type VotingStats = {
  numberOfAllVotings: number;
  numberOfAllAddedVotes: number;
  numberOfAllActiveVotings: number;
  numberOfAllInactiveVotings: number;
  numberOfAllVoters: number;
  numberOfMiners: number;
  numberOfAllTransactions: number;
};
