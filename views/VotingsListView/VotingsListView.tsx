import { Layout } from "@/components/Layout";
import { NoDataMessage } from "@/components/NoDataMessage";
import { CustomPagination } from "@/components/Pagination";
import { SearchBox } from "@/components/SearchBox";
import { Table } from "@/components/Table";
import { VotingTypeBadge } from "@/components/VotingTypeBadge";
import { BADGE_TYPES } from "@/constants";
import { Voting } from "@/types";
import { isVotingArray } from "@/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { VOTINGS_LIST_COLUMNS } from "./constants";
import {
  useVotingsListPaginatedData,
  useVotingsListSearchQueryFetcher
} from "./hooks";

export type VotingListViewProps = {
  votings: Voting[];
  totalCount: number;
};

export const VotingListView = (props: VotingListViewProps) => {
  const { votings, totalCount } = props;

  const [votingsData, setVotingsData] = useState(votings);

  const t = useTranslations();

  const isTableDataLoading = useVotingsListPaginatedData(setVotingsData);

  const { isSearchLoading, searchResult, searchError } =
    useVotingsListSearchQueryFetcher();

  return (
    <Layout>
      <div className="content mt-9">
        <h3 className="text-3xl mb-4">{t("votings")}</h3>
        <SearchBox
          clearUrlParamsOnChange
          className="shadow-none !border-gray"
          isLoading={isSearchLoading}
        />
        {searchError && (
          <NoDataMessage>
            {t("no-votes-with-the-given-name-were-found")}
          </NoDataMessage>
        )}
        <Table
          isLoading={isTableDataLoading || isSearchLoading}
          show={!searchError}
          wrapperClassName="!my-0"
          emptyMessage="Brak głosowań"
          tableClassName="min-w-[1350px]"
          totalCount={totalCount}
          showPagination={false}
          items={
            isVotingArray(searchResult?.votings) && searchResult
              ? searchResult.votings.map(voting => ({
                  ...voting,
                  type: (
                    <VotingTypeBadge
                      type={voting.type as keyof typeof BADGE_TYPES}
                    />
                  ),
                  turnout: `${voting.turnout}%`
                }))
              : votingsData.map(voting => ({
                  ...voting,
                  type: (
                    <VotingTypeBadge
                      type={voting.type as keyof typeof BADGE_TYPES}
                    />
                  ),
                  turnout: `${voting.turnout}%`
                }))
          }
          columns={VOTINGS_LIST_COLUMNS}
        />

        {!searchError && (
          <CustomPagination
            totalCount={searchResult ? searchResult.totalCount : totalCount}
            itemsPerPage={10}
          />
        )}
      </div>
    </Layout>
  );
};
