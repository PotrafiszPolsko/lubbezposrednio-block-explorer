import { GetServerSideProps } from "next";
import { getPaginatedVotings } from "./dataFetchers";
import { VotingListViewProps } from "./VotingsListView";

export const getVotingListViewProps: GetServerSideProps<
  VotingListViewProps
> = async context => {
  const { last10Votings, totalCount } = await getPaginatedVotings();

  return {
    props: {
      votings: last10Votings,
      totalCount,
      messages: (await import(`../../lang/${context.locale}.json`)).default
    }
  };
};
