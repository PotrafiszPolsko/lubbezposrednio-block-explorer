import { getTransactionsListViewProps } from "@/views/TransactionsListView/getTransactionsListViewProps";
import { TransactionsListView } from "@/views/TransactionsListView/TransactionsListView";

export default TransactionsListView;

export const getServerSideProps = getTransactionsListViewProps;
