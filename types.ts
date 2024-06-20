export type Block = {
  id: string;
  date: string;
  transactionsAmount: number;
};

export type Transaction = {
  allmetadata: string;
  txid: string;
  type: number;
  vin: { pk: string; sign: string; vin_txid: string }[];
  vout: { amount: number; pkh: string }[];
};

export type Voting = {
  id: number;
  name: string;
  startDate: string;
  stopDate: string;
  status: string;
  type: number;
  turnout: number;
};

export type AuthUser = {
  authLevel: number;
  authOrganisation: string;
  permissionGranter: string;
  transactionTime: string;
  id: string;
};

export type FetchBcSuccess = {
  data: any;
  ok: true;
  response: Response;
  headers: Headers;
  errors: any;
  status: number;
};

export type FetchBcError = { error: any; status: number; ok: false };
