import { GetServerSideProps } from "next";
import { getPaginatedTransactions } from "./dataFetchers";
import { TransactionsListViewProps } from "./TransactionsListView";

export const getTransactionsListViewProps: GetServerSideProps<
  TransactionsListViewProps
> = async context => {
  const { last10Transactions, totalCount } = await getPaginatedTransactions();

  return {
    props: {
      totalCount,
      transactions: last10Transactions,
      messages: (await import(`../../lang/${context.locale}.json`)).default
    }
  };
};
