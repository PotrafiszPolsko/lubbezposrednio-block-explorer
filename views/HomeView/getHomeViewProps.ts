import { GetServerSideProps } from "next";

import { HomeViewProps } from "./HomeView";
import {
  getNumberOfAllVotings,
  getNumberOfAllAddedVotes,
  getNumberOfAllActiveVotings,
  getNumberOfAllInactiveVotings,
  getNumberOfAllVoters,
  getNumberOfMiners,
  getNumberOfAllTransactions,
  getLast5Blocks,
  getLast5Transactions,
  getLast5Votings
} from "./dataFetchers";

export const getHomeViewProps: GetServerSideProps<
  HomeViewProps
> = async context => {
  const [
    numberOfAllVotings,
    numberOfAllAddedVotes,
    numberOfAllActiveVotings,
    numberOfAllInactiveVotings,
    numberOfAllVoters,
    numberOfMiners,
    numberOfAllTransactions,
    last5Blocks,
    last5Transactions,
    last5Votings
  ] = await Promise.all([
    getNumberOfAllVotings,
    getNumberOfAllAddedVotes,
    getNumberOfAllActiveVotings,
    getNumberOfAllInactiveVotings,
    getNumberOfAllVoters,
    getNumberOfMiners,
    getNumberOfAllTransactions,
    getLast5Blocks,
    getLast5Transactions,
    getLast5Votings
  ]);

  return {
    props: {
      votingStats: {
        numberOfAllVotings,
        numberOfAllAddedVotes,
        numberOfAllActiveVotings,
        numberOfAllInactiveVotings,
        numberOfAllVoters,
        numberOfMiners,
        numberOfAllTransactions
      },
      last5Blocks,
      last5Transactions,
      last5Votings,
      messages: (await import(`../../lang/${context.locale}.json`)).default
    }
  };
};
