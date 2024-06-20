import { formatDate } from "@/utils";
import { GetServerSideProps } from "next";
import { getBlockData, getTransactionsData } from "./dataFetchers";
import { TransactionDetailsViewProps } from "./TransactionDetailsView";

export const getTransactionDetailsViewProps: GetServerSideProps<
  TransactionDetailsViewProps
> = async context => {
  const { id } = context.params!;

  const [transactionsData, blockData] = await Promise.all([
    getTransactionsData(id as string),
    getBlockData(id as string)
  ]);

  return {
    props: {
      params: context.params,
      vinTabProps: {
        vins: transactionsData.transaction.vin
      },
      voutTabProps: {
        vouts: transactionsData.transaction.vout
      },
      overviewTabProps: {
        blockId: blockData.blockHash,
        blockTimestamp: formatDate(blockData.timestamp),
        transactionType: transactionsData.transaction.type,
        txid: transactionsData.transaction.txid,
        vinAmount: transactionsData.transaction.vin.length,
        voutAmount: transactionsData.transaction.vout.length
      },
      metaTabProps: {
        items: Object.entries(transactionsData.metadata).map(
          ([key, val]): any => ({
            label: key,
            value: val
          })
        )
      },
      messages: (await import(`../../lang/${context.locale}.json`)).default
    }
  };
};
