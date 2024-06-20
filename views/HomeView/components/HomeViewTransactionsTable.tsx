import { Table } from "@/components/Table";
import { VotingTypeBadge } from "@/components/VotingTypeBadge";
import { BADGE_TYPES } from "@/constants";
import { Transaction } from "@/types";
import { isTransaction } from "@/utils";
import { useTranslations } from "next-intl";
import React from "react";
import { HOME_VIEW_TRANSACTIONS_COLUMNS } from "../constants";
import { SearchResult } from "../types";
import { ActionButton } from "./ActionButton";

interface HomeViewTransactionsTableProps {
  searchResult: SearchResult;
  last5Transactions: Transaction[];
  isSearch: boolean;
}

export const HomeViewTransactionsTable: React.FC<
  HomeViewTransactionsTableProps
> = ({ searchResult, last5Transactions, isSearch }) => {
  const t = useTranslations();

  const isTransactionSearchResult =
    !!searchResult && isTransaction(searchResult);

  return (
    <Table
      title={isTransactionSearchResult ? "" : t("most-recent-transactions")}
      emptyMessage={t("no-transactions")}
      tableClassName="min-w-[700px]"
      show={isTransactionSearchResult || !isSearch}
      action={<ActionButton href="/transactions" />}
      columns={HOME_VIEW_TRANSACTIONS_COLUMNS}
      items={
        isTransactionSearchResult
          ? [
              {
                id: searchResult.txid,
                href: `/transactions/${searchResult.txid}`,
                type: (
                  <VotingTypeBadge
                    type={searchResult.type as keyof typeof BADGE_TYPES}
                  />
                ),
                meta: searchResult.allmetadata
              }
            ]
          : last5Transactions.map(transaction => ({
              id: transaction.txid,
              href: `/transactions/${transaction.txid}`,
              type: (
                <VotingTypeBadge
                  type={transaction.type as keyof typeof BADGE_TYPES}
                />
              ),
              meta: transaction.allmetadata
            }))
      }
    />
  );
};
