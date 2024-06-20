import { getTransactionDetailsViewProps } from "@/views/TransactionDetailsView/getTransactionDetailsViewProps";
import { TransactionDetailsView } from "@/views/TransactionDetailsView/TransactionDetailsView";

export default TransactionDetailsView;

export const getServerSideProps = getTransactionDetailsViewProps;
