import { usePaginatedData } from "@/hooks/usePaginatedData";
import { useSearchQueryFetcher } from "@/hooks/useSearchQueryFetcher";
import { Transaction } from "@/types";
import { transactionMapper } from "@/utils";
import { Dispatch, SetStateAction } from "react";

export const useTransactionsListPaginatedData = (
  setTransactionsData: Dispatch<SetStateAction<Transaction[]>>
) =>
  usePaginatedData({
    method: "get_transactions_per_page",
    onData: res => {
      setTransactionsData(res.data.result.data.txs.map(transactionMapper));
    },
    onError: res => {
      console.log("paginated data error", res);
    }
  });

export const useTransactionsListSearchQueryFetcher = () =>
  useSearchQueryFetcher<Transaction>({
    method: "get_tx",
    key: "txid",
    onData: res => {
      if (res.data?.result?.data) {
        const tx = res.data.result.data;
        const mappedTx: Transaction = {
          allmetadata: tx.allmetadata,
          txid: tx.txid,
          type: tx.type,
          vin: tx.vin,
          vout: tx.vout
        };

        return mappedTx;
      }

      return undefined;
    },
    onError: res => {
      console.log("onError", res);
    }
  });
