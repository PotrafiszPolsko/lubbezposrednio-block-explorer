import {
  CheckToSlot,
  PersonBooth,
  UserGroupSolid,
  FileSignatureSolid,
  ArrowRightArrowLeft
} from "@/public/SvgIcons";

export const SEARCH_ENDPOINTS = {
  blocks: {
    name: "get_block_by_id_without_txs_and_signs",
    key: "block_id"
  },
  transactions: {
    name: "get_tx",
    key: "txid"
  },
  votings: {
    name: "get_votings_by_name_or_id",
    key: "voting_name_or_id"
  },
  users: {
    name: "is_pk_authorized",
    key: "pk"
  }
};

export const VOTING_STATS_ARRAY = [
  {
    label: "vote-count",
    value: "numberOfAllVotings",
    icon: <CheckToSlot />,
    color: "#6772E6"
  },
  {
    label: "votes-cast",
    value: "numberOfAllAddedVotes",
    icon: <PersonBooth />,
    color: "#3981E6"
  },
  {
    label: "active-voting",
    value: "numberOfAllActiveVotings",
    icon: <CheckToSlot />,
    color: "#0CB9F2"
  },
  {
    label: "inactive-voting",
    value: "numberOfAllInactiveVotings",
    icon: <CheckToSlot />,
    color: "#30BF83"
  },
  {
    label: "registered-users",
    value: "numberOfAllVoters",
    icon: <UserGroupSolid />,
    color: "#FFAA00"
  },
  {
    label: "all-signatories",
    value: "numberOfMiners",
    icon: <FileSignatureSolid />,
    color: "#FF7040"
  },
  {
    label: "total-number-of-transactions",
    value: "numberOfAllTransactions",
    icon: <ArrowRightArrowLeft />,
    color: "#FF4D4D"
  }
];

export const HOME_VIEW_BLOCKS_COLUMNS = [
  { name: "block-id", accessor: "id" },
  { name: "date", accessor: "date" },
  {
    name: "total-number-of-transactions",
    accessor: "transactionsAmount"
  }
];
export const HOME_VIEW_USER_COLUMNS = [
  { name: "user-id", accessor: "id" },
  {
    name: "auth-org",
    accessor: "authOrganisation"
  },
  { name: "auth-level", accessor: "authLevel" },
  {
    name: "permission-granter",
    accessor: "permissionGranter"
  },
  { name: "auth-date", accessor: "transactionTime" }
];

export const HOME_VIEW_TRANSACTIONS_COLUMNS = [
  { name: "transaction-id", accessor: "id" },
  { name: "transaction-type", accessor: "type" },
  { name: "meta", accessor: "meta" }
];

export const HOME_VIEW_VOTINGS_COLUMNS = [
  { name: "voting-id", accessor: "id" },
  { name: "voting-title", accessor: "name" },
  { name: "start-date", accessor: "startDate" },
  { name: "end-date", accessor: "stopDate" },
  { name: "voting-status", accessor: "status" },
  { name: "voting-type", accessor: "type" },
  { name: "voter-turnout", accessor: "turnout" }
];

export const AUTH_VOTER_TYPE = 6;
