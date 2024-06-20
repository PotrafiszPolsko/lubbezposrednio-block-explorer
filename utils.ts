import {
  Block,
  FetchBcError,
  FetchBcSuccess,
  Transaction,
  Voting
} from "./types";

// prettier-ignore
export async function fetchBc(method: string, { inspect = false, params = {} }: { params?: Record<string, string | number>; inspect?: boolean }): Promise<FetchBcSuccess | FetchBcError>;
export async function fetchBc<T>(
  method: string,
  {
    mapper,
    errorMapper,
    inspect = false,
    params = {}
  }: {
    mapper: (response: FetchBcSuccess) => T;
    errorMapper: (response: FetchBcError) => T;
    params?: Record<string, string | number>;
    inspect?: boolean;
  }
): Promise<T>;
export async function fetchBc<T>(
  method: string,
  {
    mapper,
    errorMapper,
    inspect = false,
    params = {}
  }: {
    mapper?: (response: FetchBcSuccess) => T;
    errorMapper?: (response: FetchBcError) => T;
    params?: Record<string, string | number>;
    inspect?: boolean;
  } = {}
): Promise<T | FetchBcSuccess | FetchBcError> {
  let timestamp = 0;
  if (inspect) {
    timestamp = performance.now();
    console.log(`✈️  ${method}`, { body: params });
  }

  try {
    const response = await fetch(process.env.NODE_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.NODE_USER}:${process.env.NODE_PASSWORD}`
        ).toString("base64")}`
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method,
        params,
        id: 1
      })
    });
    const data = await response.json();
    console.log(method, data);
    const status = Math.floor(response.status / 100) * 100;

    if (inspect) {
      const icon = { 200: "✅️", 300: "➡️", 400: "⚠️", 500: "❌" }[status];
      const duration = `⏱️  ${Math.round(performance.now() - timestamp)}ms`;
      console.log(`${icon} ${response.status}`, duration);
    }

    let returnData: FetchBcSuccess = {
      response,
      headers: response.headers,
      status: response.status,
      ok: true,
      data: data,
      errors: data?.errors
    };

    if (mapper) {
      return mapper(returnData);
    }

    return returnData;
  } catch (err) {
    // console.log("error", err);
    let errorResponse: FetchBcError = {
      status: 500,
      ok: false,
      error: "error"
    };

    if (errorMapper) {
      return errorMapper(errorResponse);
    }

    return errorResponse;
  }
}

export function formatNumber(num: number) {
  const n = String(num),
    p = n.indexOf(".");
  return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
    p < 0 || i < p ? `${m} ` : m
  );
}

export function cssVar(varName: string) {
  if (typeof window !== "undefined") {
    return getComputedStyle(window.document.documentElement)
      .getPropertyValue(varName)
      .trim();
  }

  return "";
}

export function isTransaction(
  object: unknown | undefined
): object is Transaction {
  return (
    object !== null &&
    object !== undefined &&
    typeof object === "object" &&
    "txid" in object &&
    typeof (object as Transaction).allmetadata === "string"
  );
}

export function isBlock(object: unknown | undefined): object is Block {
  return (
    object !== null &&
    object !== undefined &&
    typeof object === "object" &&
    "id" in object &&
    "transactionsAmount" in object &&
    typeof (object as Block).date === "string"
  );
}

export function isVotingArray(object: unknown | undefined): object is Voting[] {
  return (
    object !== null &&
    object !== undefined &&
    Array.isArray(object) &&
    (object as Voting[]).every(v => "id" in v) &&
    (object as Voting[]).length > 0
  );
}

export function blockMapper(item: any): Block {
  return {
    id: item.block_id,
    date: new Date(item.block_time * 1000).toISOString().split("T")[0],
    transactionsAmount: item.number_of_transactions
  };
}

export function transactionMapper(item: any): Transaction {
  return {
    allmetadata: item.allmetadata,
    txid: item.txid,
    type: item.type,
    vin: item.vin.map((vin: any) => ({
      pk: vin.pk,
      sign: vin.sign,
      vin_txid: vin.vin_txid
    })),
    vout: item.vout.map((vout: any) => ({
      amount: vout.amount,
      pkh: vout.pkh
    }))
  };
}

export function votingMapper(item: any): Voting {
  return {
    id: item.voting_id,
    name: item.name,
    startDate: new Date(item.start_time * 1000).toISOString().split("T")[0],
    stopDate: new Date(item.end_time * 1000).toISOString().split("T")[0],
    status: item.status,
    type: item.type,
    turnout: item.voter_turnout
  };
}

export function signatureAndPublicKeyMapper(item: any) {
  return {
    publicKey: item.public_key,
    signature: item.signature
  };
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toISOString().split("T")[0];
}
