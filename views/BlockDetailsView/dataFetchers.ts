import { FetchBcSuccess } from "@/types";
import {
  fetchBc,
  signatureAndPublicKeyMapper,
  transactionMapper
} from "@/utils";

export const getBlockDetails = (id: string) =>
  fetchBc("get_block_by_id_without_txs_and_signs", {
    params: { block_id: id },
    mapper: (res: FetchBcSuccess) => {
      const data = res.data.result.data;

      return {
        actualHash: data.actual_hash,
        allTxHash: data.all_tx_hash,
        time: data.block_time,
        parentHash: data.parent_hash,
        version: data.version
      };
    },
    errorMapper: () => ({
      actualHash: "",
      allTxHash: "",
      time: 0,
      parentHash: "",
      version: 0
    })
  });

export const getTransactionsData = (id: string) =>
  fetchBc("get_transactions_from_block_per_page", {
    params: {
      block_id: id,
      offset: 1
    },
    mapper: (res: FetchBcSuccess) => {
      return {
        last10TransactionsInBlock:
          res.data.result.data.transactions_from_block.map(transactionMapper),
        transactionsAmount: res.data.result.data.number_transactions_from_block
      };
    },
    errorMapper: () => ({
      last10TransactionsInBlock: [],
      transactionsAmount: 0
    })
  });

export const getMinersAmount = () =>
  fetchBc("get_number_of_miners", {
    errorMapper: () => 0,
    mapper: res => res.data.result.data.number_of_miners
  });

export const getSignaturesData = (id: string) =>
  fetchBc("get_block_signatures_and_miners_public_keys_per_page", {
    params: {
      block_id: id,
      offset: 1
    },
    mapper: (res: FetchBcSuccess) => {
      const data = res.data.result.data;

      return {
        signaturesAmount: data.number_signatures_from_block,
        signaturesAndPublicKeys: data.signatures_and_public_keys.map(
          signatureAndPublicKeyMapper
        )
      };
    },
    errorMapper: () => ({
      signaturesAmount: 0,
      signaturesAndPublicKeys: []
    })
  });
