import { FetchBcError, FetchBcSuccess } from "@/types";
import { fetchBc, transactionMapper } from "@/utils";

export const getPaginatedTransactions = () =>
  fetchBc("get_transactions_per_page", {
    params: { offset: 1 },
    errorMapper: (res: FetchBcError) => ({
      last10Transactions: [],
      totalCount: 0
    }),
    mapper: (res: FetchBcSuccess) => {
      return {
        last10Transactions: res.data.result.data.txs.map(transactionMapper),
        totalCount: res.data.result.data["total_number_txs"]
      };
    }
  });
