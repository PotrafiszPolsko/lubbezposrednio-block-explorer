import { FetchBcError, FetchBcSuccess } from "@/types";
import { fetchBc } from "@/utils";

export const getTransactionsData = (id: string) =>
  fetchBc("get_tx_with_parse_metadata", {
    params: { offset: 1, txid: id },
    errorMapper: (res: FetchBcError) => ({
      metadata: {},
      transaction: {
        allmetadata: "",
        vinAmount: 0,
        voutAmount: 0,
        txid: "",
        type: 0,
        vin: [] as {
          pk: string;
          signature: string;
          vinTxid: string;
        }[],
        vout: [] as { amount: number; pkh: string }[]
      }
    }),
    mapper: (res: FetchBcSuccess) => {
      console.dir(res.data, { depth: 12 });

      const data = res?.data?.result?.data;
      return {
        metadata: data?.parsed_metadata ?? {},
        transaction: {
          allmetadata: data?.transaction?.allmetadata,
          txid: data?.transaction?.txid,
          type: data?.transaction?.type,
          vinAmount: (data?.transaction?.vin || []).length,
          voutAmount: (data?.transaction?.vin || []).length,
          vin: (data?.transaction?.vin || []).map((v: any) => ({
            pk: v.pk,
            signature: v.sign,
            vinTxid: v.vin_txid
          })),
          vout: (data?.transaction?.vout || []).map((v: any) => ({
            amount: v.amount,
            pkh: v.pkh
          })) as { amount: number; pkh: string }[]
        }
      };
    }
  });

export const getBlockData = (id: string) =>
  fetchBc("get_block_by_txid_without_txs_and_signs", {
    params: { txid: id },
    mapper: (res: FetchBcSuccess) => {
      return {
        blockHash: res.data?.result?.data?.actual_hash ?? "",
        timestamp: res.data?.result?.data?.block_time ?? 0
      };
    },
    errorMapper: (err: FetchBcError) => {
      return {
        blockHash: "",
        timestamp: 0
      };
    }
  });
