import { usePaginatedData } from "@/hooks/usePaginatedData";
import { useSearchQueryFetcher } from "@/hooks/useSearchQueryFetcher";
import { Transaction } from "@/types";
import { signatureAndPublicKeyMapper, transactionMapper } from "@/utils";
import { Dispatch, SetStateAction } from "react";

export const useConsensusTabPaginatedData = (
  blockId: string,
  setSignaturesData: Dispatch<
    SetStateAction<
      {
        publicKey: string;
        signature: string;
      }[]
    >
  >
) =>
  usePaginatedData({
    method: "get_block_signatures_and_miners_public_keys_per_page",
    key: "block_id",
    keyValue: blockId,
    onData: res => {
      console.log(res);
      if (res.data?.result?.data) {
        setSignaturesData(
          res.data.result.data.signatures_and_public_keys.map(
            signatureAndPublicKeyMapper
          )
        );
      }
    },
    onError: res => {
      console.log("paginated data error", res);
    }
  });

export const useTransactionsTabPaginatedData = (
  blockId: string,
  setTransactionsData: Dispatch<SetStateAction<Transaction[]>>
) =>
  usePaginatedData({
    method: "get_transactions_from_block_per_page",
    key: "block_id",
    keyValue: blockId,
    onData: res => {
      setTransactionsData(
        res.data.result.data.transactions_from_block.map(transactionMapper)
      );
    },
    onError: res => {
      console.log("paginated data error", res);
    }
  });

export const useTransactionsTabSearchQueryFetcher = () =>
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
