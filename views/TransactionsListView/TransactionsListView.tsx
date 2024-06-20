import { Layout } from "@/components/Layout";
import { NoDataMessage } from "@/components/NoDataMessage";
import { SearchBox } from "@/components/SearchBox";
import { Table } from "@/components/Table";
import { VotingTypeBadge } from "@/components/VotingTypeBadge";
import { BADGE_TYPES } from "@/constants";
import { Transaction } from "@/types";
import { isTransaction } from "@/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TRANSACTIONS_LIST_COLUMNS } from "./costants";
import {
  useTransactionsListPaginatedData,
  useTransactionsListSearchQueryFetcher
} from "./hooks";

export type TransactionsListViewProps = {
  transactions: Transaction[];
  totalCount: number;
};

export const TransactionsListView = (props: TransactionsListViewProps) => {
  const { transactions, totalCount } = props;
  const [transactionsData, setTransactionsData] = useState(transactions);

  const isTableDataLoading =
    useTransactionsListPaginatedData(setTransactionsData);

  const { isSearchLoading, searchResult, searchError } =
    useTransactionsListSearchQueryFetcher();

  const t = useTranslations();

  return (
    <Layout>
      <div className="content mt-9">
        <h3 className="text-3xl mb-4">{t("transactions")}</h3>
        <SearchBox
          isLoading={isSearchLoading}
          className="shadow-none !border-gray"
        />
        {searchError && (
          <NoDataMessage>
            {t("transactions-with-the-specified-id-was-not-found")}
          </NoDataMessage>
        )}
        <Table
          isLoading={isTableDataLoading}
          show={!searchError && !isSearchLoading}
          emptyMessage={t("no-transactions")}
          tableClassName="min-w-[1400px]"
          wrapperClassName="!my-0"
          totalCount={isTransaction(searchResult) ? 1 : totalCount}
          items={
            isTransaction(searchResult)
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
              : transactionsData.map(transaction => ({
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
          columns={TRANSACTIONS_LIST_COLUMNS}
        />
      </div>
    </Layout>
  );
};
