import { GetServerSideProps } from "next";
import { BlockDetailsViewProps } from "./BlockDetailsView";
import {
  getBlockDetails,
  getMinersAmount,
  getSignaturesData,
  getTransactionsData
} from "./dataFetchers";

export const getBlockDetailsProps: GetServerSideProps<
  BlockDetailsViewProps
> = async context => {
  const { id } = context.params!;

  const [blockDetails, transactionsData, minersAmount, signaturesData] =
    await Promise.all([
      getBlockDetails(id as string),
      getTransactionsData(id as string),
      getMinersAmount(),
      getSignaturesData(id as string)
    ]);

  return {
    props: {
      params: context.params,
      blockDetails,
      consensusInfoTabProps: {
        minersAmount,
        signaturesAmount: signaturesData.signaturesAmount,
        signaturesPercentage:
          signaturesData.signaturesAmount > 0
            ? (minersAmount / signaturesData.signaturesAmount) * 100
            : 0,

        signaturesAndPublicKeys: signaturesData.signaturesAndPublicKeys,
        blockId: (context.params?.id as string) ?? ""
      },
      transactionsTabProps: {
        transactions: transactionsData.last10TransactionsInBlock,
        transactionsAmount: transactionsData.transactionsAmount,
        blockId: (context.params?.id as string) ?? ""
      },
      messages: (await import(`../../lang/${context.locale}.json`)).default
    }
  };
};
