import { CheckToSlot } from "@/public/SvgIcons";
import { Transaction } from "@/types";
import { useState } from "react";

import { useTranslations } from "next-intl";
import { ItemBadge } from "@/components/ItemBadge";
import { NoDataMessage } from "@/components/NoDataMessage";
import { SearchBox } from "@/components/SearchBox";
import { Table } from "@/components/Table";
import { VotingTypeBadge } from "@/components/VotingTypeBadge";
import {
  useTransactionsTabPaginatedData,
  useTransactionsTabSearchQueryFetcher
} from "../hooks";
import { BLOCK_DETAILS_TRANSACTION_COLUMNS } from "../constants";
import { BADGE_TYPES } from "@/constants";
import { isTransaction } from "@/utils";

export const TransactionsTab = (props: {
  transactions: Transaction[];
  transactionsAmount: number;
  blockId: string;
}) => {
  const { transactions, transactionsAmount, blockId } = props;

  const [transactionsData, setTransactionsData] = useState(transactions);

  const t = useTranslations();

  const isTableDataLoading = useTransactionsTabPaginatedData(
    blockId,
    setTransactionsData
  );

  const { isSearchLoading, searchResult, searchError } =
    useTransactionsTabSearchQueryFetcher();

  return (
    <div>
      <ItemBadge
        bgColor="#6772E6"
        color="#6772E6"
        icon={<CheckToSlot />}
        label={t("total-number-of-transactions")}
        value={transactionsAmount.toString()}
      />

      <div className="mt-12">
        <h3 className="text-2xl font-medium mb-4">{t("transactions-list")}</h3>
        <SearchBox
          className="shadow-none !border-gray"
          isLoading={isSearchLoading}
        />

        {searchError && (
          <NoDataMessage>
            {t("transactions-with-the-specified-id-was-not-found")}
          </NoDataMessage>
        )}

        <Table
          isLoading={isTableDataLoading}
          show={!searchError && !isSearchLoading}
          itemsPerPage={5}
          emptyMessage={t("no-transactions")}
          tableClassName="min-w-[400px]"
          wrapperClassName="!my-0"
          totalCount={isTransaction(searchResult) ? 1 : transactionsAmount}
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
              : transactionsData.map(tr => ({
                  id: tr.txid,
                  href: `/transactions/${tr.txid}`,
                  type: (
                    <VotingTypeBadge
                      type={tr.type as keyof typeof BADGE_TYPES}
                    />
                  ),
                  meta: tr.allmetadata
                }))
          }
          columns={BLOCK_DETAILS_TRANSACTION_COLUMNS}
        />
      </div>
    </div>
  );
};
